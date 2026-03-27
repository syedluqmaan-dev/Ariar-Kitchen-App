import { restaurant } from '../data/restaurantConfig'
import { Link } from 'react-router-dom'

export default function FinalCTASection() {
  const waUrl = `https://wa.me/91${restaurant.whatsappNumber}?text=${encodeURIComponent(
    'Hi! I want to set up a WhatsApp ordering website for my restaurant. Please guide me.'
  )}`

  const reassurances = [
    'Free consultation',
    'No commitment',
    'Setup in 72 hours',
    'Direct WhatsApp support',
  ]

  return (
    <section
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="bg-[#0f0f0f] py-16 md:py-24 px-6 flex flex-col items-center"
    >
      {/* Limited slots pill */}
      <div className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.04)]
                      border border-[rgba(255,255,255,0.08)] px-4 py-2 rounded-full mb-8">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-[rgba(245,240,232,0.5)] text-[11px] font-medium">
          Limited slots this week
        </span>
      </div>

      {/* Headline */}
      <h2
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
        className="text-[#f5f0e8] text-center leading-[1.15] mb-4
                   text-[1.9rem] sm:text-[2.3rem] md:text-[3rem] max-w-xl"
      >
        Ready to grow{' '}
        <em style={{ fontStyle: 'italic', color: '#ff7832' }}>your restaurant?</em>
      </h2>

      {/* Sub */}
      <p className="text-[rgba(245,240,232,0.38)] text-[13px] md:text-sm text-center
                    max-w-sm leading-relaxed mb-12">
        Stop watching your profits go to commission apps. Get your own ordering website
        and start receiving orders directly on your WhatsApp — starting today.
      </p>

      {/* Stats */}
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mb-12">
        {[
          { value: '72', label: 'To go live' },
          { value: '0%', label: 'Commission forever' },
          { value: '10+', label: 'Restaurants in Bangalore' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}
              className="text-[#ff7832] text-[2rem] leading-none mb-1"
            >
              {s.value}
            </p>
            <p className="text-[rgba(245,240,232,0.3)] text-[11px]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col xs:flex-row gap-3 justify-center mb-8">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 font-medium text-sm
                     text-white bg-[#ff7832] px-7 py-3.5 rounded-[14px]
                     transition-all duration-200 active:scale-95
                     hover:bg-[#e86920] hover:-translate-y-px
                     hover:shadow-[0_8px_28px_rgba(255,120,50,0.35)]"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Start getting orders on WhatsApp
        </a>
        <Link
          to="/menu"
          className="flex items-center justify-center gap-2 font-medium text-sm
                     text-[#ff7832] bg-transparent
                     border-2 border-[#ff7832]
                     px-7 py-3.5 rounded-[14px]
                     transition-all duration-200 active:scale-95
                     hover:bg-[#ff7832] hover:text-white hover:-translate-y-px
                     hover:shadow-[0_8px_28px_rgba(255,120,50,0.35)]"
        >
          👀 Try live demo
        </Link>
      </div>

      {/* Reassurances */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {reassurances.map((item) => (
          <span
            key={item}
            className="flex items-center gap-1.5 text-[rgba(245,240,232,0.3)] text-[11px]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7832] opacity-50" />
            {item}
          </span>
        ))}
      </div>

    </section>
  )
}