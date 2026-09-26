import { motion } from 'framer-motion'
import { prefersReducedMotion } from '../lib/motionPref'

export default function PageHeader({ eyebrow, title, text }) {
  return (
    <div className="page-header">
      <motion.div
        className="container"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
        <h1 className="page-title">{title}</h1>
        {text && <p className="page-intro">{text}</p>}
      </motion.div>
    </div>
  )
}
