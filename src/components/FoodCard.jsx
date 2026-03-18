import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function FoodCard({ item }) {
  const { addToCart, increaseQuantity, decreaseQuantity, cart } = useCart()
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const cartItem = cart.find(i => i.id === item.id)
  const inCart = !!cartItem
  const qty = cartItem?.qty ?? 0

  const handleAdd = () => {
    addToCart(item)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 700)
  }

  const desc = item.description
  const truncated = desc.length > 85 ? desc.slice(0, 85).trim() + '...' : desc

  return (
    <div className="flex items-start gap-3 px-4 py-4 md:py-5 border-b border-gray-100
                    hover:bg-orange-50/30 transition-colors duration-150 last:border-b-0">

      {/* LEFT: text */}
      <div className="flex-1 min-w-0 pt-0.5">
        {/* Veg / non-veg dot */}
        <div className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 mb-2
          ${item.veg ? 'border-green-600' : 'border-red-500'}`}>
          <div className={`w-2 h-2 rounded-full ${item.veg ? 'bg-green-600' : 'bg-red-500'}`} />
        </div>

        <h3 className="font-semibold text-gray-900 text-sm md:text-[15px] leading-snug mb-1">
          {item.name}
        </h3>

        <p className="font-bold text-gray-800 text-sm md:text-[15px] mb-1.5">
          ₹{item.price}
        </p>

        {item.popular && (
          <span className="inline-flex items-center gap-0.5 text-[10px] md:text-[11px]
                           bg-amber-50 text-amber-600 border border-amber-200
                           px-2 py-0.5 rounded-full font-semibold mb-2">
            ⭐ Bestseller
          </span>
        )}

        <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
          {showFullDesc ? desc : truncated}
          {desc.length > 85 && (
            <button onClick={() => setShowFullDesc(p => !p)}
              className="text-gray-700 font-semibold ml-1 hover:text-primary transition-colors">
              {showFullDesc ? 'less' : 'more'}
            </button>
          )}
        </p>
      </div>

      {/* RIGHT: image + add button */}
      <div className="relative shrink-0 pb-4">
        {/* Image */}
        <div className="w-24 h-20 md:w-28 md:h-24 rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={e => {
              e.target.style.display = 'none'
              e.target.parentNode.innerHTML =
                `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;background:#fef3ec">🍽️</div>`
            }}
          />
        </div>

        {/* ADD / qty control */}
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2">
          {!inCart ? (
            <button onClick={handleAdd}
              className={`h-8 w-[72px] md:h-9 md:w-20 rounded-xl border-2 font-bold text-xs md:text-sm
                          shadow-md transition-all duration-200 flex items-center justify-center
                          ${justAdded
                            ? 'bg-green-500 border-green-500 text-white scale-95'
                            : 'bg-white border-primary text-primary hover:bg-primary hover:text-white active:scale-95'}`}>
              {justAdded ? '✓' : '+ ADD'}
            </button>
          ) : (
            <div className="flex items-center h-8 w-[76px] md:h-9 md:w-[84px]
                            bg-white border-2 border-primary rounded-xl shadow-md overflow-hidden">
              <button onClick={() => decreaseQuantity(item.id)}
                className="flex-1 h-full text-primary font-bold text-lg hover:bg-orange-50 active:bg-orange-100 transition-colors">
                −
              </button>
              <span className="text-primary font-bold text-sm w-5 text-center tabular-nums select-none">
                {qty}
              </span>
              <button onClick={() => increaseQuantity(item.id)}
                className="flex-1 h-full text-primary font-bold text-lg hover:bg-orange-50 active:bg-orange-100 transition-colors">
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}