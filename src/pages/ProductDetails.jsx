import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Minus, Plus, ChevronDown, Check } from 'lucide-react'
import { getProductBySlug, getCollectionById, products, formatPrice, categories } from '../data/products'
import { useShop } from '../context/ShopContext'
import { prefersReducedMotion } from '../lib/motionPref'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import NotFound from './NotFound'

const views = [
  { label: 'Full view', position: 'center center' },
  { label: 'Upper detail', position: 'center 22%' },
  { label: 'Lower detail', position: 'center 78%' },
]

const accordionItems = (product) => [
  {
    title: 'Product Details',
    body: (
      <dl className="spec-list">
        <div>
          <dt>Reference</dt>
          <dd>MA-{String(product.id).padStart(4, '0')}</dd>
        </div>
        <div>
          <dt>Collection</dt>
          <dd>{getCollectionById(product.collection)?.name}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{categories.find((c) => c.id === product.category)?.name}</dd>
        </div>
        <div>
          <dt>Stone</dt>
          <dd>{product.stone}</dd>
        </div>
      </dl>
    ),
  },
  {
    title: 'Materials & Craftsmanship',
    body: (
      <p>
        Set in {product.material.toLowerCase()} and finished entirely by hand in the Zeyura
        atelier in Paris. Each piece is struck with the house hallmark and accompanied
        by its certificate of authenticity. Our gold is responsibly sourced and our diamonds
        certified under the Kimberley Process.
      </p>
    ),
  },
  {
    title: 'Shipping',
    body: (
      <p>
        Complimentary insured express delivery worldwide, dispatched within 1–3 business days
        in our signature ivory and gold presentation box. Every order requires a signature on
        receipt. Pieces with size adjustments may require up to five additional days.
      </p>
    ),
  },
  {
    title: 'Returns & Exchanges',
    body: (
      <p>
        Returns are accepted within 30 days of delivery in unworn condition with all
        certificates and packaging. Engraved or resized pieces are made to order and are
        final sale. Our client advisors are pleased to assist with exchanges at any time.
      </p>
    ),
  },
  {
    title: 'Care Instructions',
    body: (
      <p>
        Store your creation separately in its Maison pouch. Avoid contact with perfume,
        cosmetics and chlorine. Clean gently with a soft dry cloth. Complimentary professional
        cleaning and polishing is offered for the lifetime of every Zeyura piece — simply
        present it at any boutique or request a care appointment.
      </p>
    ),
  },
]

export default function ProductDetails() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const { addToCart, isWishlisted, toggleWishlist } = useShop()
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [view, setView] = useState(0)
  const [openItem, setOpenItem] = useState(0)
  const [added, setAdded] = useState(false)
  const [zoomPos, setZoomPos] = useState(null)
  const imageRef = useRef(null)

  useEffect(() => {
    setSize(product?.sizes[0] ?? null)
    setQty(1)
    setView(0)
    setOpenItem(0)
    setAdded(false)
  }, [slug, product])

  if (!product) return <NotFound />

  const wishlisted = isWishlisted(product.id)
  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.collection === product.collection || p.category === product.category)
    )
    .slice(0, 4)

  const handleAdd = () => {
    addToCart(product.id, size, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const onMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  return (
    <>
      <section className="pdp container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/shop">Jewellery</Link>{' '}
          <span>/</span>
          <Link to={`/shop?category=${product.category}`}>
            {categories.find((c) => c.id === product.category)?.name}
          </Link>{' '}
          <span>/</span> <em>{product.name}</em>
        </nav>

        <div className="pdp-layout">
          <div className="pdp-gallery">
            <div
              className={`pdp-main-image ${zoomPos ? 'is-zoomed' : ''}`}
              ref={imageRef}
              onMouseMove={onMouseMove}
              onMouseLeave={() => setZoomPos(null)}
            >
              <img
                key={view}
                src={product.image}
                alt={`${product.name} — ${views[view].label}`}
                style={{ objectPosition: views[view].position }}
                className="pdp-img"
              />
              {zoomPos && (
                <div
                  className="pdp-zoom-lens"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  }}
                />
              )}
            </div>
            <div className="pdp-thumbs">
              {views.map((v, i) => (
                <button
                  key={v.label}
                  className={`pdp-thumb ${view === i ? 'is-active' : ''}`}
                  onClick={() => setView(i)}
                  aria-label={v.label}
                >
                  <img src={product.image} alt="" style={{ objectPosition: v.position }} />
                </button>
              ))}
            </div>
          </div>

          <motion.div
            className="pdp-info"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-eyebrow">{getCollectionById(product.collection)?.name}</span>
            <h1 className="pdp-name">{product.name}</h1>
            <p className="pdp-price">{formatPrice(product.price)}</p>
            <p className="pdp-desc">{product.description}</p>

            <dl className="pdp-specs">
              <div>
                <dt>Material</dt>
                <dd>{product.material}</dd>
              </div>
              <div>
                <dt>Metal</dt>
                <dd>{product.metal}</dd>
              </div>
              <div>
                <dt>Stone</dt>
                <dd>{product.stone}</dd>
              </div>
            </dl>

            {product.sizes.length > 0 && (
              <div className="size-selector">
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

            <div className="qty-selector">
              <span className="size-selector-label">Quantity</span>
              <div className="qty-control large">
                <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus size={15} strokeWidth={1.3} />
                </button>
                <span>{qty}</span>
                <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(9, q + 1))}>
                  <Plus size={15} strokeWidth={1.3} />
                </button>
              </div>
            </div>

            <div className="pdp-actions">
              <button className="btn btn-dark btn-block" onClick={handleAdd}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={added ? 'added' : 'add'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="btn-label"
                  >
                    {added ? (
                      <>
                        <Check size={16} strokeWidth={1.4} /> Added to Bag
                      </>
                    ) : (
                      'Add to Bag'
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
              <button
                className={`btn-icon-square ${wishlisted ? 'is-active' : ''}`}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={19} strokeWidth={1.3} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="pdp-service-note">
              Complimentary shipping, gift wrapping &amp; lifetime care included.
            </p>

            <div className="pdp-accordion">
              {accordionItems(product).map((item, i) => (
                <div className={`accordion-item ${openItem === i ? 'is-open' : ''}`} key={item.title}>
                  <button
                    className="accordion-head"
                    onClick={() => setOpenItem(openItem === i ? -1 : i)}
                    aria-expanded={openItem === i}
                  >
                    <span>{item.title}</span>
                    <ChevronDown size={17} strokeWidth={1.2} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openItem === i && (
                      <motion.div
                        className="accordion-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="accordion-inner">{item.body}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <Reveal>
              <div className="section-heading center">
                <span className="section-eyebrow">You May Also Admire</span>
                <h2 className="section-title">Complementary Creations</h2>
              </div>
            </Reveal>
            <div className="product-grid">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
