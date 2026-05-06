import mysql from 'mysql2/promise'

if (!process.env.DB_URL) {
  throw new Error('DB_URL is not defined in environment variables')
}

const pool = mysql.createPool(process.env.DB_URL)

export default pool
