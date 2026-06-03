import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import contactRoutes from './routes/contact.js'
import getTransporter from './utils/mailer.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'

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

app.get('/api/test-email', async (req, res) => {
  try {
    await getTransporter().sendMail({
      from: `"Portfolio Test" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || 'nuuremahad20@gmail.com',
      subject: 'Portfolio Email Test',
      html: '<h2 style="color:#6366F1;">Email working!</h2><p>Your portfolio contact form is sending emails successfully.</p>',
    })
    res.json({ success: true, message: 'Test email sent to nuuremahad20@gmail.com' })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without database)`)
    })
  })
