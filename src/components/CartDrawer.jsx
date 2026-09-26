import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'
import { useShop } from '../context/ShopContext'

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartLines, subtotal, updateQty, removeFromCart } = useShop()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.aside
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Shopping bag"
          >
            <div className="cart-drawer-header">
              <h3>Shopping Bag {cartLines.length > 0 && `(${cartLines.length})`}</h3>
              <button
                className="icon-btn"
                aria-label="Close bag"
                onClick={() => setIsCartOpen(false)}
              >
                <X size={20} strokeWidth={1.2} />
              </button>
            </div>

            {cartLines.length === 0 ? (
              <div className="cart-drawer-empty">
                <p>Your bag is empty.</p>
                <Link to="/shop" className="btn btn-outline" onClick={() => setIsCartOpen(false)}>
                  Discover Jewellery
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-drawer-lines">
                  {cartLines.map((line) => (
                    <div className="cart-line" key={line.key}>
                      <Link
                        to={`/product/${line.product.slug}`}
                        className="cart-line-media"
                        onClick={() => setIsCartOpen(false)}
                      >
                        <img src={line.product.image} alt={line.product.name} />
                      </Link>
                      <div className="cart-line-body">
                        <div className="cart-line-top">
                          <Link
                            to={`/product/${line.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                          >
                            <span className="cart-line-name">{line.product.name}</span>
                          </Link>
                          <button
                            className="cart-line-remove"
                            aria-label={`Remove ${line.product.name}`}
                            onClick={() => removeFromCart(line.key)}
                          >
                            <X size={15} strokeWidth={1.2} />
                          </button>
                        </div>
                        {line.size && <span className="cart-line-size">Size {line.size}</span>}
                        <div className="cart-line-bottom">
                          <div className="qty-control">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => updateQty(line.key, -1)}
                            >
                              <Minus size={13} strokeWidth={1.4} />
                            </button>
                            <span>{line.qty}</span>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => updateQty(line.key, 1)}
                            >
                              <Plus size={13} strokeWidth={1.4} />
                            </button>
                          </div>
                          <span className="cart-line-price">
                            {formatPrice(line.product.price * line.qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-drawer-footer">
                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <p className="cart-note">Complimentary shipping &amp; gift wrapping included.</p>
                  <button className="btn btn-dark btn-block">Proceed to Checkout</button>
                  <Link
                    to="/cart"
                    className="btn btn-underline btn-block"
                    onClick={() => setIsCartOpen(false)}
                  >
                    View Shopping Bag
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
