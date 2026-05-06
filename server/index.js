import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chatRouter from './routes/chat.js'
import authRouter from './routes/auth.js'
import conversationsRouter from './routes/conversations.js'
import pool from './db.js'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/chat', chatRouter)
app.use('/api/conversations', conversationsRouter)

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', db: 'connected' })
  } catch {
    res.status(503).json({ status: 'ok', db: 'disconnected' })
  }
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`)
})