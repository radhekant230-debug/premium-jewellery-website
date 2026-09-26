import { Link } from 'react-router-dom'
import { X, Minus, Plus } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { formatPrice } from '../data/products'
import { useShop } from '../context/ShopContext'
import Reveal from '../components/Reveal'

export default function Cart() {
  const { cartLines, subtotal, updateQty, removeFromCart } = useShop()

  if (cartLines.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Your Selection" title="Shopping Bag" />
        <section className="section container">
          <div className="empty-state">
            <p>Your shopping bag is empty.</p>
            <Link to="/shop" className="btn btn-outline btn-margin-top">
              Discover Jewellery
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader eyebrow="Your Selection" title="Shopping Bag" />

      <section className="section container cart-page">
        <div className="cart-page-lines">
          {cartLines.map((line) => (
            <Reveal key={line.key}>
              <div className="cart-line">
                <Link to={`/product/${line.product.slug}`} className="cart-line-media large">
                  <img src={line.product.image} alt={line.product.name} />
                </Link>
                <div className="cart-line-body">
                  <div className="cart-line-top">
                    <Link to={`/product/${line.product.slug}`}>
                      <span className="cart-line-name">{line.product.name}</span>
                    </Link>
                    <button
                      className="cart-line-remove"
                      aria-label={`Remove ${line.product.name}`}
                      onClick={() => removeFromCart(line.key)}
                    >
                      <X size={16} strokeWidth={1.2} />
                    </button>
                  </div>
                  <span className="cart-line-meta">Zeyura by Anshika</span>
                  {line.size && <span className="cart-line-size">Size {line.size}</span>}
                  <div className="cart-line-bottom">
                    <div className="qty-control">
                      <button aria-label="Decrease quantity" onClick={() => updateQty(line.key, -1)}>
                        <Minus size={13} strokeWidth={1.4} />
                      </button>
                      <span>{line.qty}</span>
                      <button aria-label="Increase quantity" onClick={() => updateQty(line.key, 1)}>
                        <Plus size={13} strokeWidth={1.4} />
                      </button>
                    </div>
                    <span className="cart-line-price">
                      {formatPrice(line.product.price * line.qty)}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <aside className="cart-summary">
            <h2 className="cart-summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="summary-row">
              <span>Gift wrapping</span>
              <span>Complimentary</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button className="btn btn-dark btn-block btn-margin-top">Proceed to Checkout</button>
            <Link to="/shop" className="btn btn-underline btn-block">
              Continue Shopping
            </Link>
            <p className="cart-note">
              This is a frontend demonstration — checkout is not connected to payments.
            </p>
          </aside>
        </Reveal>
      </section>
    </>
  )
}
