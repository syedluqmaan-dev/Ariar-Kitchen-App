export default function BenefitsSection() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              Why Ariar Technology
            </span>
            <h2 className="font-display font-bold text-secondary text-2xl md:text-4xl mt-2 mb-4">
              Everything You Need.<br />
              <span className="text-primary">Nothing You Don't.</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base mb-8 max-w-lg">
              We built this specifically for small restaurants, cloud kitchens,
              home chefs, and tiffin services. Simple, fast, and effective.
            </p>

            <div className="space-y-3">
              {[
                { icon: '💰', text: 'Keep 100% of every order — zero commission forever' },
                { icon: '👤', text: 'Own your customers — build direct relationships' },
                { icon: '📱', text: 'Orders come to your WhatsApp — no new app to learn' },
                { icon: '⚡', text: 'Live in 48 hours — we handle everything' },
                { icon: '🎨', text: 'Your brand, your colors, your menu — fully custom' },
                { icon: '🔄', text: 'Free revisions — we update your menu anytime' },
                { icon: '💬', text: 'Direct WhatsApp support — not a call center' },
                { icon: '📊', text: 'QR code included — print and stick on packaging' },
              ].map(item => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-xl flex items-center
                                  justify-center text-base shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-gray-700 text-sm font-medium pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual card */}
          <div className="flex-1 w-full max-w-sm lg:max-w-none">
            <div className="bg-secondary rounded-2xl md:rounded-3xl p-6 md:p-8">
              <p className="text-white/50 text-xs uppercase tracking-wide font-semibold mb-4">
                What you get
              </p>
              <div className="space-y-3">
                {[
                  { icon: '🌐', label: 'Custom ordering website', value: '✅ Included' },
                  { icon: '📱', label: 'WhatsApp integration', value: '✅ Included' },
                  { icon: '🎨', label: 'Brand customization', value: '✅ Included' },
                  { icon: '📋', label: 'Menu setup', value: '✅ Included' },
                  { icon: '📲', label: 'QR code for tables/bags', value: '✅ Included' },
                  { icon: '🔧', label: '1 month free support', value: '✅ Included' },
                  { icon: '🚀', label: 'Vercel hosting (fast)', value: '✅ Free forever' },
                  { icon: '💸', label: 'Commission', value: '🚫 Zero' },
                  { icon: '📅', label: 'Monthly fees', value: '🚫 None' },
                ].map(item => (
                  <div key={item.label}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{item.icon}</span>
                      <span className="text-white/70 text-xs md:text-sm">{item.label}</span>
                    </div>
                    <span className={`text-xs font-bold ${item.value.includes('Zero') || item.value.includes('None')
                      ? 'text-green-400' : 'text-primary'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white/40 text-xs">All of the above for just</p>
                  <p className="text-white font-display font-bold text-2xl">₹8,000 <span className="text-white/40 text-sm font-normal">one time</span></p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-xs line-through">vs ₹30,000/mo</p>
                  <p className="text-green-400 text-xs font-bold">Save ₹3,52,000/yr</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}