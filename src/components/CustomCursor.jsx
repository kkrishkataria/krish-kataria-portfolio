import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)
  const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (!finePointer || reducedMotion) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const handleMove = (event) => {
      rawX.set(event.clientX)
      rawY.set(event.clientY)

      const target = event.target
      const clickable =
        target instanceof Element &&
        target.closest(
          'a, button, [data-cursor="pointer"], input, textarea, select, label',
        )
      setIsPointer(Boolean(clickable))
    }

    window.addEventListener('mousemove', handleMove, { passive: true })

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMove)
    }
  }, [rawX, rawY])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      {isPointer ? (
        <span className="custom-cursor-pointer font-mono text-sm font-bold leading-none text-accent">
          _
        </span>
      ) : (
        <span className="custom-cursor-crosshair block h-3 w-3">
          <span className="custom-cursor-crosshair-h" />
          <span className="custom-cursor-crosshair-v" />
        </span>
      )}
    </motion.div>
  )
}
