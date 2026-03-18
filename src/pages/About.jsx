import { Link } from 'react-router-dom'
import { restaurant } from '../data/restaurantConfig'

export default function About() {
  const waUrl = (msg) => `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(msg)}`

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-secondary text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
            Live Demo
          </span>
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-3">About Us</h1>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
            This is a sample about page for {restaurant.name}. Your restaurant would have YOUR story here.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-6 md:space-y-8">

        {/* Sales banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 md:p-6
                        flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">For Restaurant Owners</p>
            <h3 className="font-display font-bold text-secondary text-base md:text-xl">
              This page is just a template
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Your restaurant would have YOUR story, YOUR founder, YOUR journey.
            </p>
          </div>
          <a href={waUrl('Hi! I want an about page for MY restaurant!')}
            target="_blank" rel="noopener noreferrer"
            className="shrink-0 bg-primary text-white font-bold py-2.5 px-5 rounded-xl text-sm
                       hover:bg-orange-600 transition-all active:scale-95 whitespace-nowrap">
            📲 Build Yours →
          </a>
        </div>

        {/* Owner story */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="md:flex">
            <div className="flex-1 p-6 md:p-8">
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
                Demo content
              </span>
              <div className="flex items-center gap-4 mt-4 mb-5">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center
                                justify-center text-white font-display font-bold text-xl shrink-0">
                  Sl
                </div>
                <div>
                  <h2 className="font-bold text-secondary text-base md:text-lg">Syed Luqmaan</h2>
                  <p className="text-gray-500 text-sm">Founder & Head Chef</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed italic">
                "Every dish tells a story of my grandmother's recipes. We use only fresh,
                halal ingredients and cook with the same love she taught me."
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Online · Responds in 5 min
              </div>
            </div>
            <div className="md:w-56 bg-orange-50 p-6 flex flex-col items-center justify-center
                            border-t md:border-t-0 md:border-l border-orange-100">
              <div className="text-4xl mb-2">🍽️</div>
              <p className="font-bold text-secondary text-center text-sm">Since 2020</p>
              <p className="text-xs text-gray-400 text-center">5+ Years of Love</p>
            </div>
          </div>
        </div>

        {/* Journey + Promise */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {[
            { title: 'Our Journey', text: "What started as a small cloud kitchen in BTM Layout has grown into a beloved spot for food lovers. We've served over 500+ happy customers and continue to grow every day." },
            { title: 'Our Promise', text: "Fresh ingredients, authentic recipes, and timely delivery. We don't just cook food — we create experiences that bring smiles to your family." },
          ].map(card => (
            <div key={card.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
                Demo
              </span>
              <h3 className="font-display font-bold text-secondary text-base md:text-lg mt-3 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[['2020','Founded'],['500+','Customers'],['9','Menu Items'],['4.8','Rating']].map(([val,lbl]) => (
            <div key={lbl} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5 text-center">
              <div className="font-display font-bold text-primary text-2xl md:text-3xl">{val}</div>
              <div className="text-xs md:text-sm text-gray-500 mt-0.5">{lbl}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h3 className="font-display font-bold text-secondary text-lg md:text-xl text-center mb-6 md:mb-8">
            What We Stand For
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌿', title: 'Fresh Ingredients', desc: 'Sourced fresh every single day' },
              { icon: '❤️', title: 'Made with Love', desc: 'Like your home-cooked meals' },
              { icon: '⏰', title: 'On Time', desc: 'Delivery within 30–40 minutes' },
            ].map(v => (
              <div key={v.title} className="text-center">
                <div className="text-3xl md:text-4xl mb-2">{v.icon}</div>
                <h4 className="font-bold text-secondary text-sm md:text-base mb-1">{v.title}</h4>
                <p className="text-xs md:text-sm text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-secondary rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
          </div>
          <h3 className="font-display font-bold text-white text-xl md:text-2xl mb-2 relative z-10">
            This Could Be YOUR Restaurant Story
          </h3>
          <p className="text-white/60 text-sm md:text-base mb-6 max-w-lg mx-auto relative z-10">
            Get your own website with your menu, branding, and WhatsApp ordering in just 2 days.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 justify-center relative z-10">
            <a href={waUrl('Hi! I want a complete restaurant website like Ariar Kitchen!')}
              target="_blank" rel="noopener noreferrer"
              className="bg-primary text-white font-bold py-3 px-6 rounded-xl text-sm
                         hover:bg-orange-600 transition-all active:scale-95">
              🚀 Build Your Website Now
            </a>
            <Link to="/menu"
              className="border border-white/20 text-white font-semibold py-3 px-6 rounded-xl text-sm
                         hover:bg-white/10 transition-all active:scale-95">
              Try the Demo →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}