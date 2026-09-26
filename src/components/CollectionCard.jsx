import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { prefersReducedMotion } from '../lib/motionPref'

export default function CollectionCard({ collection, index = 0 }) {
  return (
    <motion.div
      className="collection-card"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/shop?collection=${collection.id}`} className="collection-card-media">
        <img src={collection.image} alt={collection.name} loading="lazy" />
        <span className="collection-card-cta">Explore</span>
      </Link>
      <div className="collection-card-body">
        <span className="collection-card-tagline">{collection.tagline}</span>
        <h3 className="collection-card-name">{collection.name}</h3>
        <p className="collection-card-desc">{collection.description}</p>
        <Link to={`/shop?collection=${collection.id}`} className="link-underline">
          Discover the collection
        </Link>
      </div>
    </motion.div>
  )
}
