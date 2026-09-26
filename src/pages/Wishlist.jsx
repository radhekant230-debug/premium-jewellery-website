import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ProductGrid from '../components/ProductGrid'
import { useShop } from '../context/ShopContext'

export default function Wishlist() {
  const { wishlistProducts } = useShop()

  return (
    <>
      <PageHeader
        eyebrow="Your Selection"
        title="Wishlist"
        text="The pieces you have set aside. They will be waiting for you."
      />

      <section className="section container">
        {wishlistProducts.length === 0 ? (
          <div className="empty-state">
            <p>Your wishlist is empty. Begin by exploring the creations of the Maison.</p>
            <Link to="/shop" className="btn btn-outline btn-margin-top">
              Discover Jewellery
            </Link>
          </div>
        ) : (
          <ProductGrid products={wishlistProducts} />
        )}
      </section>
    </>
  )
}
