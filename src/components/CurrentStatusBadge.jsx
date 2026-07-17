import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CurrentStatusBadge() {
  const [status, setStatus] = useState({ project: '', lastUpdated: '' })

  useEffect(() => {
    fetch('/currentStatus.json')
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() => {
        // Fallback if fetch fails
        setStatus({ project: 'something cool', lastUpdated: '' })
      })
  }, [])

  if (!status.project) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs sm:text-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="text-text-secondary">
        Currently building: <span className="text-accent">{status.project}</span>
      </span>
    </motion.div>
  )
}
