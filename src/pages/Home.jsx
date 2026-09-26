import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import CollectionCard from '../components/CollectionCard'
import ProductCard from '../components/ProductCard'
import ProductGrid from '../components/ProductGrid'
import EditorialSection from '../components/EditorialSection'
import LuxuryServices from '../components/LuxuryServices'
import Newsletter from '../components/Newsletter'
import Reveal from '../components/Reveal'
import { collections, products } from '../data/products'

export default function Home() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8)
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4)

  return (
    <>
      <Hero />

      {/* Featured collections */}
      <section className="section container">
        <Reveal>
          <div className="section-heading center">
            <span className="section-eyebrow">Curated Worlds</span>
            <h2 className="section-title">Featured Collections</h2>
            <p className="section-intro">
              Four universes of the Maison, each with its own language of light.
            </p>
          </div>
        </Reveal>
        <div className="collections-grid">
          {collections.map((collection, i) => (
            <CollectionCard key={collection.id} collection={collection} index={i} />
          ))}
        </div>
      </section>

      <EditorialSection
        image="/images/editorial-craft.png"
        alt="A master jeweller setting a diamond in the Maison atelier"
        eyebrow="Savoir-Faire"
        title="Crafted for Generations"
        text="Every Zeyura creation passes through the hands of eleven artisans in our Paris atelier. Stones are chosen one by one, settings raised by hand, surfaces polished over three unhurried days — so that what begins as metal and mineral becomes an heirloom."
        ctaLabel="Explore the Atelier"
        ctaTo="/about"
      />

      {/* Featured products */}
      <section className="section section-alt">
        <div className="container">
          <Reveal>
            <div className="section-heading split">
              <div>
                <span className="section-eyebrow">Signature Pieces</span>
                <h2 className="section-title">Featured Creations</h2>
              </div>
              <Link to="/shop" className="link-underline heading-link">
                View All Jewellery
              </Link>
            </div>
          </Reveal>
          <ProductGrid products={featured} />
        </div>
      </section>

      <EditorialSection
        image="/images/editorial-muse.png"
        alt="Model wearing a diamond pendant and gold drop earring"
        eyebrow="The New Season"
        title="A Legacy of Light"
        text="Jewellery is memory made visible. Our new season pieces are designed to be layered, worn and lived in — quiet companions to the moments you will retell for years."
        ctaLabel="Shop New Arrivals"
        ctaTo="/shop?new=1"
        align="right"
      />

      {/* New arrivals strip — horizontal on mobile */}
      <section className="section container">
        <Reveal>
          <div className="section-heading split">
            <div>
              <span className="section-eyebrow">Just Arrived</span>
              <h2 className="section-title">New Arrivals</h2>
            </div>
            <Link to="/shop?new=1" className="link-underline heading-link">
              See All New Pieces
            </Link>
          </div>
        </Reveal>
        <div className="product-grid">
          {newArrivals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <LuxuryServices />
      <Newsletter />
    </>
  )
}
