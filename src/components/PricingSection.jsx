import { restaurant } from '../data/restaurantConfig'

export default function PricingSection() {
  const waUrl = `https://wa.me/91${restaurant.whatsappNumber}?text=${encodeURIComponent(
    'Hi! I want to get a restaurant website from Ariar Technology. Please share details.'
  )}`

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Pricing</span>
          <h2 className="font-display font-bold text-secondary text-2xl md:text-4xl mt-2">
            Simple. Transparent.<br />
            <span className="text-primary">No Surprises.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Zomato cost */}
          <div className="border-2 border-red-100 bg-red-50 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-red-100 text-red-500 text-[10px]
                            font-bold px-2 py-1 rounded-full uppercase tracking-wide">
              What you pay now
            </div>
            <div className="text-3xl mb-3">😤</div>
            <h3 className="font-display font-bold text-red-600 text-xl mb-1">Zomato / Swiggy</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Commission per order</span>
                <span className="font-bold text-red-500">25–30%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Monthly cost</span>
                <span className="font-bold text-red-500">₹25,000–₹45,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Yearly cost</span>
                <span className="font-bold text-red-500">₹3,00,000–₹5,40,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Customer ownership</span>
                <span className="font-bold text-red-500">❌ None</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-red-200">
              <p className="text-red-500 text-xs font-medium">
                ⚠️ This cost never stops. It grows as your business grows.
              </p>
            </div>
          </div>

          {/* Ariar pricing */}
          <div className="border-2 border-primary bg-orange-50 rounded-2xl p-6 relative overflow-hidden shadow-lg shadow-primary/10">
            <div className="absolute top-4 right-4 bg-primary text-white text-[10px]
                            font-bold px-2 py-1 rounded-full uppercase tracking-wide">
              ✅ Best Value
            </div>
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-display font-bold text-secondary text-xl mb-1">Ariar Technology</h3>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Setup fee</span>
                <span className="font-bold text-primary">₹8,000 one time</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Monthly fee</span>
                <span className="font-bold text-green-600">₹0 forever</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Commission per order</span>
                <span className="font-bold text-green-600">₹0 always</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Customer ownership</span>
                <span className="font-bold text-green-600">✅ 100% yours</span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500 text-xs">You save in year 1</p>
                  <p className="font-display font-bold text-green-600 text-xl">₹3,52,000+</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs">ROI in</p>
                  <p className="font-display font-bold text-primary text-xl">6 days</p>
                </div>
              </div>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary
                           hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl
                           text-sm transition-all active:scale-95 shadow-md shadow-primary/20">
                💬 Get My Website — ₹8,000
              </a>
            </div>
          </div>

        </div>

        {/* Optional add-ons */}
        <div className="mt-6 bg-gray-50 rounded-2xl border border-gray-100 p-5 md:p-6">
          <p className="font-bold text-gray-800 text-sm mb-3">Optional Add-ons</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: 'Custom Domain', desc: 'e.g. yourrestaurant.in', price: '₹800/year' },
              { label: 'Menu Updates', desc: 'Add/edit items anytime', price: '₹200/update' },
              { label: 'Monthly Support', desc: 'Priority changes', price: '₹500/month' },
            ].map(item => (
              <div key={item.label}
                className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-800 text-xs">{item.label}</p>
                  <p className="text-gray-400 text-[11px]">{item.desc}</p>
                </div>
                <span className="text-primary font-bold text-xs shrink-0">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}