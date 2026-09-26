import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

const links = [
  { label: 'New Arrivals', to: '/shop?new=1' },
  { label: 'Jewellery', to: '/shop' },
  { label: 'Rings', to: '/shop?category=rings' },
  { label: 'Necklaces', to: '/shop?category=necklaces' },
  { label: 'Earrings', to: '/shop?category=earrings' },
  { label: 'Bracelets', to: '/shop?category=bracelets' },
  { label: 'Collections', to: '/collections' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="mobile-menu-top">
            <span className="brand-name">ZEYURA</span>
            <button className="icon-btn" aria-label="Close menu" onClick={onClose}>
              <X size={22} strokeWidth={1.2} />
            </button>
          </div>
          <nav className="mobile-menu-nav">
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.05 }}
              >
                <Link to={link.to} className="mobile-menu-link" onClick={onClose}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <Link to="/wishlist" onClick={onClose}>
              Wishlist
            </Link>
            <Link to="/cart" onClick={onClose}>
              Shopping Bag
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
