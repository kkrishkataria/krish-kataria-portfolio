import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalInfo } from '../data/portfolio'

export default function LeetCodeStats() {
  const [stats, setStats] = useState({
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    ranking: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        // Extract username from LeetCode URL
        const username = personalInfo.leetcode.split('/u/').pop().replace('/', '')
        
        // Use LeetCode GraphQL API
        const query = `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
            user(username: $username) {
              profile {
              ranking
              }
            }
          }
        `
        
        const response = await fetch('https://leetcode.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { username },
          }),
        })
        
        if (!response.ok) throw new Error('Failed to fetch LeetCode stats')
        
        const data = await response.json()
        
        const submissionStats = data.data.matchedUser.submitStats.acSubmissionNum
        const ranking = data.data.user?.profile?.ranking || 0
        
        const easy = submissionStats.find(s => s.difficulty === 'Easy')?.count || 0
        const medium = submissionStats.find(s => s.difficulty === 'Medium')?.count || 0
        const hard = submissionStats.find(s => s.difficulty === 'Hard')?.count || 0
        const totalSolved = easy + medium + hard
        
        setStats({ totalSolved, easy, medium, hard, ranking })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeetCodeStats()
  }, [])

  const AnimatedCounter = ({ end, duration = 1500 }) => {
    const [value, setValue] = useState(0)
    
    useEffect(() => {
      if (!isInView) return
      
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      
      if (prefersReducedMotion) {
        setValue(end)
        return
      }
      
      let startTime = null
      let frameId = null
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        setValue(Math.floor(end * eased))
        
        if (progress < 1) {
          frameId = requestAnimationFrame(animate)
        }
      }
      
      frameId = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(frameId)
    }, [isInView, end, duration])
    
    return <span>{value}</span>
  }

  const RadialProgress = ({ value, max, color, label }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0
    const radius = 24
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={64} height={64} className="transform -rotate-90">
            <circle
              cx={32}
              cy={32}
              r={radius}
              stroke="currentColor"
              strokeWidth={4}
              fill="none"
              className="text-muted/30"
            />
            <motion.circle
              cx={32}
              cy={32}
              r={radius}
              stroke={color}
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={isInView ? { strokeDashoffset: offset } : {}}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ strokeDasharray: circumference }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-text-primary">
              <AnimatedCounter end={value} />
            </span>
          </div>
        </div>
        <span className="mt-1 text-xs text-text-secondary">{label}</span>
      </div>
    )
  }

  if (loading) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-subtle bg-surface p-4 sm:p-6"
      >
        <div className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      </motion.div>
    )
  }

  if (error) {
    return null
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-subtle bg-surface p-4 sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-sm font-semibold text-accent sm:text-base">
          LeetCode Stats
        </h3>
        <a
          href={personalInfo.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-accent hover:underline sm:text-sm"
        >
          View Profile →
        </a>
      </div>

      <div className="mb-4 text-center">
        <p className="text-3xl font-bold text-accent sm:text-4xl">
          <AnimatedCounter end={stats.totalSolved} />
        </p>
        <p className="mt-1 text-xs text-text-secondary sm:text-sm">Problems Solved</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <RadialProgress
          value={stats.easy}
          max={stats.totalSolved}
          color="#00B8A3"
          label="Easy"
        />
        <RadialProgress
          value={stats.medium}
          max={stats.totalSolved}
          color="#FFC01E"
          label="Medium"
        />
        <RadialProgress
          value={stats.hard}
          max={stats.totalSolved}
          color="#FF375F"
          label="Hard"
        />
      </div>

      {stats.ranking > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-text-secondary">
            Global Ranking: <span className="font-semibold text-accent">#{stats.ranking.toLocaleString()}</span>
          </p>
        </div>
      )}
    </motion.div>
  )
}
