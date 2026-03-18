import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getCategories, getItemsByCategory, menu } from '../data/menuData'
import { restaurant } from '../data/restaurantConfig'
import CategorySection from '../components/CategorySection'
import { useCart } from '../context/CartContext'

export default function Menu() {
  const categories = getCategories()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { itemCount, totals } = useCart()

  const filteredItems = useMemo(() => {
    let items = activeCategory === 'All' ? menu : getItemsByCategory(activeCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
      )
    }
    return items
  }, [activeCategory, searchQuery])

  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    }, {})
  }, [filteredItems])

  const visibleCategories = Object.keys(groupedItems)

  return (
    <div className="max-w-2xl mx-auto md:max-w-3xl bg-white min-h-screen pb-28 md:pb-16">

      {/* ── Restaurant info strip ─────────────────── */}
      <div className="px-4 py-3 md:py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl flex items-center
                          justify-center text-xl md:text-2xl shrink-0">
            🍽️
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-bold text-gray-900 text-base md:text-lg leading-tight">
              {restaurant.name}
            </h1>
            <p className="text-gray-500 text-xs md:text-sm">
              Burgers · Pizza · Starters · Drinks
            </p>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">
                ★ 4.5
              </span>
              <span className="text-xs text-gray-500">30–40 mins</span>
              <span className="text-xs text-green-600 font-medium">Free delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search ───────────────────────────────── */}
      <div className="px-4 py-2.5 md:py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5 md:py-3">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search within menu..."
            className="bg-transparent flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}
              className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none w-5 text-center">
              ×
            </button>
          )}
        </div>
      </div>

      {/* ── Category pills ───────────────────────── */}
      <div className="sticky top-[105px] md:top-[112px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex gap-2 overflow-x-auto px-4 py-2.5 md:py-3 scrollbar-hide">
          {['All', ...categories].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 text-xs md:text-sm px-3 md:px-4 py-1.5 rounded-full border font-semibold
                          transition-all duration-150 whitespace-nowrap
                ${activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20'
                  : 'border-gray-200 text-gray-600 bg-white hover:border-primary/50 hover:text-primary'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Menu items ───────────────────────────── */}
      <div className="bg-white">
        {visibleCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <span className="text-5xl mb-4">🔍</span>
            <p className="font-bold text-gray-800 text-lg">No items found</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search</p>
            <button onClick={() => setSearchQuery('')}
              className="mt-4 text-primary font-semibold text-sm underline underline-offset-2">
              Clear search
            </button>
          </div>
        ) : (
          visibleCategories.map(category => (
            <CategorySection key={category} category={category} items={groupedItems[category]} />
          ))
        )}
      </div>

      {/* ── Floating cart bar ────────────────────── */}
      {itemCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-sm md:hidden">
          <Link to="/cart"
            className="flex items-center bg-secondary text-white rounded-2xl shadow-2xl
                       shadow-secondary/30 px-4 py-3.5 gap-3 active:scale-[0.98] transition-transform">
            <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-lg tabular-nums">
              {itemCount} item{itemCount > 1 ? 's' : ''}
            </span>
            <span className="font-semibold text-sm flex-1">View Cart</span>
            <span className="font-bold text-sm">₹{totals.total} →</span>
          </Link>
        </div>
      )}
    </div>
  )
}