import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
const SYMBOLS = ['{', '}', '<', '/', '>', ';', '[', ']', '(', ')']

export default function KonamiEasterEgg() {
  const [isActive, setIsActive] = useState(false)
  const [symbols, setSymbols] = useState([])

  useEffect(() => {
    let currentIndex = 0
    let timeoutId = null

    const handleKeyDown = (event) => {
      if (event.code === KONAMI_CODE[currentIndex]) {
        currentIndex++
        if (currentIndex === KONAMI_CODE.length) {
          triggerEasterEgg()
          currentIndex = 0
        }
      } else {
        currentIndex = 0
      }
    }

    const triggerEasterEgg = () => {
      setIsActive(true)
      const newSymbols = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      }))
      setSymbols(newSymbols)

      timeoutId = window.setTimeout(() => {
        setIsActive(false)
        setSymbols([])
      }, 3000)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
        >
          {symbols.map((symbol) => (
            <motion.div
              key={symbol.id}
              initial={{ y: symbol.y, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 50,
                opacity: 0,
                rotate: Math.random() * 360 - 180,
              }}
              transition={{
                duration: 2.5 + Math.random() * 1,
                ease: 'easeOut',
              }}
              className="absolute font-mono text-2xl text-accent/60 sm:text-3xl"
              style={{ left: `${symbol.x}%` }}
            >
              {symbol.symbol}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="rounded-2xl border border-accent/30 bg-background/80 px-8 py-4 backdrop-blur-md">
              <p className="font-mono text-xl text-accent">🎮 Konami Code Activated!</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
