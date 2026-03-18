export default function TrustSection() {
  return (
    <section className="bg-gray-50 py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { value: '10+',    label: 'Restaurants Onboarded', icon: '🍽️' },
            { value: '500+',   label: 'Orders Processed',      icon: '📦' },
            { value: '48hrs',  label: 'Average Setup Time',    icon: '⚡' },
            { value: '₹0',     label: 'Commission Ever',       icon: '💰' },
          ].map(stat => (
            <div key={stat.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm
                         p-4 md:p-6 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-display font-bold text-secondary text-2xl md:text-3xl">
                {stat.value}
              </div>
              <p className="text-gray-500 text-xs md:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            What Restaurant Owners Say
          </span>
          <h2 className="font-display font-bold text-secondary text-2xl md:text-3xl mt-2">
            Real Results. Real Owners.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Ahmed Khan',
              restaurant: 'Ahmed\'s Cloud Kitchen, Bangalore',
              avatar: '👨‍🍳',
              text: 'Pehle Zomato ko ₹25,000 deta tha har mahine. Ab mere customers seedha WhatsApp pe order karte hain. Best decision of my life.',
              stars: 5,
            },
            {
              name: 'Fatima Shaikh',
              restaurant: 'Home Chef, BTM Layout',
              avatar: '👩‍🍳',
              text: 'I was taking orders manually on WhatsApp before. Now my website does everything automatically. My customers love it and I save so much time!',
              stars: 5,
            },
            {
              name: 'Ravi Kumar',
              restaurant: 'Ravi\'s Tiffin Service, HSR Layout',
              avatar: '🧑‍🍳',
              text: 'Setup hua sirf 2 din mein. QR code print karke apne tiffin boxes pe lagaya. Ab log seedha order karte hain. Ekdum simple!',
              stars: 5,
            },
          ].map(item => (
            <div key={item.name}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
              <div className="flex gap-0.5 mb-3">
                {Array(item.stars).fill(0).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">"{item.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                <div className="w-9 h-9 bg-orange-50 rounded-full flex items-center
                                justify-center text-xl shrink-0">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.restaurant}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}