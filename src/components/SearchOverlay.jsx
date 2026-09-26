import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Search, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { products, formatPrice, categories } from '../data/products'
import { useShop } from '../context/ShopContext'

const popularSearches = ['Diamond ring', 'Pearl earrings', 'Tennis bracelet', 'Solitaire', 'Gold cuff']

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen } = useShop()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isSearchOpen) setQuery('')
    document.body.classList.toggle('nav-locked', isSearchOpen)
    return () => document.body.classList.remove('nav-locked')
  }, [isSearchOpen])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setIsSearchOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setIsSearchOpen])

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          p.collection.includes(q) ||
          p.stone.toLowerCase().includes(q) ||
          p.metal.toLowerCase().includes(q)
      )
      .slice(0, 5)
  }, [query])

  const submit = (term) => {
    const q = (term ?? query).trim()
    if (!q) return
    setIsSearchOpen(false)
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="search-overlay-inner"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="modal-close search-close"
              aria-label="Close search"
              onClick={() => setIsSearchOpen(false)}
            >
              <X size={22} strokeWidth={1.2} />
            </button>

            <span className="section-eyebrow">Search Zeyura</span>

            <form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
            >
              <Search size={22} strokeWidth={1.1} className="search-form-icon" />
              <input
                type="text"
                autoFocus
                placeholder="What are you looking for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search products"
              />
              <button type="submit" className="search-form-submit" aria-label="Submit search">
                <ArrowRight size={22} strokeWidth={1.1} />
              </button>
            </form>

            {suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.slug}`}
                    className="search-suggestion"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <img src={p.image} alt={p.name} />
                    <span className="search-suggestion-name">{p.name}</span>
                    <span className="search-suggestion-price">{formatPrice(p.price)}</span>
                  </Link>
                ))}
              </div>
            )}

            {query.trim() && suggestions.length === 0 && (
              <p className="search-empty">
                No pieces found for “{query}”.{' '}
                <button className="link-underline" onClick={() => submit()}>
                  See all results
                </button>
              </p>
            )}

            {!query.trim() && (
              <div className="search-browse">
                <div className="search-col">
                  <h4>Popular searches</h4>
                  <div className="search-chips">
                    {popularSearches.map((term) => (
                      <button key={term} className="search-chip" onClick={() => submit(term)}>
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="search-col">
                  <h4>Categories</h4>
                  <div className="search-chips">
                    {categories.map((c) => (
                      <Link
                        key={c.id}
                        to={`/shop?category=${c.id}`}
                        className="search-chip"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
