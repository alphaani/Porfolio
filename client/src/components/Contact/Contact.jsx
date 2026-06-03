import { useState } from 'react'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [ref, isVisible] = useScrollAnimation()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      await axios.post(`${API_URL}/api/contact`, form)
      setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.error || 'Something went wrong. Please try again later.',
      })
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: HiMail, label: 'Email', value: 'nuuremahad20@gmail.com' },
    { icon: HiPhone, label: 'Phone', value: '+252617604988' },
    { icon: HiLocationMarker, label: 'Location', value: 'Mogadishu , somalia' },
  ]

  return (
    <section id="contact" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
      <div
        ref={ref}
        className={`section-container transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="section-title">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="section-subtitle">
          Have a project in mind? Let's create something amazing together
        </p>

        <div className="grid lg:grid-cols-5 gap-12 mt-12">
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="text-primary" size={22} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{label}</p>
                  <p className="font-medium text-sm">{value}</p>
                </div>
              </div>
            ))}

            <div className="glass rounded-xl p-6 border border-white/5">
              <h4 className="font-semibold mb-3">Availability</h4>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-400">Open for freelance & full-time opportunities</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8 border border-white/5">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                placeholder="Project Collaboration"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-text placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {status.message && (
              <div
                className={`mb-4 px-4 py-3 rounded-xl text-sm ${
                  status.type === 'success'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <HiPaperAirplane className="rotate-90" size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
