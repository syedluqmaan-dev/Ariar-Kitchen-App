import { restaurant } from '../data/restaurantConfig'
import { Link } from 'react-router-dom'

export default function FinalCTASection() {
  const waUrl = `https://wa.me/91${restaurant.whatsappNumber}?text=${encodeURIComponent(
    'Hi! I want to set up a WhatsApp ordering website for my restaurant. Please guide me.'
  )}`

  return (
    <section className="bg-secondary py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">

        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10
                        px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/60 text-xs font-medium">
            Limited slots this week
          </span>
        </div>

        <h2 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight mb-4">
          Ready to Grow<br />
          <span className="text-primary">Your Restaurant?</span>
        </h2>

        <p className="text-white/55 text-sm md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Stop watching your profits go to commission apps.
          Get your own ordering website and start receiving orders
          directly on your WhatsApp — starting today.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8">
          {[
            { value: '₹8,000', label: 'One time only' },
            { value: '48hrs', label: 'To go live' },
            { value: '₹0', label: 'Commission forever' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="font-display font-bold text-primary text-2xl md:text-3xl">{stat.value}</p>
              <p className="text-white/40 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col xs:flex-row gap-3 justify-center mb-5">
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="bg-primary hover:bg-orange-600 text-white font-bold
                       py-4 px-8 rounded-xl text-sm md:text-base transition-all
                       active:scale-95 shadow-lg shadow-primary/30
                       flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Start Getting Orders on WhatsApp
          </a>
          <Link to="/menu"
            className="border border-white/15 text-white/80 hover:bg-white/10
                       font-semibold py-4 px-8 rounded-xl text-sm md:text-base
                       transition-all active:scale-95 flex items-center justify-center gap-2">
            👀 Try Demo First
          </Link>
        </div>

        {/* Reassurance */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            '✅ Free consultation',
            '✅ No commitment',
            '✅ Setup in 48 hours',
            '✅ Direct WhatsApp support',
          ].map(item => (
            <span key={item} className="text-white/40 text-xs font-medium">{item}</span>
          ))}
        </div>

      </div>
    </section>
  )
}