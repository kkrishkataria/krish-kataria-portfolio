import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const scaleX = useSpring(0, { stiffness: 120, damping: 28, mass: 0.4 })

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const next = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setProgress(next)
      scaleX.set(next)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [scaleX])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-subtle/30"
    >
      <motion.div
        className="h-full w-full origin-left bg-accent"
        style={{ scaleX }}
      />
      <span className="sr-only">
        Page scroll progress: {Math.round(progress * 100)}%
      </span>
    </div>
  )
}
