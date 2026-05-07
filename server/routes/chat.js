import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Groq from 'groq-sdk'
import OpenAI from 'openai'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import pool from '../db.js'

dotenv.config()

const router = express.Router()

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const github = new OpenAI({
  baseURL: 'https://models.inference.ai.azure.com',
  apiKey: process.env.GITHUB_TOKEN
})

async function callGemini(messages) {
  const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' })
  const firstUserIndex = messages.findIndex(m => m.role === 'user')
  const trimmed = firstUserIndex > 0 ? messages.slice(firstUserIndex) : messages
  const history = trimmed.slice(0, -1).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }))
  const chat = model.startChat({ history })
  const result = await chat.sendMessage(trimmed.at(-1).content)
  return result.response.text()
}

async function callLlama(messages) {
  const res = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages
  })
  return res.choices[0].message.content
}

async function callGPT4o(messages) {
  const res = await github.chat.completions.create({
    model: 'gpt-4o',
    messages
  })
  return res.choices[0].message.content
}

const QUOTA_PROVIDER = { gemini: 'google', llama: 'groq', gpt4o: 'github' }
const QUOTA_INIT = { gemini: [14, 1499], llama: [29, 14399], gpt4o: [14, 149] }

function updateQuota(model) {
  const provider = QUOTA_PROVIDER[model] ?? 'unknown'
  const [rpm, rpd] = QUOTA_INIT[model] ?? [99, 999]
  pool.query(
    'INSERT INTO quotas_serveur (modele, provider, rpm_restant, rpd_restant) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE rpm_restant = rpm_restant - 1, rpd_restant = rpd_restant - 1',
    [model, provider, rpm, rpd]
  ).catch(err => console.warn('[quota]', err.message))
}

function extractUserId(req) {
  const authHeader = req.headers['authorization']
  if (!authHeader?.startsWith('Bearer ')) return null
  try {
    const payload = jwt.verify(authHeader.slice(7), process.env.JWT_SECRET)
    return payload.id ?? null
  } catch {
    return null
  }
}

function buildTitle(firstMessage) {
  return firstMessage.trim().split(/\s+/).slice(0, 5).join(' ')
}

router.post('/send', async (req, res) => {
  const { messages, model = 'gemini', conversationId } = req.body

  const chain = [
    { name: 'gemini', fn: callGemini },
    { name: 'llama', fn: callLlama },
    { name: 'gpt4o', fn: callGPT4o }
  ]

  const startIndex = chain.findIndex(m => m.name === model)
  const ordered = [...chain.slice(startIndex), ...chain.slice(0, startIndex)]

  let content, usedModel

  for (const { name, fn } of ordered) {
    try {
      content = await fn(messages)
      usedModel = name
      updateQuota(name)
      break
    } catch (err) {
      console.warn(`${name} failed:`, err.message)
      if (name === ordered.at(-1).name) {
        return res.status(503).json({ error: 'Tous les modèles sont indisponibles.' })
      }
    }
  }

  const userId = extractUserId(req)

  if (!userId) {
    return res.json({ content, model: usedModel, fallback: usedModel !== model })
  }

  try {
    let convId = conversationId ?? null

    if (!convId) {
      const titre = buildTitle(messages.at(-1)?.content ?? 'Nouvelle conversation')
      const [result] = await pool.query(
        'INSERT INTO conversations (id_utilisateur, titre) VALUES (?, ?)',
        [userId, titre]
      )
      convId = result.insertId
    }

    const userMessage = messages.at(-1)
    await pool.query(
      'INSERT INTO messages (id_conversation, role, contenu, modele_utilise) VALUES (?, ?, ?, NULL)',
      [convId, userMessage.role, userMessage.content]
    )

    await pool.query(
      'INSERT INTO messages (id_conversation, role, contenu, modele_utilise) VALUES (?, ?, ?, ?)',
      [convId, 'assistant', content, usedModel]
    )

    return res.json({
      content,
      model: usedModel,
      fallback: usedModel !== model,
      conversationId: convId
    })
  } catch (err) {
    console.error('[chat/send] db error:', err.message)
    return res.json({ content, model: usedModel, fallback: usedModel !== model })
  }
})

export default router
