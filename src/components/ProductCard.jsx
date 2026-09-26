import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Eye, ShoppingBag } from 'lucide-react'
import { formatPrice, categories } from '../data/products'
import { useShop } from '../context/ShopContext'
import { prefersReducedMotion } from '../lib/motionPref'
import QuickView from './QuickView'

export default function ProductCard({ product, index = 0 }) {
  const { isWishlisted, toggleWishlist, addToCart } = useShop()
  const [quickView, setQuickView] = useState(false)
  const wishlisted = isWishlisted(product.id)
  const categoryName = categories.find((c) => c.id === product.category)?.name

  return (
    <>
      <motion.article
        className="product-card"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="product-card-media">
          <Link to={`/product/${product.slug}`} aria-label={product.name}>
            <img src={product.image} alt={product.name} loading="lazy" />
          </Link>

          {product.isNew && <span className="product-badge">New</span>}

          <button
            className={`product-wishlist ${wishlisted ? 'is-active' : ''}`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart size={17} strokeWidth={1.3} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>

          <div className="product-card-actions">
            <button className="product-action" onClick={() => setQuickView(true)}>
              <Eye size={15} strokeWidth={1.3} /> Quick View
            </button>
            <button
              className="product-action product-action-primary"
              onClick={() => addToCart(product.id, product.sizes[0] ?? null)}
            >
              <ShoppingBag size={15} strokeWidth={1.3} /> Add to Bag
            </button>
          </div>
        </div>

        <div className="product-card-body">
          <Link to={`/product/${product.slug}`}>
            <h3 className="product-card-name">{product.name}</h3>
          </Link>
          <span className="product-card-category">{categoryName}</span>
          <span className="product-card-price">{formatPrice(product.price)}</span>
        </div>
      </motion.article>

      {quickView && <QuickView product={product} onClose={() => setQuickView(false)} />}
    </>
  )
}
