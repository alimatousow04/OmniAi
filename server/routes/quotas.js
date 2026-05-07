import express from 'express'
import pool from '../db.js'

const router = express.Router()

// GET /api/quotas
router.get('/', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM quotas_serveur')
    res.json(rows)
  } catch (err) {
    console.error('[quotas]', err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
