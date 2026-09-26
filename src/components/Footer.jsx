import { Link } from 'react-router-dom'
import { Instagram, Facebook } from 'lucide-react'

const columns = [
  {
    title: 'Customer Care',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Shipping', to: '/contact' },
      { label: 'Returns', to: '/contact' },
      { label: 'Jewellery Care', to: '/contact' },
      { label: 'FAQ', to: '/contact' },
    ],
  },
  {
    title: 'The Maison',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Craftsmanship', to: '/about' },
      { label: 'Collections', to: '/collections' },
      { label: 'Careers', to: '/about' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/about' },
      { label: 'Terms', to: '/about' },
      { label: 'Cookie Policy', to: '/about' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-name">ZEYURA</span>
            <span className="brand-sub">BY ANSHIKA</span>
            <p className="footer-brand-text">
              Fine jewellery composed in our Paris atelier since 1987. Crafted for
              generations, worn for a lifetime.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <Instagram size={18} strokeWidth={1.2} />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook size={18} strokeWidth={1.2} />
              </a>
              <a href="#" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 21c1-3 1.5-5.5 2-8m0 0c-.5-2.5.5-5 3-5s3.5 2 3 4.5c-.4 2-1.7 3.5-3.2 3.5-1 0-1.8-.6-2-1.5" />
                </svg>
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Zeyura by Anshika. All rights reserved.</span>
          <span className="footer-bottom-note">
            An original fictional brand created for demonstration purposes.
          </span>
        </div>
      </div>
    </footer>
  )
}
