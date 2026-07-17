import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlinkCursor from './BlinkCursor'

export default function Logo({ className = '' }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href="#home"
      className={`flex items-center ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault()
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <motion.span
        className="font-mono text-base font-bold tracking-tight text-accent sm:text-lg"
        animate={{ x: isHovered ? -2 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        &lt;
      </motion.span>
      <span className="font-mono text-base font-bold tracking-tight text-text-primary sm:text-lg">
        Krish
      </span>
      <motion.span
        className="font-mono text-base font-bold tracking-tight text-accent sm:text-lg"
        animate={{ x: isHovered ? 2 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        /&gt;
      </motion.span>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ml-1"
          >
            <BlinkCursor />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  )
}
