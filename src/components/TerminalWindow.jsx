import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import BlinkCursor from './BlinkCursor'
import { personalInfo } from '../data/portfolio'
import { scrollToSection } from '../utils/helpers'

const CODE_LINES = [
  [
    { text: 'const', type: 'keyword' },
    { text: ' ', type: 'plain' },
    { text: 'developer', type: 'variable' },
    { text: ' = {', type: 'punctuation' },
  ],
  [
    { text: '  name: ', type: 'punctuation' },
    { text: '"Krish Kataria"', type: 'string' },
    { text: ',', type: 'punctuation' },
  ],
  [
    { text: '  role: ', type: 'punctuation' },
    { text: '"Full-Stack Developer"', type: 'string' },
    { text: ',', type: 'punctuation' },
  ],
  [
    { text: '  skills: [', type: 'punctuation' },
    { text: '"React"', type: 'string' },
    { text: ', ', type: 'punctuation' },
    { text: '"Node.js"', type: 'string' },
    { text: ', ', type: 'punctuation' },
    { text: '"C++"', type: 'string' },
    { text: ', ', type: 'punctuation' },
    { text: '"MongoDB"', type: 'string' },
    { text: '],', type: 'punctuation' },
  ],
  [
    { text: '  currentFocus: ', type: 'punctuation' },
    { text: '"Backend Development"', type: 'string' },
  ],
  [{ text: '};', type: 'punctuation' }],
]

function SyntaxToken({ type, children }) {
  const classMap = {
    keyword: 'syntax-keyword',
    string: 'syntax-string',
    variable: 'syntax-variable',
    punctuation: 'syntax-punctuation',
    plain: 'text-text-secondary',
  }

  return <span className={classMap[type]}>{children}</span>
}

function renderLineTokens(tokens) {
  return tokens.map((token, index) => (
    <SyntaxToken key={`${token.text}-${index}`} type={token.type}>
      {token.text}
    </SyntaxToken>
  ))
}

const COMMANDS = {
  help: {
    response: 'Available commands: whoami, skills, projects, contact, clear, github, linkedin, leetcode',
  },
  whoami: {
    response: `Name: ${personalInfo.name}\nRole: ${personalInfo.title}\nEmail: ${personalInfo.email}`,
  },
  skills: {
    response: 'Languages: C, C++, Python, JavaScript, SQL, R\nFrameworks: React.js, HTML, CSS, Tailwind CSS\nCore CS: DSA, OOP, DBMS, OS, Computer Networks\nTools: Git, GitHub, VS Code, Google Colab, MATLAB, AutoCAD',
    action: () => scrollToSection(null, '#skills'),
  },
  projects: {
    response: 'Scrolling to projects section...',
    action: () => scrollToSection(null, '#projects'),
  },
  contact: {
    response: `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nLinkedIn: ${personalInfo.linkedin}`,
    action: () => scrollToSection(null, '#contact'),
  },
  github: {
    response: `Opening GitHub: ${personalInfo.github}`,
    action: () => window.open(personalInfo.github, '_blank'),
  },
  linkedin: {
    response: `Opening LinkedIn: ${personalInfo.linkedin}`,
    action: () => window.open(personalInfo.linkedin, '_blank'),
  },
  leetcode: {
    response: `Opening LeetCode: ${personalInfo.leetcode}`,
    action: () => window.open(personalInfo.leetcode, '_blank'),
  },
  clear: {
    response: null,
    action: () => {},
  },
}

export default function TerminalWindow() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [output, setOutput] = useState([])
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  const currentLineText = CODE_LINES[lineIndex]
    ?.map((token) => token.text)
    .join('') ?? ''

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      setLineIndex(CODE_LINES.length - 1)
      setCharIndex(CODE_LINES[CODE_LINES.length - 1].map((t) => t.text).join('').length)
      setDone(true)
      return
    }

    if (done) return

    const timer = window.setTimeout(() => {
      if (charIndex < currentLineText.length) {
        setCharIndex((value) => value + 1)
        return
      }

      if (lineIndex < CODE_LINES.length - 1) {
        setLineIndex((value) => value + 1)
        setCharIndex(0)
        return
      }

      setDone(true)
    }, 28)

    return () => window.clearTimeout(timer)
  }, [charIndex, currentLineText.length, done, lineIndex])

  useEffect(() => {
    if (done && inputRef.current) {
      inputRef.current.focus()
    }
  }, [done])

  const handleKeyDown = (e) => {
    if (!done) return

    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase()
      if (command) {
        setCommandHistory((prev) => [...prev, command])
        setHistoryIndex(-1)
        
        const cmd = COMMANDS[command]
        if (cmd) {
          setOutput((prev) => [...prev, { type: 'command', text: input }])
          if (cmd.response) {
            setOutput((prev) => [...prev, { type: 'response', text: cmd.response }])
          }
          if (cmd.action) cmd.action()
        } else {
          setOutput((prev) => [...prev, { type: 'command', text: input }])
          setOutput((prev) => [...prev, { type: 'error', text: `Command not found: ${command}. Type 'help' for available commands.` }])
        }
        
        if (command === 'clear') {
          setOutput([])
        }
      }
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1)
        setHistoryIndex(newIndex === commandHistory.length - 1 ? -1 : newIndex)
        setInput(newIndex === commandHistory.length - 1 ? '' : commandHistory[newIndex])
      }
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  function getVisibleTokensForLine(lineTokens, visibleChars) {
    let remaining = visibleChars
    const visible = []

    for (const token of lineTokens) {
      if (remaining <= 0) break
      const slice = token.text.slice(0, remaining)
      if (slice) visible.push({ ...token, text: slice })
      remaining -= token.text.length
    }

    return visible
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 }}
      className="w-full overflow-hidden rounded-md border border-subtle bg-surface/80 font-mono text-xs shadow-lg backdrop-blur-sm sm:text-sm"
      onClick={() => done && inputRef.current?.focus()}
    >
      <div className="flex items-center gap-3 border-b border-subtle bg-muted/80 px-3 py-2.5 sm:px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
        </div>
        <span className="truncate text-[10px] text-text-secondary sm:text-xs">
          krish@portfolio: ~
        </span>
      </div>

      <div 
        ref={terminalRef}
        className="max-h-[320px] space-y-0.5 overflow-y-auto p-3 leading-relaxed sm:p-4 sm:leading-relaxed"
      >
        {CODE_LINES.map((lineTokens, index) => {
          if (index > lineIndex) return null

          const isCurrentLine = index === lineIndex && !done
          const visibleChars =
            index < lineIndex ? lineTokens.map((t) => t.text).join('').length : charIndex
          const visibleTokens = getVisibleTokensForLine(lineTokens, visibleChars)

          return (
            <div key={index} className="whitespace-pre-wrap break-all">
              {renderLineTokens(visibleTokens)}
              {isCurrentLine && <BlinkCursor />}
            </div>
          )
        })}
        
        {done && (
          <>
            {output.map((item, index) => (
              <div key={index} className="whitespace-pre-wrap break-all">
                {item.type === 'command' && (
                  <span className="text-accent">krish@portfolio:~$ </span>
                )}
                <span className={
                  item.type === 'error' ? 'text-red-400' : 
                  item.type === 'response' ? 'text-text-secondary' : 
                  'text-text-primary'
                }>
                  {item.text}
                </span>
              </div>
            ))}
            
            <div className="flex items-center">
              <span className="text-accent">krish@portfolio:~$ </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent font-mono text-xs text-text-primary outline-none sm:text-sm"
                placeholder="Type a command..."
                autoComplete="off"
              />
              <BlinkCursor />
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
