import { restaurant } from '../data/restaurantConfig'

const reviews = [
  { name: 'Sarah A.', rating: 5, comment: 'Best burger in town! Highly recommend 👌', time: '2 days ago' },
  { name: 'Mohammed R.', rating: 5, comment: 'Fresh food, fast delivery. Will order again!', time: '1 week ago' },
  { name: 'Fatima Z.', rating: 4, comment: 'Loved the zinger burger. Great taste!', time: '2 weeks ago' },
]

export default function RestaurantInfo() {
  const waUrl = (msg) => `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(msg)}`

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Why Choose Us</span>
          <h2 className="font-display font-bold text-secondary text-2xl md:text-3xl mt-2">
            More Than Just Food
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2 max-w-lg mx-auto">
            Family-owned kitchen serving authentic flavours since 2020.
          </p>
        </div>

        {/* Feature pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12">
          {[
            { icon: '🕒', title: 'Hours',    value: '11AM–11PM', sub: 'All week' },
            { icon: '📍', title: 'Location', value: 'BTM Layout', sub: 'Bangalore' },
            { icon: '🛵', title: 'Delivery', value: '30–40 min',  sub: `Min. ₹${restaurant.minOrderAmount}` },
            { icon: '⭐', title: 'Rating',   value: '4.5 / 5',   sub: '200+ reviews' },
          ].map(f => (
            <div key={f.title}
              className="bg-gray-50 rounded-2xl p-4 md:p-5 text-center hover:bg-orange-50/60 transition-colors">
              <div className="text-2xl md:text-3xl mb-1.5">{f.icon}</div>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold">{f.title}</p>
              <p className="font-bold text-gray-900 text-sm md:text-base mt-0.5">{f.value}</p>
              <p className="text-xs text-gray-400">{f.sub}</p>
            </div>
          ))}
        </div>

        {/* Owner + Reviews */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">

          {/* Owner card */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 md:p-6 border border-orange-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center
                              justify-center text-white font-display font-bold text-xl shrink-0">
                AK
              </div>
              <div>
                <h3 className="font-bold text-secondary text-base md:text-lg">Ariar Rasheed</h3>
                <p className="text-gray-500 text-sm">Founder & Head Chef</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed italic">
              "Every dish tells a story of my grandmother's recipes. We use only fresh,
              halal ingredients and cook with the same love she taught me."
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Online · Responds in 5 min
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-secondary text-base md:text-lg">Reviews</h3>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-gray-900 text-lg">4.8</span>
                <span className="text-yellow-400 text-sm">★★★★★</span>
              </div>
            </div>
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{r.name}</span>
                    <span className="text-xs text-gray-400">{r.time}</span>
                  </div>
                  <div className="text-yellow-400 text-xs mb-1">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                  <p className="text-xs md:text-sm text-gray-600">"{r.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
          {['⚡ Instant Order','🔒 No Login Needed','📱 WhatsApp Ordering','💵 Cash on Delivery','✅ Halal Verified'].map(b => (
            <span key={b} className="text-xs md:text-sm text-gray-500 bg-gray-50 px-3 md:px-4 py-2 rounded-full border border-gray-100">
              {b}
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}