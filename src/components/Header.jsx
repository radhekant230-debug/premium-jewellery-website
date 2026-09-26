import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import MobileMenu from './MobileMenu'

const navItems = [
  { label: 'New Arrivals', to: '/shop?new=1' },
  { label: 'Jewellery', to: '/shop' },
  { label: 'Rings', to: '/shop?category=rings' },
  { label: 'Necklaces', to: '/shop?category=necklaces' },
  { label: 'Earrings', to: '/shop?category=earrings' },
  { label: 'Bracelets', to: '/shop?category=bracelets' },
  { label: 'Collections', to: '/collections' },
  { label: 'About', to: '/about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount, wishlist, setIsSearchOpen, setIsCartOpen } = useShop()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  useEffect(() => {
    document.body.classList.toggle('nav-locked', menuOpen)
    return () => document.body.classList.remove('nav-locked')
  }, [menuOpen])

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="announcement-bar">
          <span>Complimentary shipping &amp; signature gift wrapping on every order</span>
        </div>

        <div className="header-main container">
          <div className="header-side header-left">
            <button
              className="icon-btn mobile-only"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} strokeWidth={1.2} />
            </button>
            <button
              className="icon-btn desktop-only"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={19} strokeWidth={1.2} />
            </button>
            <Link to="/account" className="icon-btn desktop-only" aria-label="Account">
              <User size={19} strokeWidth={1.2} />
            </Link>
          </div>

          <Link to="/" className="brand-logo" aria-label="Zeyura by Anshika home">
            <span className="brand-name">ZEYURA</span>
            <span className="brand-sub">BY ANSHIKA</span>
          </Link>

          <div className="header-side header-right">
            <button
              className="icon-btn mobile-only"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={19} strokeWidth={1.2} />
            </button>
            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              <Heart size={19} strokeWidth={1.2} />
              {wishlist.length > 0 && <span className="icon-count">{wishlist.length}</span>}
            </Link>
            <button
              className="icon-btn"
              aria-label="Shopping bag"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={19} strokeWidth={1.2} />
              {cartCount > 0 && <span className="icon-count">{cartCount}</span>}
            </button>
          </div>
        </div>

        <nav className="main-nav desktop-only">
          {navItems.map((item) => {
            const isActive =
              location.pathname + location.search === item.to ||
              (item.to !== '/shop' && location.pathname === item.to)
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`nav-link ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
