import { motion } from 'framer-motion'
import { skills } from '../data/portfolio'

const skillCategories = [
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks & Web' },
  { key: 'coreCS', label: 'Core CS' },
  { key: 'tools', label: 'Tools' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const pillVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

function toCodeTag(skill) {
  return (
    '#' +
    skill
      .toLowerCase()
      .replace(/\.js$/i, '')
      .replace(/\s+/g, '')
      .replace(/\+\+/g, 'pp')
      .replace(/[^a-z0-9]/g, '')
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-surface/80 px-0 backdrop-blur-sm relative overflow-hidden">
      <div
        aria-hidden="true"
        className="floating-symbol left-[5%] top-[20%]"
        style={{ animationDelay: '0s' }}
      >
        {'{'}
      </div>
      <div
        aria-hidden="true"
        className="floating-symbol right-[8%] top-[15%]"
        style={{ animationDelay: '2s' }}
      >
        {'}'}
      </div>
      <div
        aria-hidden="true"
        className="floating-symbol left-[10%] bottom-[25%]"
        style={{ animationDelay: '4s' }}
      >
        &lt;
      </div>
      <div
        aria-hidden="true"
        className="floating-symbol right-[15%] bottom-[20%]"
        style={{ animationDelay: '6s' }}
      >
        /&gt;
      </div>
      <div className="section-container relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="section-label"
        >
          // skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Tech Stack
        </motion.h2>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {skillCategories.map(({ key, label }, categoryIndex) => (
            <motion.div
              key={key}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: categoryIndex * 0.08 }}
              className="rounded-md border border-subtle bg-background/80 p-4 transition-colors hover:border-accent/20 sm:p-6"
            >
              <h3 className="mb-4 font-mono text-sm font-semibold text-accent sm:mb-5 sm:text-base">
                {label}
              </h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="flex flex-wrap gap-2 sm:gap-2.5"
              >
                {skills[key].map((skill) => (
                  <motion.span
                    key={skill}
                    variants={pillVariants}
                    className="code-tag hover:shadow-[0_0_14px_rgba(56,189,248,0.25)]"
                  >
                    {toCodeTag(skill)}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
