import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { scrollToSection } from '../utils/helpers'

const commands = [
  { id: 'about', label: 'Go to About', action: () => scrollToSection(null, '#about') },
  { id: 'projects', label: 'Go to Projects', action: () => scrollToSection(null, '#projects') },
  { id: 'skills', label: 'Go to Skills', action: () => scrollToSection(null, '#skills') },
  { id: 'contact', label: 'Go to Contact', action: () => scrollToSection(null, '#contact') },
  { id: 'github', label: 'Open GitHub', action: () => window.open(personalInfo.github, '_blank') },
  { id: 'linkedin', label: 'Open LinkedIn', action: () => window.open(personalInfo.linkedin, '_blank') },
  { id: 'leetcode', label: 'Open LeetCode', action: () => window.open(personalInfo.leetcode, '_blank') },
  { id: 'resume', label: 'Download Resume', action: () => window.open(personalInfo.resumeLink, '_blank') },
]

export default function CommandPalette({ isOpen, onClose }) {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
      } else if (e.key === 'Enter' && filteredCommands.length > 0) {
        filteredCommands[selectedIndex].action()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg overflow-hidden rounded-xl border border-subtle bg-surface shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center border-b border-subtle px-4 py-3">
                <span className="mr-3 text-accent">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent font-mono text-sm text-text-primary outline-none placeholder:text-text-secondary/50"
                />
                <kbd className="ml-2 rounded border border-subtle bg-muted px-2 py-0.5 text-xs text-text-secondary">
                  ESC
                </kbd>
              </div>
              <div className="max-h-80 overflow-y-auto py-2">
                {filteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-text-secondary">
                    No commands found
                  </div>
                ) : (
                  filteredCommands.map((cmd, index) => (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action()
                        onClose()
                      }}
                      className={`w-full px-4 py-2.5 text-left font-mono text-sm transition-colors ${
                        index === selectedIndex
                          ? 'bg-accent/10 text-accent'
                          : 'text-text-primary hover:bg-muted/50'
                      }`}
                    >
                      {cmd.label}
                    </button>
                  ))
                )}
              </div>
              <div className="border-t border-subtle px-4 py-2">
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span className="flex items-center gap-2">
                    <kbd className="rounded border border-subtle bg-muted px-1.5 py-0.5">↑↓</kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <kbd className="rounded border border-subtle bg-muted px-1.5 py-0.5">↵</kbd>
                    <span>Select</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
