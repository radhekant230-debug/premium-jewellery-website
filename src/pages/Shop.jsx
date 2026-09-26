import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductGrid from '../components/ProductGrid'
import { products, categories, collections } from '../data/products'

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price — Low to High' },
  { id: 'price-desc', label: 'Price — High to Low' },
  { id: 'name', label: 'A — Z' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category')
  const collection = params.get('collection')
  const isNew = params.get('new') === '1'
  const sort = params.get('sort') || 'featured'

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (category) list = list.filter((p) => p.category === category)
    if (collection) list = list.filter((p) => p.collection === collection)
    if (isNew) list = list.filter((p) => p.isNew)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [category, collection, isNew, sort])

  const activeCollection = collections.find((c) => c.id === collection)
  const activeCategory = categories.find((c) => c.id === category)

  const title = isNew
    ? 'New Arrivals'
    : activeCollection
      ? activeCollection.name
      : activeCategory
        ? activeCategory.name
        : 'All Jewellery'

  return (
    <>
      <PageHeader
        eyebrow={activeCollection ? activeCollection.tagline : 'The Collection'}
        title={title}
        text={
          activeCollection
            ? activeCollection.description
            : 'Every creation of the Maison, composed in our Paris atelier.'
        }
      />

      <section className="section container shop-section">
        <div className="shop-toolbar">
          <div className="filter-chips">
            <button
              className={`filter-chip ${!category && !collection && !isNew ? 'is-active' : ''}`}
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                className={`filter-chip ${category === c.id ? 'is-active' : ''}`}
                onClick={() => setParam('category', category === c.id ? null : c.id)}
              >
                {c.name}
              </button>
            ))}
            <button
              className={`filter-chip ${isNew ? 'is-active' : ''}`}
              onClick={() => setParam('new', isNew ? null : '1')}
            >
              New Arrivals
            </button>
          </div>

          <div className="shop-toolbar-right">
            <span className="result-count">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </span>
            <label className="sort-select">
              <span className="visually-hidden">Sort by</span>
              <select value={sort} onChange={(e) => setParam('sort', e.target.value)}>
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <ProductGrid products={filtered} />
      </section>
    </>
  )
}
