import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub, FaCode } from 'react-icons/fa'
import { projects } from '../data/portfolio'

function isValidLink(url) {
  return typeof url === 'string' && url.startsWith('http')
}

function LinkButton({ href, label, icon: Icon }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-subtle bg-muted text-text-secondary transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
    >
      <Icon size={18} />
    </motion.a>
  )
}

function ProjectCard({ project, index }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 })

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const centerX = width / 2
    const centerY = height / 2
    mouseX.set((event.clientX - rect.left - centerX) / width)
    mouseY.set((event.clientY - rect.top - centerY) / height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group card-depth card-glow card-top-accent flex flex-col p-4 sm:p-6"
    >
      <div className="project-thumbnail">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="project-thumbnail-inner">
            <FaCode className="h-12 w-12 text-text-secondary/30 sm:h-16 sm:w-16" />
          </div>
        )}
      </div>

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <h3 className="card-title transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <span className="w-fit shrink-0 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          {project.date}
        </span>
      </div>

      <p className="body-text mb-4 flex-1 sm:mb-5">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2 sm:mb-5">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-subtle bg-surface/80 px-2.5 py-1 text-xs text-text-primary"
          >
            {tech}
          </span>
        ))}
      </div>

      {(isValidLink(project.github) || isValidLink(project.demo)) && (
        <div className="flex items-center gap-3 border-t border-subtle pt-4">
          {isValidLink(project.github) && (
            <LinkButton
              href={project.github}
              label={`${project.title} GitHub`}
              icon={FaGithub}
            />
          )}
          {isValidLink(project.demo) && (
            <LinkButton
              href={project.demo}
              label={`${project.title} demo`}
              icon={FaExternalLinkAlt}
            />
          )}
        </div>
      )}
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding px-0">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="section-label"
        >
          // projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
