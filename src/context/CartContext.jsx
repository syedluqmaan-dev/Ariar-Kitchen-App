import { createContext, useContext, useState, useEffect, useRef } from 'react'
import {
  getInitialCart, saveCartToStorage, addToCartUtil,
  removeFromCartUtil, increaseQuantityUtil, decreaseQuantityUtil,
  calculateCartTotal, getCartItemCount
} from '../utils/cartUtils'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => getInitialCart())
  const [totals, setTotals] = useState({ subtotal: 0, deliveryFee: 0, total: 0, minOrderMet: false })
  const [itemCount, setItemCount] = useState(0)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      setTotals(calculateCartTotal(cart))
      setItemCount(getCartItemCount(cart))
      return
    }
    saveCartToStorage(cart)
    setTotals(calculateCartTotal(cart))
    setItemCount(getCartItemCount(cart))
  }, [cart])

  // ── Toast is called OUTSIDE setCart to prevent StrictMode double-fire ──
  const addToCart = (item) => {
    setCart(prevCart => addToCartUtil(prevCart, item))
    toast.success(`${item.name} added to cart!`, { icon: '🍽️', duration: 2000 })
  }

  const removeFromCart = (itemId, itemName) => {
    setCart(prevCart => removeFromCartUtil(prevCart, itemId))
    toast.success(`${itemName} removed`, { duration: 1500 })
  }

  const increaseQuantity = (itemId) => {
    setCart(prevCart => increaseQuantityUtil(prevCart, itemId))
  }

  const decreaseQuantity = (itemId) => {
    setCart(prevCart => decreaseQuantityUtil(prevCart, itemId))
  }

  const clearCart = () => {
    setCart([])
    toast.success('Cart cleared')
  }

  return (
    <CartContext.Provider value={{ cart, totals, itemCount, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}