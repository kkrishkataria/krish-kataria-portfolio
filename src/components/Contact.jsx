import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { socialLinks } from '../utils/helpers'
import { FaCheck, FaSpinner, FaExclamationTriangle } from 'react-icons/fa'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const [formState, setFormState] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const honeypot = form.querySelector('input[name="website"]')?.value

    // Honeypot check - if filled, it's a bot
    if (honeypot) {
      setFormState('success') // Pretend success for bots
      setTimeout(() => setFormState('idle'), 3000)
      form.reset()
      return
    }

    // Validation
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const message = form.message.value.trim()

    if (!name || !email || !message) {
      setErrorMessage('Please fill in all fields')
      setFormState('error')
      setTimeout(() => {
        setFormState('idle')
        setErrorMessage('')
      }, 3000)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address')
      setFormState('error')
      setTimeout(() => {
        setFormState('idle')
        setErrorMessage('')
      }, 3000)
      return
    }

    setFormState('loading')
    setErrorMessage('')

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      console.log('EmailJS Debug:', {
        serviceId: serviceId ? 'SET' : 'MISSING',
        templateId: templateId ? 'SET' : 'MISSING',
        publicKey: publicKey ? publicKey.substring(0, 8) + '...' : 'MISSING',
        data: { name, email, message: message.substring(0, 50) + '...' }
      })

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing. Please create a .env file with VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY')
      }

      await emailjs.send(serviceId, templateId, {
        name: name,
        email: email,
        message: message,
      }, publicKey)

      setFormState('success')
      form.reset()
      setTimeout(() => setFormState('idle'), 3000)
    } catch (error) {
      console.error('Email send error:', error)
      setErrorMessage('Something went wrong. Please email me directly at ' + personalInfo.email)
      setFormState('error')
      setTimeout(() => {
        setFormState('idle')
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <section id="contact" className="section-padding px-0">
      <div
        aria-hidden="true"
        className="gradient-mesh-bg-alt pointer-events-none absolute inset-0 z-0"
      />
      <div className="section-container relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="section-label"
        >
          // contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="section-title text-center"
        >
          Get in Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="body-text mx-auto mb-10 max-w-xl text-center"
        >
          Open to opportunities and collaborations. Send a message or reach out
          directly.
        </motion.p>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="space-y-6 lg:col-span-3"
          >
            <div className="input-floating-label">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder=" "
                className="input-field input-glow"
              />
              <label htmlFor="name">Name</label>
            </div>

            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="input-floating-label">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder=" "
                className="input-field input-glow"
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-floating-label">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder=" "
                className="input-field input-glow resize-none"
              />
              <label htmlFor="message">Message</label>
            </div>

            <motion.button
              type="submit"
              disabled={formState === 'loading' || formState === 'success'}
              whileHover={formState === 'idle' ? { scale: 1.02, x: 2 } : {}}
              whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
              className="terminal-btn-primary w-full sm:w-auto"
            >
              <AnimatePresence mode="wait">
                {formState === 'idle' && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-accent">&gt;</span>
                    <span>$ send-message</span>
                  </motion.span>
                )}
                {formState === 'loading' && (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <FaSpinner className="animate-spin text-accent" />
                    <span>$ sending...</span>
                  </motion.span>
                )}
                {formState === 'success' && (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 text-accent-secondary"
                  >
                    <FaCheck />
                    <span>$ message-sent</span>
                  </motion.span>
                )}
                {formState === 'error' && (
                  <motion.span
                    key="error"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 text-red-400"
                  >
                    <FaExclamationTriangle />
                    <span>$ error</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400"
              >
                {errorMessage}
              </motion.p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col justify-center lg:col-span-2"
          >
            <div className="rounded-xl border border-subtle bg-background p-5 sm:p-6">
              <h3 className="card-title mb-4">
                Contact Details
              </h3>

              <div className="space-y-3 text-sm sm:text-base">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="block text-text-secondary transition-colors hover:text-accent"
                >
                  {personalInfo.email}
                </a>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="block text-text-secondary transition-colors hover:text-accent"
                >
                  {personalInfo.phone}
                </a>
              </div>

              <div className="mt-6 flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      className="social-icon-circle"
                    >
                      <Icon size={20} />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
