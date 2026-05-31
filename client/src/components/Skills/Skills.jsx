import useScrollAnimation from '../../hooks/useScrollAnimation'
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss,
  SiFigma, SiCanva, SiTypescript,
  SiNextdotjs, SiFirebase, SiGit,
} from 'react-icons/si'
import { HiPencil } from 'react-icons/hi'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    title: 'Design',
    skills: [
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
      { name: 'Design', icon: HiPencil, color: '#8B5CF6' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
    ],
  },
]

export default function Skills() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="skills" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent pointer-events-none" />
      <div
        ref={ref}
        className={`section-container transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="section-title">
          My <span className="gradient-text">Skills</span>
        </h2>
        <p className="section-subtitle">
          Technologies and tools I work with to bring ideas to life
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="p-6 glass rounded-xl border border-white/5"
            >
              <h3 className="text-lg font-semibold mb-6 text-center gradient-text">
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map(({ name, icon: Icon, color }) => (
                  <div
                    key={name}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-transform group-hover:scale-110"
                      style={{ color, background: `${color}15` }}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-text transition-colors">
                      {name}
                    </span>
                    <div className="ml-auto">
                      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: isVisible ? `${85 + Math.random() * 10}%` : '0%',
                            background: `linear-gradient(90deg, ${color}, ${color}88)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
