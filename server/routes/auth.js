import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../db.js'

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
const SALT_ROUNDS = 10

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { prenom, email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  try {
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    )
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email déjà utilisé' })
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const [result] = await pool.query(
      'INSERT INTO users (prenom, email, mot_de_passe_hash) VALUES (?, ?, ?)',
      [prenom ?? null, email, hashedPassword]
    )

    const token = signToken({ id: result.insertId, email })
    res.status(201).json({ token })
  } catch (err) {
    console.error('[register]', err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' })
  }

  try {
    const [rows] = await pool.query(
      'SELECT id, email, mot_de_passe_hash FROM users WHERE email = ?',
      [email]
    )

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Identifiants incorrects' })
    }

    const user = rows[0]
    const match = await bcrypt.compare(password, user.mot_de_passe_hash)

    if (!match) {
      return res.status(401).json({ error: 'Identifiants incorrects' })
    }

    const token = signToken({ id: user.id, email: user.email })
    res.json({ token })
  } catch (err) {
    console.error('[login]', err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
