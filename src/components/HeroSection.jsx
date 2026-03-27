import { Link } from 'react-router-dom'
import { restaurant } from '../data/restaurantConfig'

export default function HeroSection() {
  const waUrl = `https://wa.me/91${restaurant.whatsappNumber}?text=${encodeURIComponent(
    'Hi! I want to set up a WhatsApp ordering website for my restaurant. Please guide me.'
  )}`

  const pills = [
    'No commission cuts',
    'No WhatsApp group chaos',
    'No calls back and forth',
    'Your own website',
  ]

  const steps = [
    { n: '01', icon: '🍔', title: 'Browse Menu', desc: 'Customers pick items from your branded page' },
    { n: '02', icon: '🛒', title: 'Cart & Order', desc: 'Add items, confirm address and payment' },
    { n: '03', icon: '📱', title: 'WhatsApp', desc: 'Order lands on your number instantly' },
  ]

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;1,300&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

      <section
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className="relative bg-[#0f0f0f] flex flex-col items-center px-6 pt-12 pb-14"
      >
        {/* Radial glow background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px]"
            style={{ background: 'radial-gradient(circle, rgba(255,120,50,0.12) 0%, transparent 70%)' }} />
        </div>

        {/* ── Brand tag ── */}
        <div
          className="inline-block text-[11px] font-medium uppercase tracking-[0.18em] text-[#ff7832]
                     border border-[rgba(255,120,50,0.3)] px-4 py-1.5 rounded-full mb-7 z-10">
          Ariar Kitchen
        </div>

        {/* ── Headline ── */}
        <h1
          style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
          className="text-[#f5f0e8] text-center leading-[1.12] mb-3 z-10
                     text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] max-w-2xl">
          Restaurant ordering,{' '}
          <em style={{ fontStyle: 'italic', color: '#ff7832' }}>made effortless.</em>
        </h1>

        {/* ── Sub headline ── */}
        <p className="text-[rgba(245,240,232,0.4)] text-sm text-center max-w-md leading-relaxed mb-10 z-10">
          From cloud kitchens to neighbourhood spots — get your own menu website
          and let orders flow straight to WhatsApp.
        </p>

        {/* ── Mini pills ── */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12 max-w-lg z-10">
          {pills.map((p) => (
            <div
              key={p}
              className="flex items-center gap-2 text-[rgba(245,240,232,0.75)] text-[13px] font-medium
                         bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)]
                         rounded-xl px-4 py-2.5 transition-colors
                         hover:bg-[rgba(255,120,50,0.08)] hover:border-[rgba(255,120,50,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#ff7832] opacity-70 shrink-0" />
              {p}
            </div>
          ))}
        </div>

        {/* ── 3 Steps ── */}
        <div className="flex items-center w-full max-w-xl mb-12 z-10">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div
                className="flex-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]
                           rounded-2xl p-4 text-center">
                <p
                  style={{ fontFamily: "'Fraunces', serif", letterSpacing: '0.1em' }}
                  className="text-[11px] font-bold text-[#ff7832] opacity-60 mb-1.5">
                  {s.n}
                </p>
                <div className="w-10 h-10 bg-[rgba(255,120,50,0.12)] rounded-xl
                               flex items-center justify-center mx-auto mb-2.5">
                  <span className="text-[18px] leading-none">{s.icon}</span>
                </div>
                <p className="text-[12px] font-medium text-[#f5f0e8] mb-0.5">{s.title}</p>
                <p className="text-[10px] text-[rgba(245,240,232,0.35)] leading-relaxed">{s.desc}</p>
              </div>

              {i < steps.length - 1 && (
                <div className="w-7 flex-shrink-0 flex items-center justify-center
                               text-[rgba(255,120,50,0.5)] text-base">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── CTA Buttons ── */}
        <div className="flex flex-col xs:flex-row gap-3 justify-center z-10">
          {/* Primary — Build yours */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 font-medium text-sm
                       text-white bg-[#ff7832] px-7 py-3.5 rounded-[14px]
                       transition-all duration-200 active:scale-95
                       hover:bg-[#e86920] hover:-translate-y-px
                       shadow-[0_0_0_0_rgba(255,120,50,0)] hover:shadow-[0_8px_28px_rgba(255,120,50,0.35)]">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Build yours — free consult
          </a>

          {/* Secondary — Live demo */}
          <Link
            to="/menu"
            className="flex items-center justify-center gap-2 font-medium text-sm
                       text-[#ff7832] bg-transparent
                       border-2 border-[#ff7832]
                       px-7 py-3.5 rounded-[14px]
                       transition-all duration-200 active:scale-95
                       hover:bg-[#ff7832] hover:text-white hover:-translate-y-px
                       hover:shadow-[0_8px_28px_rgba(255,120,50,0.35)]">
            👀 See the live demo
          </Link>
        </div>

        {/* ── Trust bar ── */}
        <div className="flex items-center gap-2 mt-6 z-10">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[rgba(245,240,232,0.3)] text-[11px]">
            Trusted by 10+ restaurants in Bangalore
          </span>
          <span className="w-1 h-1 bg-[rgba(245,240,232,0.2)] rounded-full" />
          <span className="text-[rgba(245,240,232,0.3)] text-[11px]">Zero commission</span>
          <span className="w-1 h-1 bg-[rgba(245,240,232,0.2)] rounded-full" />
          <span className="text-[rgba(245,240,232,0.3)] text-[11px]">Live in 72 hours</span>
        </div>

      </section>
    </>
  )
}