import { useState, useEffect } from 'react'
import { personalInfo } from '../data/portfolio'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { HiMail } from 'react-icons/hi'

export const socialLinks = [
  { label: 'GitHub', href: personalInfo.github, icon: FaGithub },
  { label: 'LinkedIn', href: personalInfo.linkedin, icon: FaLinkedin },
  { label: 'LeetCode', href: personalInfo.leetcode, icon: SiLeetcode },
  { label: 'Email', href: `mailto:${personalInfo.email}`, icon: HiMail },
]

export function scrollToSection(event, href, onComplete) {
  if (event) event.preventDefault()
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  onComplete?.()
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return { isOpen, setIsOpen }
}
