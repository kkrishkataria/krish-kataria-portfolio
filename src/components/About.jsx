import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import OrbitingTechIcons from './OrbitingTechIcons'
import LeetCodeStats from './LeetCodeStats'

const stats = [
  { end: 600, suffix: '+', label: 'LeetCode Problems', decimals: 0 },
  { end: 9.66, suffix: '', label: 'CGPA', decimals: 2 },
  { end: 5, suffix: '+', label: 'Projects', decimals: 0 },
]

function StatCounter({ end, suffix, label, decimals, duration = 1800, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      setValue(end)
      return
    }

    let startTime = null
    let frameId = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(end * eased)

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, end, duration])

  const display =
    decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border border-subtle bg-surface p-4 text-center sm:p-6"
    >
      <p className="text-2xl font-bold tabular-nums text-accent sm:text-3xl md:text-4xl">
        {display}
        {suffix}
      </p>
      <p className="mt-1.5 text-xs text-text-secondary sm:mt-2 sm:text-sm md:text-base">
        {label}
      </p>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="section-padding px-0">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="section-label"
        >
          // about
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          About Me
        </motion.h2>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <p className="body-text mb-10 max-w-3xl sm:mb-12">
              I&apos;m a Computer Engineering student at Thapar Institute
              of Engineering and Technology, driven by competitive programming and
              hands-on full-stack development. I love breaking down complex problems
              through data structures and algorithms, then bringing solutions to life
              with clean, responsive web applications.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
              {stats.map((stat, index) => (
                <StatCounter key={stat.label} {...stat} delay={index * 0.08} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6"
            >
              <LeetCodeStats />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center justify-center lg:col-span-1"
          >
            <OrbitingTechIcons />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
