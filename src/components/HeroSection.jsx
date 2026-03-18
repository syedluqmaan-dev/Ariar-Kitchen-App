import { Link } from 'react-router-dom'
import { restaurant } from '../data/restaurantConfig'

export default function HeroSection() {
  const waUrl = `https://wa.me/91${restaurant.whatsappNumber}?text=${encodeURIComponent(
    'Hi! I saw the Ariar Kitchen demo and want the same for my restaurant!'
  )}`

  return (
    <section className="relative bg-secondary overflow-hidden">

      {/* ── Background effects ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-orange-400/5 rounded-full blur-2xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{backgroundImage:'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)',backgroundSize:'40px 40px'}} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">

        {/* ── TOP LABEL ───────────────────────────────── */}
        <div className="flex justify-center lg:justify-start mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10
                          backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shrink-0" />
            <span className="text-white/70 text-xs font-medium tracking-wide">
              Ariar Technology &nbsp;·&nbsp; Restaurant Tech Solutions
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── LEFT ────────────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Main headline */}
            <h1 className="font-display font-bold text-white leading-[1.1] mb-5
                           text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              Want a Website<br />
              <span className="text-primary">Like This</span> For<br />
              <span className="text-white/80">Your Restaurant?</span>
            </h1>

            {/* Sub headline */}
            <p className="text-white/55 text-sm md:text-base lg:text-lg
                          max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              Your customers browse your menu, add to cart, and the order lands
              directly on{' '}
              <span className="text-white font-semibold">your WhatsApp.</span>
              {' '}No commission. No middleman.{' '}
              <span className="text-primary font-semibold">100% yours.</span>
            </p>

            {/* 3 key points */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-8 max-w-lg mx-auto lg:mx-0">
              {[
                { icon: '🚀', line1: 'Live in', line2: '3 days' },
                { icon: '💰', line1: 'Zero', line2: 'Commission' },
                { icon: '📱', line1: 'Orders on', line2: 'WhatsApp' },
              ].map(item => (
                <div key={item.line2}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 text-center">
                  <div className="text-xl md:text-2xl mb-1">{item.icon}</div>
                  <p className="text-white/50 text-[10px] md:text-xs leading-none">{item.line1}</p>
                  <p className="text-white font-bold text-xs md:text-sm mt-0.5">{item.line2}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col xs:flex-row gap-3 justify-center lg:justify-start mb-6">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="bg-primary hover:bg-orange-600 text-white font-bold
                           py-4 px-8 rounded-xl text-sm md:text-base transition-all
                           active:scale-95 shadow-lg shadow-primary/30
                           flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Get Your Website Now
              </a>
              <Link to="/menu"
                className="border border-white/15 text-white/80 hover:bg-white/10
                           hover:text-white font-semibold py-4 px-8 rounded-xl
                           text-sm md:text-base transition-all active:scale-95
                           flex items-center justify-center gap-2">
                👀 See Live Demo
              </Link>
            </div>

            {/* Commission comparison pill */}
            <div className="inline-flex flex-col xs:flex-row items-center gap-2 justify-center lg:justify-start
                            bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">😤</span>
                <div className="text-left">
                  <p className="text-[10px] text-white/30 uppercase tracking-wide font-semibold leading-none mb-0.5">
                    Ordering app commission
                  </p>
                  <p className="text-white/40 text-sm font-bold line-through decoration-red-400">
                    ₹30,000 / month
                  </p>
                </div>
              </div>
              <div className="hidden xs:block w-px h-8 bg-white/10" />
              <div className="block xs:hidden w-full h-px bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="text-base">🎉</span>
                <div className="text-left">
                  <p className="text-[10px] text-primary/80 uppercase tracking-wide font-semibold leading-none mb-0.5">
                    Ariar Technology
                  </p>
                  <p className="text-primary text-sm font-bold">
                    ₹8,000 one time only
                  </p>
                </div>
              </div>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {['🧑‍🍳','👩‍🍳','🧑‍🍳'].map((e, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-white/10 border border-white/20
                                          flex items-center justify-center text-sm">
                    {e}
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-xs">
                Trusted by restaurants &amp; cloud kitchens
              </p>
            </div>
          </div>

          {/* ── RIGHT ───────────────────────────────────── */}
          <div className="flex-1 w-full max-w-sm lg:max-w-none">
            <div className="relative">

              {/* Main image */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden
                              shadow-2xl shadow-black/50 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800"
                  alt="Restaurant food"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Bottom overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                  <p className="text-white/70 text-xs mb-2 text-center">
                    👆 This could be YOUR restaurant
                  </p>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-primary
                               hover:bg-orange-600 text-white text-xs font-bold
                               py-2.5 rounded-xl transition-colors active:scale-95">
                    Replace with my restaurant →
                  </a>
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm
                                rounded-xl px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="font-bold text-gray-800 text-xs">4.8</span>
                    <span className="text-gray-400 text-[10px]">rating</span>
                  </div>
                </div>
              </div>

              {/* Floating WhatsApp order notification */}
              <div className="absolute -bottom-5 -right-2 md:-right-5
                              bg-white rounded-2xl shadow-2xl p-3 md:p-4
                              w-52 md:w-64 animate-bounce-subtle z-10">
                <div className="flex items-start gap-2.5">
                  <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center
                                  justify-center shrink-0 shadow-sm">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <p className="text-[10px] text-gray-400 leading-none font-medium">
                        New order received!
                      </p>
                    </div>
                    <p className="text-xs font-bold text-gray-900 leading-snug">
                      2× Burger + 1× Pizza
                    </p>
                    <p className="text-xs text-green-600 font-semibold mt-0.5">
                      ₹520 · Cash on delivery
                    </p>
                  </div>
                </div>
              </div>

              {/* Ariar Tech badge — top right */}
              <div className="absolute -top-3 -left-3 md:-left-5 bg-secondary border border-white/10
                              rounded-xl px-3 py-2 shadow-xl">
                <p className="text-[10px] text-white/50 leading-none mb-0.5">Powered by</p>
                <a href="https://www.ariartech.com" target="_blank" rel="noopener noreferrer"
                  className="text-primary font-bold text-xs hover:text-orange-400 transition-colors">
                  Ariar Technology ↗
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ────────────────────────────── */}
        <div className="mt-16 md:mt-20">
          <p className="text-white/30 text-xs uppercase tracking-widest text-center mb-6 font-semibold">
            How it works — 4 simple steps
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { step: '01', icon: '🔗', title: 'Share Link', desc: 'Share your menu link or QR code with customers' },
              { step: '02', icon: '🍔', title: 'Browse Menu', desc: 'Customer browses and adds items to cart' },
              { step: '03', icon: '📋', title: 'Place Order', desc: 'Customer fills details and confirms order' },
              { step: '04', icon: '📱', title: 'WhatsApp', desc: 'Order arrives directly on your WhatsApp' },
            ].map((item, i) => (
              <div key={item.step}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5
                           hover:bg-white/8 transition-colors group">
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-white/10 z-10" />
                )}
                <div className="text-[10px] font-bold text-primary/60 mb-2 font-display">
                  {item.step}
                </div>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-bold text-white text-xs md:text-sm mb-1">{item.title}</p>
                <p className="text-white/40 text-[10px] md:text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FINAL CTA BAR ───────────────────────────── */}
        <div className="mt-6 md:mt-8 bg-gradient-to-r from-primary/20 to-primary/5
                        border border-primary/20 rounded-2xl px-5 py-5 md:px-8 md:py-6
                        flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-white text-base md:text-xl mb-1">
              Ready to grow your restaurant?
            </p>
            <p className="text-white/50 text-xs md:text-sm">
              Free consultation &nbsp;·&nbsp; Setup in 48 hours &nbsp;·&nbsp;
              Starting <span className="text-primary font-semibold">₹8,000</span> only
            </p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2 shrink-0">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="bg-primary hover:bg-orange-600 text-white font-bold
                         px-6 py-3 rounded-xl text-sm transition-all active:scale-95
                         shadow-lg shadow-primary/30 whitespace-nowrap
                         flex items-center justify-center gap-2">
              💬 Chat on WhatsApp
            </a>
            <a href="https://www.ariartech.com" target="_blank" rel="noopener noreferrer"
              className="border border-white/15 text-white/70 hover:text-white hover:bg-white/10
                         font-semibold px-6 py-3 rounded-xl text-sm transition-all
                         active:scale-95 whitespace-nowrap flex items-center justify-center gap-2">
              🌐 ariartech.com
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}