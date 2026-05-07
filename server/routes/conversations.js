import express from 'express'
import jwt from 'jsonwebtoken'
import pool from '../db.js'

const router = express.Router()

function getUserId(req) {
  const auth = req.headers['authorization']
  if (!auth?.startsWith('Bearer ')) return null
  try {
    const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET)
    return payload.id ?? null
  } catch {
    return null
  }
}

// GET /api/conversations
router.get('/', async (req, res) => {
  const userId = getUserId(req)
  if (!userId) return res.status(401).json({ error: 'Non authentifié' })

  try {
    const [rows] = await pool.query(
      'SELECT id, titre, updated_at FROM conversations WHERE id_utilisateur = ? ORDER BY updated_at DESC',
      [userId]
    )
    res.json(rows)
  } catch (err) {
    console.error('[conversations] db error:', err.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// GET /api/conversations/:id/messages
router.get('/:id/messages', async (req, res) => {
  const userId = getUserId(req)
  if (!userId) return res.status(401).json({ error: 'Non authentifié' })

  const convId = parseInt(req.params.id)
  if (isNaN(convId)) return res.status(400).json({ error: 'ID invalide' })

  try {
    const [conv] = await pool.query(
      'SELECT id FROM conversations WHERE id = ? AND id_utilisateur = ?',
      [convId, userId]
    )
    if (conv.length === 0) return res.status(404).json({ error: 'Conversation introuvable' })

    const [rows] = await pool.query(
      'SELECT id, role, contenu, modele_utilise, created_at FROM messages WHERE id_conversation = ? ORDER BY created_at ASC',
      [convId]
    )
    res.json(rows)
  } catch (err) {
    console.error('[conversations/:id/messages] db error:', err.message)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
