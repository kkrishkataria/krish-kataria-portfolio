import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeProvider'
import PageLoader from './components/PageLoader'
import CustomCursor from './components/CustomCursor'
import KonamiEasterEgg from './components/KonamiEasterEgg'
import CommandPalette from './components/CommandPalette'
import { useCommandPalette } from './utils/helpers'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function AppContent() {
  const skipBoot = sessionStorage.getItem('bootSeen') === '1'
  const [loading, setLoading] = useState(!skipBoot)
  const { isOpen, setIsOpen } = useCommandPalette()

  return (
    <>
      <CustomCursor />
      <KonamiEasterEgg />
      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <AnimatePresence mode="wait">
        {loading && <PageLoader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <div className="relative min-h-screen">
        <div
          aria-hidden="true"
          className="dot-grid-bg pointer-events-none fixed inset-0 z-0"
        />
        <div
          aria-hidden="true"
          className="scanline-overlay pointer-events-none fixed inset-0 z-[9998]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative z-10 min-h-screen"
        >
          <Navbar isReady={!loading} />
          <main>
            <Hero />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Skills className="bg-surface/30" />
            <div className="section-divider" />
            <Projects />
            <div className="section-divider" />
            <Achievements className="bg-surface/30" />
            <div className="section-divider" />
            <Experience />
            <div className="section-divider" />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      </div>
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
