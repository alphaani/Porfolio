import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/alphaani' },
  { icon: FiLinkedin, href: '#' },
  { icon: FiTwitter, href: '#' },
  { icon: FaWhatsapp, href: 'https://wa.me/252617604988' },
]

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
              className="text-2xl font-bold gradient-text"
            >
              Portfolio
            </a>
            <p className="text-gray-500 text-sm mt-2">
              Crafting digital experiences with code & creativity.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass rounded-lg text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-200 border border-white/5"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} Portfolio. Made with
            <FiHeart className="text-primary inline" size={14} />
            by MERN Developer
          </p>
        </div>
      </div>
    </footer>
  )
}
