import { Link } from 'react-router-dom'
import { restaurant } from '../data/restaurantConfig'

export default function HeroSection() {
  const waUrl = `https://wa.me/91${restaurant.whatsappNumber}?text=${encodeURIComponent(
    'Hi! I want to set up a WhatsApp ordering website for my restaurant. Please guide me.'
  )}`

  return (
    <section className="relative bg-secondary overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16 md:pt-16 md:pb-24">

        {/* ── Who this is for ── */}
        <div className="flex justify-center lg:justify-start mb-7">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0" />
            <span className="text-white/60 text-xs font-medium">
              For restaurants, cloud kitchens & home chefs in India
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── LEFT ── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Headline */}
            <h1 className="font-display font-bold leading-[1.1] mb-5
                           text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] xl:text-6xl">
              <span className="text-white/50 block text-xl sm:text-2xl md:text-3xl font-semibold mb-2 leading-snug">
                Paying commission on every order?<br className="hidden sm:block" />
                Taking orders manually on WhatsApp?
              </span>
              <span className="text-white">Get Your Own</span>{' '}
              <span className="text-primary">Ordering Website.</span><br />
              <span className="text-white">Keep 100% of</span>{' '}
              <span className="text-primary">Every Rupee.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto lg:mx-0 mb-5 leading-relaxed">
              We build you a beautiful menu website in 48 hours.
              Your customers order, and it lands{' '}
              <span className="text-white font-semibold">directly on your WhatsApp.</span>
              {' '}No commission. No middleman. No monthly fees.
            </p>

            {/* Loss aversion — ROI pill */}
            <div className="inline-flex flex-col xs:flex-row items-center gap-3
                            bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mb-6 text-left">
              <div className="flex items-center gap-2">
                <span className="text-lg">📉</span>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-wide font-semibold">You're losing</p>
                  <p className="text-red-400 font-bold text-base line-through decoration-red-500/50">
                    ₹30,000/month
                  </p>
                </div>
              </div>
              <div className="hidden xs:block w-px h-8 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-lg">🚀</span>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-wide font-semibold">Fix it for just</p>
                  <p className="text-primary font-bold text-base">₹8,000 one time</p>
                </div>
              </div>
              <div className="hidden xs:block w-px h-8 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-wide font-semibold">ROI in</p>
                  <p className="text-green-400 font-bold text-base">6 days</p>
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col xs:flex-row gap-3 justify-center lg:justify-start mb-4">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="group relative bg-primary hover:bg-orange-600 text-white font-bold
                           py-4 px-7 rounded-xl text-sm md:text-base transition-all
                           active:scale-95 shadow-xl shadow-primary/30
                           flex items-center justify-center gap-2 overflow-hidden">
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <svg viewBox="0 0 24 24" className="relative w-4 h-4 fill-current shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="relative">Start Getting Orders on WhatsApp</span>
              </a>
              <Link to="/menu"
                className="border border-white/15 text-white/70 hover:bg-white/10
                           hover:text-white font-semibold py-4 px-7 rounded-xl
                           text-sm md:text-base transition-all active:scale-95
                           flex items-center justify-center gap-2">
                👀 Try Live Demo
              </Link>
            </div>

            {/* Urgency */}
            <p className="text-orange-400/80 text-xs font-semibold text-center lg:text-left mb-5">
              ⚡ Limited slots this week · Setup in 48 hours · Free consultation
            </p>

            {/* Trust + risk reversal */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-5">
              {[
                '✅ No coding needed',
                '✅ No monthly fees',
                '✅ Own your customers',
                '✅ Free revisions',
              ].map(t => (
                <span key={t}
                  className="text-[11px] text-white/40 bg-white/5 border border-white/10
                             px-2.5 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['🧑‍🍳', '👩‍🍳', '🧑‍🍳', '👨‍🍳'].map((e, i) => (
                  <div key={i}
                    className="w-7 h-7 rounded-full bg-white/10 border border-white/20
                               flex items-center justify-center text-xs">
                    {e}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white/60 text-xs font-semibold">Trusted by 10+ restaurants in Bangalore</p>
                <p className="text-white/25 text-[10px]">500+ orders processed · Zero commission</p>
              </div>
            </div>

          </div>

          {/* ── RIGHT ── */}
          <div className="flex-1 w-full max-w-sm lg:max-w-none">
            <div className="relative">

              {/* Image */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden
                              shadow-2xl shadow-black/60 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800"
                  alt="Restaurant food"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 text-center">
                  <p className="text-white/60 text-xs mb-2">👆 This could be YOUR restaurant</p>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full bg-primary
                               hover:bg-orange-600 text-white text-xs font-bold
                               py-2.5 rounded-xl transition-colors active:scale-95">
                    Get this for my restaurant →
                  </a>
                </div>
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm
                                rounded-xl px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="font-bold text-gray-800 text-xs">4.8</span>
                    <span className="text-gray-400 text-[10px]">rating</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp order notification */}
              <div className="absolute -top-4 -right-2 md:-bottom-5 md:top-auto md:-right-5
                              bg-white rounded-2xl shadow-2xl p-3 md:p-4 w-48 md:w-60 z-10">
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-[10px] text-gray-400 font-medium">Order on YOUR WhatsApp!</p>
                    </div>
                    <p className="text-xs font-bold text-gray-900">2× Burger + 1× Pizza</p>
                    <p className="text-xs text-green-600 font-semibold mt-0.5">₹520 · Cash on Delivery</p>
                  </div>
                </div>
              </div>

              {/* Ariar badge */}
              <div className="absolute -top-3 -left-3 md:-left-5 bg-secondary border
                              border-white/10 rounded-xl px-3 py-2 shadow-xl">
                <p className="text-[10px] text-white/30 leading-none mb-0.5">Powered by</p>
                <a href="https://www.ariartech.com" target="_blank" rel="noopener noreferrer"
                  className="text-primary font-bold text-xs hover:text-orange-400 transition-colors">
                  Ariar Technology ↗
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* ── How it works ── */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { n: '01', icon: '🔗', title: 'Share Your Link', desc: 'Send menu link or QR to customers' },
            { n: '02', icon: '🍔', title: 'They Browse & Order', desc: 'Add items to cart in seconds' },
            { n: '03', icon: '📋', title: 'They Confirm', desc: 'Name, address, payment — done' },
            { n: '04', icon: '📱', title: 'You Get the Order', desc: 'Straight to YOUR WhatsApp instantly' },
          ].map((s, i) => (
            <div key={s.n}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-4
                         hover:bg-white/8 transition-colors">
              {i < 3 && <div className="hidden md:block absolute top-1/2 -right-1.5 w-3 h-px bg-white/10" />}
              <p className="text-[10px] font-bold text-primary/50 font-display mb-2">{s.n}</p>
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="font-bold text-white text-xs md:text-sm mb-1">{s.title}</p>
              <p className="text-white/35 text-[10px] md:text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Final CTA bar ── */}
        <div className="mt-5 bg-gradient-to-r from-primary/15 to-transparent
                        border border-primary/20 rounded-2xl px-5 py-5 md:px-8 md:py-6
                        flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-white text-base md:text-lg">
              Your restaurant deserves better than 30% commission.
            </p>
            <p className="text-white/40 text-xs md:text-sm mt-0.5">
              Free consultation · No commitment · Live in 48 hours · Starting{' '}
              <span className="text-primary font-bold">₹8,000</span>
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="bg-primary hover:bg-orange-600 text-white font-bold
                         px-6 py-3 rounded-xl text-sm transition-all active:scale-95
                         shadow-lg shadow-primary/30 whitespace-nowrap
                         flex items-center justify-center gap-2 w-full">
              💬 Let's Talk — Free Consultation
            </a>
            <a href="https://www.ariartech.com" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-primary text-xs font-medium
                         transition-colors flex items-center gap-1">
              🌐 www.ariartech.com ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}