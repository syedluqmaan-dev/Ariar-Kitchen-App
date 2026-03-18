import { useCart } from '../context/CartContext'
import { restaurant } from '../data/restaurantConfig'

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
  const itemTotal = item.price * item.qty

  return (
    <div className="flex items-center gap-3 px-4 py-3.5 md:py-4">
      {/* Veg dot */}
      <div className={`shrink-0 w-4 h-4 rounded-sm border-2 flex items-center justify-center self-start mt-1
        ${item.veg ? 'border-green-600' : 'border-red-500'}`}>
        <div className={`w-2 h-2 rounded-full ${item.veg ? 'bg-green-600' : 'bg-red-500'}`} />
      </div>

      {/* Name + price */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm md:text-base leading-snug truncate">
          {item.name}
        </p>
        <p className="text-gray-500 text-xs md:text-sm mt-0.5">
          {restaurant.currency}{item.price} × {item.qty}
        </p>
      </div>

      {/* Qty controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={() => decreaseQuantity(item.id)}
          className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gray-100 hover:bg-orange-100
                     text-gray-700 hover:text-primary font-bold text-base
                     flex items-center justify-center transition-colors active:scale-90">
          −
        </button>
        <span className="w-6 text-center font-bold text-sm text-gray-900 tabular-nums">
          {item.qty}
        </span>
        <button onClick={() => increaseQuantity(item.id)}
          className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gray-100 hover:bg-orange-100
                     text-gray-700 hover:text-primary font-bold text-base
                     flex items-center justify-center transition-colors active:scale-90">
          +
        </button>
      </div>

      {/* Item total */}
      <div className="shrink-0 text-right min-w-[52px]">
        <p className="font-bold text-sm md:text-base text-gray-900">
          {restaurant.currency}{itemTotal}
        </p>
      </div>

      {/* Remove */}
      <button onClick={() => removeFromCart(item.id, item.name)}
        className="shrink-0 w-7 h-7 rounded-lg hover:bg-red-50 text-gray-400
                   hover:text-red-500 flex items-center justify-center transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}