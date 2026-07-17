import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { scrollToSection, socialLinks } from '../utils/helpers'
import TerminalWindow from './TerminalWindow'
import BlinkCursor from './BlinkCursor'
import MagneticButton from './MagneticButton'

const nameWords = personalInfo.name.split(' ')

function Typewriter({ text, speed = 35 }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      setDisplayed(text)
      return
    }

    setDisplayed('')
    let index = 0

    const interval = window.setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(interval)
      }
    }, speed)

    return () => window.clearInterval(interval)
  }, [text, speed])

  return <span aria-label={text}>{displayed}</span>
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center section-padding px-0 pt-28 sm:pt-32"
    >
      <div
        aria-hidden="true"
        className="gradient-mesh-bg pointer-events-none absolute inset-0 z-0"
      />
      <div className="section-container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="section-label mb-3"
            >
              // hello-world
            </motion.p>

            <h1 className="hero-title mb-4 sm:mb-5">
              {nameWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mr-[0.28em] inline-block last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
              <BlinkCursor />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: nameWords.length * 0.18 + 0.1 }}
              className="mb-3 max-w-3xl font-sans text-base leading-normal text-text-primary sm:mb-4 sm:text-lg md:text-xl"
            >
              {personalInfo.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: nameWords.length * 0.18 + 0.35 }}
              className="body-text mb-8 min-h-[4rem] max-w-2xl sm:mb-10 sm:min-h-[3.5rem]"
            >
              <Typewriter text={personalInfo.tagline} speed={28} />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: nameWords.length * 0.18 + 0.5 }}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <MagneticButton
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="terminal-btn-primary"
              >
                <span className="text-accent">&gt;</span>
                <span>$ view-projects</span>
              </MagneticButton>
              <MagneticButton
                href={personalInfo.resumeLink}
                download="Krish_Kataria_Resume.pdf"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="terminal-btn"
              >
                <span className="text-accent">&gt;</span>
                <span>$ download-resume</span>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: nameWords.length * 0.18 + 0.65 }}
              className="mt-8 flex gap-4 sm:mt-10"
            >
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="social-icon-circle"
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <TerminalWindow />
          </div>
        </div>
      </div>
    </section>
  )
}
