import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function MagneticButton({ children, className = '', ...props }) {
  const ref = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 300 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const checkTouch = () => setIsTouch('ontouchstart' in window)
    checkTouch()
  }, [])

  const handleMouseMove = (e) => {
    if (isTouch || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX
    const mouseY = e.clientY

    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    )

    // Only apply magnetic effect within 30px
    if (distance < 30) {
      const maxShift = 8
      const shiftX = ((mouseX - centerX) / 30) * maxShift
      const shiftY = ((mouseY - centerY) / 30) * maxShift

      x.set(shiftX)
      y.set(shiftY)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Component = props.href ? motion.a : motion.button

  return (
    <Component
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}
