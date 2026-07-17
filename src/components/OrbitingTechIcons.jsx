import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { 
  SiReact, 
  SiPython, 
  SiJavascript, 
  SiNodedotjs, 
  SiTailwindcss, 
  SiGit 
} from 'react-icons/si'

const techIcons = [
  { icon: SiReact, color: '#61DAFB' },
  { icon: SiPython, color: '#3776AB' },
  { icon: SiJavascript, color: '#F7DF1E' },
  { icon: SiNodedotjs, color: '#339933' },
  { icon: SiTailwindcss, color: '#06B6D4' },
  { icon: SiGit, color: '#F05032' },
]

export default function OrbitingTechIcons() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    if (!mediaQuery.matches) {
      controls.start({
        rotate: 360,
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        },
      })
    }

    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [controls])

  return (
    <div className="relative flex items-center justify-center">
      {/* Profile photo container with orbit */}
      <div className="relative h-40 w-40 sm:h-48 sm:w-48">
        {/* Orbiting icons container */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0"
            animate={controls}
          >
            {techIcons.map((tech, index) => {
              const Icon = tech.icon
              const angle = (index / techIcons.length) * 2 * Math.PI
              const radius = 110
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <motion.div
                  key={index}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-subtle shadow-lg sm:h-12 sm:w-12">
                    <Icon size={20} className="sm:h-6 sm:w-6" style={{ color: tech.color }} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Ambient glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-40 w-40 rounded-full bg-accent/30 blur-2xl sm:h-48 sm:w-48" />
        </div>
        
        {/* Profile photo */}
        <div className="profile-photo-ring relative z-10 h-full w-full overflow-hidden rounded-full border-4 border-surface shadow-xl">
          <img
            src="/profile.jpg"
            alt="Krish Kataria"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  )
}
