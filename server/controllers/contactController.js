import Contact from '../models/Contact.js'
import getTransporter from '../utils/mailer.js'
import mongoose from 'mongoose'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'nuuremahad20@gmail.com'

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message)

    let contact = null
    if (mongoose.connection.readyState === 1) {
      contact = await Contact.create({ name, email, subject, message })
    }

    try {
      await getTransporter().sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `Portfolio: ${safeSubject}`,
        html: `
          <div style="font-family: Arial, sans-serif; background: #0F172A; color: #F8FAFC; padding: 40px; max-width: 600px;">
            <div style="background: linear-gradient(135deg, #6366F1, #8B5CF6); padding: 2px; border-radius: 12px;">
              <div style="background: #1E293B; padding: 30px; border-radius: 10px;">
                <h2 style="color: #6366F1; margin: 0 0 20px;">New Contact Message</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94A3B8; padding: 8px 0; width: 80px;">Name</td>
                    <td style="color: #F8FAFC; padding: 8px 0;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding: 8px 0;">Email</td>
                    <td style="color: #6366F1; padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #6366F1;">${safeEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="color: #94A3B8; padding: 8px 0;">Subject</td>
                    <td style="color: #F8FAFC; padding: 8px 0;">${safeSubject}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px; padding: 15px; background: #0F172A; border-radius: 8px; border-left: 3px solid #6366F1;">
                  <p style="color: #CBD5E1; margin: 0; line-height: 1.6;">${safeMessage}</p>
                </div>
              </div>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Email send failed:', emailError.message)
      return res.status(500).json({ error: 'Email could not be sent. Check EMAIL_USER and EMAIL_PASS.' })
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: { id: contact?._id || null },
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ error: messages.join(', ') })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}
