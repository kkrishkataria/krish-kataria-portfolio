import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi'
import { personalInfo } from '../data/portfolio'
import { useTheme } from '../context/ThemeProvider'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToSection, useCommandPalette } from '../utils/helpers'
import ScrollProgress from './ScrollProgress'
import Logo from './Logo'

const navLinks = [
  { label: 'about', href: '#about', id: 'about' },
  { label: 'skills', href: '#skills', id: 'skills' },
  { label: 'projects', href: '#projects', id: 'projects' },
  { label: 'achievements', href: '#achievements', id: 'achievements' },
  { label: 'contact', href: '#contact', id: 'contact' },
]

const sectionIds = navLinks.map((link) => link.id)

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-subtle font-mono text-text-secondary transition-colors hover:border-accent/40 hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            <HiMoon size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            <HiSun size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function NavLink({ link, isActive, onClick, className = '' }) {
  return (
    <a
      href={link.href}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={`relative font-mono transition-colors duration-200 ${className} ${
        isActive ? 'text-accent' : 'text-text-secondary hover:text-accent'
      }`}
    >
      ./{link.label}
      {isActive && (
        <motion.span
          layoutId="nav-active-indicator"
          className="absolute -bottom-1.5 left-0 right-0 mx-auto h-0.5 max-w-[70%] rounded-full bg-accent"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </a>
  )
}

export default function Navbar({ isReady = true }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(sectionIds)
  const { isOpen: paletteOpen, setIsOpen: setPaletteOpen } = useCommandPalette()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <ScrollProgress />

      <motion.header
        initial={{ opacity: 0, scale: 0.98, y: -10 }}
        animate={
          isReady
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.98, y: -10 }
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={`fixed inset-x-0 top-[2px] z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-subtle bg-surface/90 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="section-container flex items-center justify-between py-3 sm:py-4">
          <Logo />

          <ul className="hidden items-center gap-5 lg:gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="relative pb-1">
                <NavLink
                  link={link}
                  isActive={activeSection === link.id}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm"
                />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-1.5 rounded-md border border-subtle px-2.5 py-1.5 text-xs font-mono text-text-secondary transition-colors hover:border-accent/40 hover:text-accent sm:flex"
            >
              <span>⌘K</span>
            </button>
            <ThemeToggle />

            <a
              href={personalInfo.resumeLink}
              download="Krish_Kataria_Resume.pdf"
              data-cursor="pointer"
              className="terminal-btn-primary hidden px-3 py-2 text-xs sm:text-sm md:inline-flex"
            >
              <span className="text-accent">&gt;</span>
              <span>$ resume</span>
            </a>

            <button
              type="button"
              className="text-text-primary md:hidden"
              onClick={() => setIsOpen((open) => !open)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] flex flex-col bg-surface/98 backdrop-blur-xl md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex items-center justify-between border-b border-subtle px-5 py-4"
            >
              <span className="font-mono text-sm font-semibold text-text-primary">
                ./menu
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="text-text-secondary hover:text-accent"
              >
                <HiX size={22} />
              </button>
            </motion.div>

            <ul className="flex flex-1 flex-col items-center justify-center gap-1 px-6">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.08 + index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-full max-w-xs"
                >
                  <a
                    href={link.href}
                    onClick={(e) =>
                      scrollToSection(e, link.href, () => setIsOpen(false))
                    }
                    aria-current={activeSection === link.id ? 'page' : undefined}
                    className={`relative block rounded-md px-4 py-4 text-center font-mono text-lg transition-colors ${
                      activeSection === link.id
                        ? 'text-accent'
                        : 'text-text-secondary hover:bg-muted hover:text-accent'
                    }`}
                  >
                    ./{link.label}
                    {activeSection === link.id && (
                      <motion.span
                        layoutId="nav-mobile-indicator"
                        className="absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, delay: 0.35 }}
              className="border-t border-subtle p-5"
            >
              <a
                href={personalInfo.resumeLink}
                download="Krish_Kataria_Resume.pdf"
                className="terminal-btn-primary flex w-full justify-center py-3"
              >
                <span className="text-accent">&gt;</span>
                <span>$ download-resume</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
