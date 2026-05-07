import mysql from 'mysql2/promise'

const dbUrl = new URL(process.env.DB_URL)

const pool = mysql.createPool({
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port) || 4000,
  user: decodeURIComponent(dbUrl.username),
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.slice(1),
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 5,
})

export default pool