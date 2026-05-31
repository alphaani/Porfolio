import useScrollAnimation from '../../hooks/useScrollAnimation'
import { HiCode, HiColorSwatch, HiPhotograph } from 'react-icons/hi'
import profileImg from '../../assets/profile.jpg'

const highlights = [
  {
    icon: HiCode,
    title: 'MERN Stack Development',
    description: 'Building full-stack web applications with MongoDB, Express.js, React, and Node.js.',
  },
  {
    icon: HiColorSwatch,
    title: 'UI/UX Design',
    description: 'Creating intuitive, user-centered designs with modern tools and design thinking.',
  },
  {
    icon: HiPhotograph,
    title: 'Graphic Design',
    description: 'Crafting visual identities, branding, and digital assets that stand out.',
  },
]

export default function About() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="about" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      <div
        ref={ref}
        className={`section-container transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="section-title">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="section-subtitle">
          A passionate developer and designer dedicated to creating impactful digital solutions
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div>
            <div className="relative">
              <div className="w-full aspect-[4/3] glass rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-32 glass rounded-xl border border-white/10 flex items-center justify-center p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold gradient-text">3+</p>
                  <p className="text-gray-400 text-sm">Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">
              Turning Ideas Into{' '}
              <span className="gradient-text">Digital Reality</span>
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              I'm a multidisciplinary developer and designer with a passion for creating 
              beautiful, functional digital experiences. With expertise spanning the full 
              MERN stack, UI/UX design, and graphic design, I bring a holistic approach 
              to every project.
            </p>

            <p className="text-gray-400 leading-relaxed mb-8">
              When I'm not coding or designing, you'll find me exploring new technologies, 
              contributing to open-source projects, or finding creative inspiration in 
              the world around me.
            </p>

            <div className="flex flex-wrap gap-3">
              {['React', 'Node.js', 'MongoDB', 'Figma', 'Adobe Suite', 'Tailwind CSS'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 glass rounded-lg text-sm text-gray-300 border border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-16">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-6 glass rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="text-primary" size={24} />
              </div>
              <h4 className="font-semibold mb-2">{title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
