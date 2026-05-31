import { useEffect, useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import profileImg from '../../assets/profile.jpg'

const roles = ['MERN Stack Developer', 'UI/UX Designer', 'Graphic Designer']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentRole.slice(0, displayText.length - 1)
              : currentRole.slice(0, displayText.length + 1)
          )
        },
        isDeleting ? 50 : 100
      )
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <p className="text-primary font-mono text-sm sm:text-base mb-4 animate-fade-in">
              Hi there, I'm
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">MERN Stack</span>
              <br />
              Developer & Designer
            </h1>

            <div className="h-8 sm:h-10 mb-8">
              <span className="text-xl sm:text-2xl text-gray-300 font-mono">
                {displayText}
                <span className="inline-block w-0.5 h-6 sm:h-7 bg-primary ml-1 animate-pulse" />
              </span>
            </div>

            <p className="text-gray-400 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
              I craft exceptional digital experiences with clean code, intuitive design,
              and a passion for innovation.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToProjects}
                className="group px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                View My Work
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToContact}
                className="group px-8 py-3.5 glass text-text rounded-xl font-medium transition-all duration-200 hover:bg-white/10 flex items-center gap-2"
              >
                Get In Touch
              </button>
            </div>

            <div className="flex items-center gap-4 mt-10 justify-center lg:justify-start">
              {[
                { icon: FiGithub, href: 'https://github.com/alphaani' },
                { icon: FiLinkedin, href: '#' },
                { icon: FiTwitter, href: '#' },
                { icon: FaWhatsapp, href: 'https://wa.me/252617604988' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass rounded-xl text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-200"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30 rounded-full animate-float blur-3xl" />
              <div className="absolute inset-4 bg-gradient-to-br from-primary via-accent to-secondary rounded-full animate-float opacity-20" />
              <div className="absolute inset-8 glass rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 glass rounded-2xl flex items-center justify-center animate-float animate-delay-200 border border-white/10">
                <div className="text-center">
                  <p className="text-primary font-bold text-lg">3+</p>
                  <p className="text-gray-400 text-xs">Years</p>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-20 h-20 glass rounded-2xl flex items-center justify-center animate-float animate-delay-300 border border-white/10">
                <div className="text-center">
                  <p className="text-secondary font-bold text-lg">15+</p>
                  <p className="text-gray-400 text-xs">Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
