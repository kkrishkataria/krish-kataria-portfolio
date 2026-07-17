import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi'
import { personalInfo } from '../data/portfolio'
import { scrollToTop } from '../utils/helpers'

export default function Footer() {
  const year = new Date().getFullYear()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <footer className="border-t border-subtle px-0 py-8">
        <div className="section-container flex flex-col items-center justify-between gap-3 text-center text-xs text-text-secondary sm:flex-row sm:text-sm">
          <p>
            &copy; {year} {personalInfo.name}. All rights reserved.
          </p>
          <p>Built with React, Vite &amp; Tailwind CSS</p>
        </div>
      </footer>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-subtle bg-surface/90 text-text-primary shadow-lg backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent sm:bottom-6 sm:right-6"
          >
            <HiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
