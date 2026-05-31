import { useState } from 'react'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO, TechStart Inc.',
    content: 'An exceptional developer who delivers beyond expectations. The MERN stack expertise and attention to detail made our platform launch seamless.',
    avatar: 'SJ',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager, WebFlow',
    content: 'Working with this developer was a game-changer. The UI/UX sensibilities combined with solid engineering produced outstanding results.',
    avatar: 'MC',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Design Director, CreativeLab',
    content: 'Rare combination of design thinking and technical execution. The brand identity system created for us exceeded all expectations.',
    avatar: 'ER',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Founder, StartupX',
    content: 'Transformed our concept into a fully functional product in record time. The project management and communication were top-notch.',
    avatar: 'DK',
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [ref, isVisible] = useScrollAnimation()

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <section id="testimonials" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <div
        ref={ref}
        className={`section-container transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="section-title">
          What <span className="gradient-text">Clients Say</span>
        </h2>
        <p className="section-subtitle">
          Feedback from people I've had the pleasure of working with
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-8 sm:p-10 border border-white/5 relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                {t.avatar}
              </div>
              <div>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-gray-400 text-sm">{t.role}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={16} />
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed text-lg italic">
              "{t.content}"
            </p>

            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === current ? 'bg-primary w-6' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="p-2 rounded-lg glass border border-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all"
                >
                  <HiChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="p-2 rounded-lg glass border border-white/10 hover:border-primary/50 text-gray-400 hover:text-primary transition-all"
                >
                  <HiChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
