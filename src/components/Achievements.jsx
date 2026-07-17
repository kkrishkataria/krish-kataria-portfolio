import { motion } from 'framer-motion'
import { FaTrophy, FaAward, FaMedal } from 'react-icons/fa'
import { achievements } from '../data/portfolio'

const achievementIcons = [FaTrophy, FaAward, FaMedal]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding bg-surface px-0">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className="section-label"
        >
          // achievements
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Achievements
        </motion.h2>

        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative space-y-0"
        >
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-5 top-4 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent sm:left-6 md:left-7"
          />

          {achievements.map((item, index) => {
            const Icon = achievementIcons[index % achievementIcons.length]

            return (
              <motion.li
                key={item}
                variants={itemVariants}
                className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5 sm:pb-10 md:gap-6"
              >
                <div className="relative z-10 flex shrink-0 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-[0_0_20px_rgba(56,189,248,0.15)] backdrop-blur-sm sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <Icon size={18} className="sm:h-5 sm:w-5 md:h-[22px] md:w-[22px]" />
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 rounded-xl border border-subtle bg-background/60 p-4 backdrop-blur-sm transition-colors hover:border-accent/25 sm:p-5 md:p-6"
                >
                  <p className="body-text">
                    {item}
                  </p>
                </motion.div>
              </motion.li>
            )
          })}
        </motion.ol>
      </div>
    </section>
  )
}
