import { motion } from 'framer-motion'
import { useTypewriter } from '../hooks/useTypewriter'

export default function SectionHeader({
  index,
  slug,
  title,
  centered = false,
}) {
  const paddedIndex = String(index).padStart(2, '0')
  const { ref, displayed } = useTypewriter(title)

  return (
    <div className={centered ? 'text-center' : undefined}>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.35 }}
        className="section-label"
      >
        {'// '}
        {paddedIndex}. {slug}
      </motion.p>

      <h2 ref={ref} className="section-title">
        <span className="mr-2 text-accent/50">[{paddedIndex}]</span>
        <span aria-label={title}>{displayed}</span>
      </h2>
    </div>
  )
}
