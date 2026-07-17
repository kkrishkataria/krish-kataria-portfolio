import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BlinkCursor from './BlinkCursor'

const BOOT_LINES = [
  { text: 'Initializing portfolio...', suffix: '' },
  { text: 'Loading modules...', suffix: ' done', success: true },
  { text: 'Compiling components...', suffix: ' done', success: true },
  { text: 'Welcome, visitor.', suffix: '' },
]

export default function PageLoader({ onDone }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const skipBoot = sessionStorage.getItem('bootSeen') === '1'

  const currentLine = BOOT_LINES[lineIndex]
  const fullLine = currentLine
    ? `${currentLine.text}${lineIndex < lineIndex || charIndex >= currentLine.text.length ? currentLine.suffix : ''}`
    : ''

  useEffect(() => {
    if (skipBoot) {
      onDone()
      return
    }

    if (finished) {
      sessionStorage.setItem('bootSeen', '1')
      const timer = window.setTimeout(onDone, 350)
      return () => window.clearTimeout(timer)
    }
  }, [finished, onDone, skipBoot])

  useEffect(() => {
    if (skipBoot || finished) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      setLineIndex(BOOT_LINES.length - 1)
      setCharIndex(BOOT_LINES[BOOT_LINES.length - 1].text.length)
      setFinished(true)
      return
    }

    const line = BOOT_LINES[lineIndex]
    if (!line) return

    const timer = window.setTimeout(() => {
      if (charIndex < line.text.length) {
        setCharIndex((value) => value + 1)
        return
      }

      if (lineIndex < BOOT_LINES.length - 1) {
        setLineIndex((value) => value + 1)
        setCharIndex(0)
        return
      }

      setFinished(true)
    }, 22)

    return () => window.clearTimeout(timer)
  }, [charIndex, finished, lineIndex, skipBoot])

  if (skipBoot) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-md font-mono text-xs leading-relaxed sm:text-sm">
        {BOOT_LINES.map((line, index) => {
          if (index > lineIndex) return null

          const isActive = index === lineIndex && !finished
          const visibleText =
            index < lineIndex
              ? line.text
              : line.text.slice(0, charIndex)
          const showSuffix =
            index < lineIndex || charIndex >= line.text.length

          return (
            <div key={line.text} className="mb-1.5">
              <span className="text-accent">&gt;</span>{' '}
              <span className="text-text-primary">{visibleText}</span>
              {showSuffix && (
                <span className={line.success ? 'text-success' : 'text-text-primary'}>
                  {line.suffix}
                </span>
              )}
              {isActive && <BlinkCursor />}
            </div>
          )
        })}
        {finished && (
          <div className="mt-1">
            <BlinkCursor />
          </div>
        )}
      </div>
    </motion.div>
  )
}
