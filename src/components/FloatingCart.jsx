import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { restaurant } from '../data/restaurantConfig'

export default function FloatingCart() {
  const { cart, totals, itemCount } = useCart()
  const location = useLocation()

  if (cart.length === 0 || location.pathname === '/cart') return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50 animate-slide-up">
      <Link to="/cart">
        <div className="bg-secondary text-white rounded-2xl shadow-2xl shadow-secondary/30
                        p-4 flex items-center justify-between
                        hover:bg-secondary/90 active:scale-[0.98] transition-all duration-150">

          {/* Left: icon + details */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px]
                               font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            </div>
            <div>
              <p className="text-xs text-white/60 leading-none mb-0.5">Your order</p>
              <p className="font-bold text-sm leading-none">
                {itemCount} item{itemCount > 1 ? 's' : ''} · {restaurant.currency}{totals.total}
              </p>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex items-center gap-1 bg-primary text-white text-sm font-bold
                          px-3 py-2 rounded-xl">
            View Cart
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}