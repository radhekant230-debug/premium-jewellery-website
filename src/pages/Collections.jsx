import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Newsletter from '../components/Newsletter'
import { collections } from '../data/products'

export default function Collections() {
  return (
    <>
      <PageHeader
        eyebrow="Curated Worlds"
        title="Collections"
        text="Four universes, one language of light. Each collection gathers the creations of the Maison around a singular idea of beauty."
      />

      <section className="section container collections-page">
        {collections.map((collection, i) => (
          <Reveal key={collection.id}>
            <article className={`collection-row ${i % 2 === 1 ? 'is-reversed' : ''}`}>
              <Link
                to={`/shop?collection=${collection.id}`}
                className="collection-row-media"
                aria-label={`Explore ${collection.name}`}
              >
                <img src={collection.image} alt={collection.name} loading="lazy" />
              </Link>
              <div className="collection-row-body">
                <span className="collection-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="section-eyebrow">{collection.tagline}</span>
                <h2 className="collection-row-name">{collection.name}</h2>
                <p>{collection.description}</p>
                <Link to={`/shop?collection=${collection.id}`} className="btn btn-outline btn-margin-top">
                  Explore the Collection
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <Newsletter />
    </>
  )
}
