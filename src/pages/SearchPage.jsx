import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductGrid from '../components/ProductGrid'
import { products, categories } from '../data/products'

export default function SearchPage() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').trim()

  const results = useMemo(() => {
    const term = q.toLowerCase()
    if (!term) return []
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.shortDescription.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.includes(term) ||
        p.collection.includes(term) ||
        p.metal.toLowerCase().includes(term) ||
        p.stone.toLowerCase().includes(term)
    )
  }, [q])

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={q ? `“${q}”` : 'Search the Maison'}
        text={
          q
            ? `${results.length} ${results.length === 1 ? 'piece' : 'pieces'} found`
            : 'Enter a search to explore our creations.'
        }
      />

      <section className="section container">
        {q && results.length === 0 ? (
          <div className="empty-state">
            <p>
              Nothing matched your search. Browse by category:{' '}
              {categories.map((c, i) => (
                <span key={c.id}>
                  <Link className="link-underline" to={`/shop?category=${c.id}`}>
                    {c.name}
                  </Link>
                  {i < categories.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>
        ) : (
          <ProductGrid products={results} emptyMessage="Enter a search to explore our creations." />
        )}
      </section>
    </>
  )
}
