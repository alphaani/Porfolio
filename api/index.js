import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import contactRoutes from '../server/routes/contact.js'

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
})

app.use(cors())
app.use(express.json())
app.use(limiter)

app.use('/api/contact', contactRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
