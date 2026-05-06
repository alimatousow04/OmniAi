import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Groq from 'groq-sdk'
import OpenAI from 'openai'
import dotenv from 'dotenv'

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
  const history = messages.slice(0, -1).map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }))
  const chat = model.startChat({ history })
  const result = await chat.sendMessage(messages.at(-1).content)
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

router.post('/send', async (req, res) => {
  const { messages, model = 'gemini' } = req.body

  const chain = [
    { name: 'gemini', fn: callGemini },
    { name: 'llama', fn: callLlama },
    { name: 'gpt4o', fn: callGPT4o }
  ]

  // Démarre par le modèle choisi
  const startIndex = chain.findIndex(m => m.name === model)
  const ordered = [...chain.slice(startIndex), ...chain.slice(0, startIndex)]

  for (const { name, fn } of ordered) {
    try {
      const content = await fn(messages)
      return res.json({ content, model: name, fallback: name !== model })
    } catch (err) {
      console.warn(`${name} failed:`, err.message)
      if (name === ordered.at(-1).name) {
        return res.status(503).json({ error: 'Tous les modèles sont indisponibles.' })
      }
    }
  }
})

export default router