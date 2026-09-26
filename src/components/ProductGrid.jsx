import ProductCard from './ProductCard'

export default function ProductGrid({ products, emptyMessage = 'No pieces match your selection.' }) {
  if (!products.length) {
    return <p className="grid-empty">{emptyMessage}</p>
  }

  return (
    <div className="product-grid">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  )
}
