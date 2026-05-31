import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'

const app = express()

let cachedDb = null
async function connectDB() {
  if (cachedDb) return cachedDb
  cachedDb = await mongoose.connect(process.env.MONGODB_URI)
  return cachedDb
}

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true })
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)

function getTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

app.use(cors())
app.use(express.json())

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    await connectDB()
    const contact = await Contact.create({ name, email, subject, message })

    try {
      await getTransporter().sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Portfolio: ${subject}`,
        html: `
          <div style="background:#0F172A;color:#F8FAFC;padding:40px;font-family:Arial,sans-serif;">
            <div style="background:linear-gradient(135deg,#6366F1,#8B5CF6);padding:2px;border-radius:12px;">
              <div style="background:#1E293B;padding:30px;border-radius:10px;">
                <h2 style="color:#6366F1;margin:0 0 20px;">New Contact Message</h2>
                <p><strong style="color:#94A3B8;">Name:</strong> ${name}</p>
                <p><strong style="color:#94A3B8;">Email:</strong> ${email}</p>
                <p><strong style="color:#94A3B8;">Subject:</strong> ${subject}</p>
                <div style="margin-top:20px;padding:15px;background:#0F172A;border-radius:8px;border-left:3px solid #6366F1;">
                  <p style="color:#CBD5E1;margin:0;">${message}</p>
                </div>
              </div>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Email send failed:', emailError.message)
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: { id: contact._id },
    })
  } catch (error) {
    console.error('Contact error:', error.message)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
