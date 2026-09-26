import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <section className="section container not-found">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-eyebrow">404</span>
        <h1 className="page-title">This page has wandered off</h1>
        <p className="page-intro">
          The piece you are looking for is no longer here. Let us guide you back to the Maison.
        </p>
        <Link to="/" className="btn btn-dark btn-margin-top">
          Return Home
        </Link>
      </motion.div>
    </section>
  )
}
