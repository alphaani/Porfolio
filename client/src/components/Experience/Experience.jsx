import useScrollAnimation from '../../hooks/useScrollAnimation'
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi'

const timeline = [
  {
    type: 'work',
    icon: HiBriefcase,
    title: 'Senior MERN Stack Developer',
    org: 'Tech Innovators Inc.',
    period: 'Jan 2024 - Present',
    description: [
      'Lead development of microservices architecture serving 100K+ users',
      'Mentored junior developers and conducted code reviews',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
    ],
  },
  {
    type: 'work',
    icon: HiBriefcase,
    title: 'Full Stack Developer',
    org: 'Digital Solutions Co.',
    period: 'Mar 2024 - Dec 2025',
    description: [
      'Built and maintained 15+ web applications using MERN stack',
      'Designed RESTful APIs with comprehensive documentation',
      'Optimized database queries resulting in 40% performance improvement',
    ],
  },
  {
    type: 'personal experience',
    icon: HiBriefcase,
    title: 'Junior Developer & Designer',
    org: 'Creative Agency',
    period: 'Jun 2024 - Feb 2025',
    description: [
      'Developed responsive websites and web applications',
      'Created UI designs and prototypes in Figma',
      'Collaborated with design team on brand identity projects',
    ],
  },
  {
    type: 'education',
    icon: HiAcademicCap,
    title: 'B.Sc. Computer Science',
    org: 'University of Technology',
    period: '2022 - 2026',
    description: [
      'Specialized in Software Engineering',
      'Dean\'s List recipient for academic excellence',
      'Led university hackathon organizing committee',
    ],
  },
]

export default function Experience() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="experience" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
      <div
        ref={ref}
        className={`section-container transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="section-title">
          Experience &{' '}
          <span className="gradient-text">Education</span>
        </h2>
        <p className="section-subtitle">
          My professional journey and academic background
        </p>

        <div className="relative max-w-3xl mx-auto mt-12">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary opacity-50" />

          <div className="space-y-12">
            {timeline.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className={`relative pl-20 transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-10'
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className="absolute left-4 top-1 w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center z-10">
                    <Icon
                      className={item.type === 'work' ? 'text-primary' : 'text-secondary'}
                      size={16}
                    />
                  </div>

                  <div className="glass rounded-xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300">
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${
                      item.type === 'work'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/10 text-secondary'
                    }`}>
                      {item.type === 'work' ? 'Work' : 'Education'}
                    </span>
                    <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
                    <p className="text-primary text-sm font-medium">{item.org}</p>
                    <p className="text-gray-500 text-sm mt-1 font-mono">{item.period}</p>
                    <ul className="mt-4 space-y-2">
                      {item.description.map((desc, i) => (
                        <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
