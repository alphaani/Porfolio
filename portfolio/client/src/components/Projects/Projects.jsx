import { useState } from 'react'
import useScrollAnimation from '../../hooks/useScrollAnimation'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects = [
  {
    title: 'School Management System',
    description: 'A comprehensive platform for managing student records, attendance, timetables, grades, and staff coordination with role-based access.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: 'SM',
    gradient: 'from-primary/30 to-accent/30',
    github: '#',
    live: '#',
    category: 'fullstack',
  },
  {
    title: 'Event Management System',
    description: 'End-to-end event planning and management solution with registration, ticketing, scheduling, and real-time attendee tracking.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    image: 'EM',
    gradient: 'from-accent/30 to-secondary/30',
    github: '#',
    live: '#',
    category: 'fullstack',
  },
  {
    title: 'Marks Management System',
    description: 'A grading and assessment platform for educators to record, calculate, and analyze student marks with detailed reports and visualizations.',
    tags: ['React', 'Express', 'MongoDB', 'Chart.js'],
    image: 'MM',
    gradient: 'from-secondary/30 to-primary/30',
    github: '#',
    live: '#',
    category: 'fullstack',
  },
  {
    title: 'Employee Management System',
    description: 'HR management platform handling employee records, payroll, leave tracking, performance reviews, and organizational hierarchy.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: 'EM',
    gradient: 'from-primary/30 to-secondary/30',
    github: '#',
    live: '#',
    category: 'fullstack',
  },
  {
    title: 'Delivery App',
    description: 'A real-time delivery tracking application with order management, route optimization, driver dispatch, and live status updates.',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    image: 'DA',
    gradient: 'from-accent/30 to-primary/30',
    github: '#',
    live: '#',
    category: 'fullstack',
  },
]

const filters = ['all', 'fullstack']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [ref, isVisible] = useScrollAnimation()

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <div
        ref={ref}
        className={`section-container transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-subtitle">
          A showcase of my recent work across development and design
        </p>

        <div className="flex items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'glass text-gray-400 hover:text-text border border-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, idx) => (
            <div
              key={project.title}
              className="group glass rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300"
            >
              <div
                className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                <span className="text-4xl font-bold text-white/30 group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </span>
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/60 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/10 hover:bg-primary rounded-lg text-white transition-colors"
                  >
                    <FiGithub size={18} />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white/10 hover:bg-primary rounded-lg text-white transition-colors"
                  >
                    <FiExternalLink size={18} />
                  </a>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-md font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
