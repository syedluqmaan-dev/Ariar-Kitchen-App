import FoodCard from './FoodCard'

export default function CategorySection({ category, items }) {
  return (
    <div className="mb-1">
      {/* Section header */}
      <div className="px-4 pt-5 pb-2 md:pt-6 md:pb-3 bg-white">
        <h2 className="font-display font-bold text-gray-900 text-base md:text-lg">
          {category}
          <span className="text-gray-400 font-sans font-normal text-xs md:text-sm ml-2">
            ({items.length})
          </span>
        </h2>
        <div className="h-px bg-gray-100 mt-2" />
      </div>

      {items.map(item => <FoodCard key={item.id} item={item} />)}
    </div>
  )
}