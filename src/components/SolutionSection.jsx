export default function SolutionSection() {
  return (
    <section className="bg-gray-50 py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            The Solution
          </span>
          <h2 className="font-display font-bold text-secondary text-2xl md:text-4xl mt-2">
            Your Own Ordering Website.<br />
            <span className="text-primary">Orders Straight to Your WhatsApp.</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Ariar Technology builds you a beautiful, fast ordering website.
            Your customers order directly. You keep 100% of every rupee.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            {
              step: '01',
              icon: '🌐',
              title: 'Your Own Website',
              desc: 'A beautiful, mobile-friendly ordering website with your menu, your brand colors, and your name. Live in 48 hours.',
            },
            {
              step: '02',
              icon: '📱',
              title: 'Orders on WhatsApp',
              desc: 'Every order lands directly on your WhatsApp — with customer name, address, items, and total. No app needed.',
            },
            {
              step: '03',
              icon: '💰',
              title: 'Zero Commission',
              desc: 'You pay ₹8,000 once. That\'s it. No monthly fees, no per-order cuts, no hidden charges. Ever.',
            },
          ].map(item => (
            <div key={item.step}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6
                         hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-bold text-primary/60 font-display">{item.step}</span>
              </div>
              <h3 className="font-display font-bold text-secondary text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
            <div className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wide">Feature</div>
            <div className="p-4 text-center">
              <span className="text-xs font-bold text-red-500 uppercase tracking-wide">
                😤 Zomato/Swiggy
              </span>
            </div>
            <div className="p-4 text-center bg-orange-50">
              <span className="text-xs font-bold text-primary uppercase tracking-wide">
                ✅ Ariar Tech
              </span>
            </div>
          </div>
          {[
            ['Commission per order', '25–30%', '0%'],
            ['Monthly cost', '₹25,000–₹45,000', '₹0'],
            ['Customer ownership', '❌ Theirs', '✅ Yours'],
            ['WhatsApp orders', '❌ No', '✅ Yes'],
            ['Custom branding', '❌ No', '✅ Yes'],
            ['Setup time', '7–14 days', '48 hours'],
            ['One-time fee', '₹0 (but pays forever)', '₹8,000 only'],
          ].map(([feature, bad, good]) => (
            <div key={feature} className="grid grid-cols-3 border-b border-gray-50 last:border-0">
              <div className="p-3.5 text-sm text-gray-600 font-medium">{feature}</div>
              <div className="p-3.5 text-center text-sm text-red-500 font-semibold">{bad}</div>
              <div className="p-3.5 text-center text-sm text-primary font-bold bg-orange-50/50">{good}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}