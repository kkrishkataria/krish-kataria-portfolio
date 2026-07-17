import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa'
import { positions, education } from '../data/portfolio'

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

function TimelineGroup({ title, icon: Icon, items, renderItem }) {
  const lineRef = useRef(null)
  const isInView = useInView(lineRef, { once: true, margin: '-80px' })

  return (
    <div className="mb-12 last:mb-0 md:mb-16">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon size={16} />
        </div>
        <h3 className="card-title">
          {title}
        </h3>
      </div>

      <div ref={lineRef} className="relative pl-8 sm:pl-10">
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-[11px] top-0 w-0.5 origin-top bg-accent/30 sm:left-[15px]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="space-y-8">
          {items.map((item, index) => (
            <motion.div
              key={renderItem.key(item)}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="relative"
            >
              <div className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background sm:-left-[32px] sm:top-2 sm:h-3.5 sm:w-3.5" />
              {renderItem.content(item)}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding px-0">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="section-label"
        >
          // experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Experience &amp; Education
        </motion.h2>

        <TimelineGroup
          title="Experience"
          icon={FaBriefcase}
          items={positions}
          renderItem={{
            key: (item) => `${item.org}-${item.role}`,
            content: (item) => (
              <div className="rounded-xl border border-subtle bg-surface p-4 sm:p-5">
                <span className="mb-1 block text-xs font-medium text-accent sm:text-sm">
                  {item.duration}
                </span>
                <h4 className="card-title">
                  {item.role}
                </h4>
                <p className="mb-1 text-sm text-text-secondary sm:text-base">
                  {item.org}
                </p>
                <p className="mb-2 text-xs text-text-secondary sm:text-sm">
                  {item.location}
                </p>
                <p className="body-text text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            ),
          }}
        />

        <TimelineGroup
          title="Education"
          icon={FaGraduationCap}
          items={education}
          renderItem={{
            key: (item) => `${item.school}-${item.degree}`,
            content: (item) => (
              <div className="rounded-xl border border-subtle bg-surface p-4 sm:p-5">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                  <h4 className="card-title">
                    {item.degree}
                  </h4>
                  <span className="text-xs font-medium text-accent sm:text-sm">
                    {item.score}
                  </span>
                </div>
                <p className="mb-1 text-sm text-text-primary sm:text-base">
                  {item.school}
                </p>
                <p className="text-xs text-text-secondary sm:text-sm">
                  {item.duration} · {item.location}
                </p>
              </div>
            ),
          }}
        />
      </div>
    </section>
  )
}
