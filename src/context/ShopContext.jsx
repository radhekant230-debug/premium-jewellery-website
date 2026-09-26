import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products } from '../data/products'

const ShopContext = createContext(null)

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('zeyura-cart', []))
  const [wishlist, setWishlist] = useState(() => readStorage('zeyura-wishlist', []))
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => localStorage.setItem('zeyura-cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('zeyura-wishlist', JSON.stringify(wishlist)), [wishlist])

  const addToCart = (productId, size = null, qty = 1) => {
    setCart((prev) => {
      const key = `${productId}::${size ?? ''}`
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + qty } : item
        )
      }
      return [...prev, { key, productId, size, qty }]
    })
    setIsCartOpen(true)
  }

  const updateQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    )
  }

  const removeFromCart = (key) => setCart((prev) => prev.filter((item) => item.key !== key))
  const clearCart = () => setCart([])

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const isWishlisted = (productId) => wishlist.includes(productId)

  const cartLines = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.productId)
          return product ? { ...item, product } : null
        })
        .filter(Boolean),
    [cart]
  )

  const cartCount = cartLines.reduce((sum, line) => sum + line.qty, 0)
  const subtotal = cartLines.reduce((sum, line) => sum + line.qty * line.product.price, 0)

  const wishlistProducts = useMemo(
    () => wishlist.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [wishlist]
  )

  const value = {
    cart,
    cartLines,
    cartCount,
    subtotal,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    wishlist,
    wishlistProducts,
    toggleWishlist,
    isWishlisted,
    isCartOpen,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShop = () => useContext(ShopContext)
