import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useShop } from '../context/ShopContext'

export default function QuickView({ product, onClose }) {
  const { addToCart, isWishlisted, toggleWishlist } = useShop()
  const [size, setSize] = useState(product.sizes[0] ?? null)
  const wishlisted = isWishlisted(product.id)

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      >
        <motion.div
          className="quick-view"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label={`Quick view — ${product.name}`}
        >
          <button className="modal-close" aria-label="Close quick view" onClick={onClose}>
            <X size={20} strokeWidth={1.2} />
          </button>

          <div className="quick-view-media">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="quick-view-body">
            <span className="product-card-category">Zeyura by Anshika</span>
            <h3>{product.name}</h3>
            <p className="quick-view-price">{formatPrice(product.price)}</p>
            <p className="quick-view-desc">{product.shortDescription}</p>

            {product.sizes.length > 0 && (
              <div className="size-selector compact">
                <span className="size-selector-label">{product.sizeLabel}</span>
                <div className="size-options">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`size-option ${size === s ? 'is-active' : ''}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="quick-view-actions">
              <button
                className="btn btn-dark btn-block"
                onClick={() => {
                  addToCart(product.id, size)
                  onClose()
                }}
              >
                Add to Bag
              </button>
              <button
                className={`btn-icon-square ${wishlisted ? 'is-active' : ''}`}
                aria-label="Toggle wishlist"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={18} strokeWidth={1.3} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <Link to={`/product/${product.slug}`} className="link-underline" onClick={onClose}>
              View full details
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
