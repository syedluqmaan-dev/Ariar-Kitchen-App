import { Link } from 'react-router-dom'
import { restaurant } from '../data/restaurantConfig'

export default function DemoSection() {
  const waUrl = `https://wa.me/91${restaurant.whatsappNumber}?text=${encodeURIComponent(
    'Hi! I want to set up a WhatsApp ordering website for my restaurant.'
  )}`

  return (
    <section className="bg-secondary py-14 md:py-20 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">
            Live Demo
          </span>
          <h2 className="font-display font-bold text-white text-2xl md:text-4xl mt-2">
            See Exactly How It Works
          </h2>
          <p className="text-white/50 text-sm md:text-base mt-3 max-w-xl mx-auto">
            This is a real working demo. Browse the menu, add items to cart,
            and see the WhatsApp order flow — exactly how your customers will experience it.
          </p>
        </div>

        {/* Flow steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { icon: '🔗', step: '1', title: 'Share Link', desc: 'Customer clicks your menu link or scans QR code' },
            { icon: '🍔', step: '2', title: 'Browse & Order', desc: 'They browse your menu and add items to cart' },
            { icon: '📋', step: '3', title: 'Fill Details', desc: 'Name, phone, address — quick and easy' },
            { icon: '📱', step: '4', title: 'WhatsApp!', desc: 'Order arrives on YOUR WhatsApp instantly' },
          ].map(item => (
            <div key={item.step}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center
                         hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center
                              text-primary font-bold text-xs mx-auto mb-2">
                {item.step}
              </div>
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="font-bold text-white text-xs md:text-sm">{item.title}</p>
              <p className="text-white/40 text-[10px] md:text-xs mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/menu"
            className="bg-primary hover:bg-orange-600 text-white font-bold
                       py-4 px-8 rounded-xl text-sm md:text-base transition-all
                       active:scale-95 shadow-lg shadow-primary/30
                       flex items-center justify-center gap-2">
            🍽️ Try Demo Order Now
          </Link>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="border border-white/20 text-white hover:bg-white/10 font-semibold
                       py-4 px-8 rounded-xl text-sm md:text-base transition-all
                       active:scale-95 flex items-center justify-center gap-2">
            💬 Get This For My Restaurant
          </a>
        </div>

        <p className="text-white/30 text-xs text-center mt-4">
          No signup needed · Just click and explore the demo
        </p>
      </div>
    </section>
  )
}