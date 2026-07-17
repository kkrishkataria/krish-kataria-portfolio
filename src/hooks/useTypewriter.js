import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function useTypewriter(text, { speed = 28, margin = '-40px' } = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin })
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!isInView) return

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
  }, [isInView, text, speed])

  return { ref, displayed }
}
