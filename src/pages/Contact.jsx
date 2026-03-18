import { useState } from 'react'
import { restaurant } from '../data/restaurantConfig'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', restaurant: '', message: '' })

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim()) return
    const msg = `Hi! I'm interested in getting a website for my restaurant.

👤 Name: ${form.name}
📞 Phone: ${form.phone}
🍽️ Restaurant: ${form.restaurant || 'Not mentioned'}
💬 Message: ${form.message || 'No message'}`

    window.open(
      `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      '_blank'
    )
  }

  const contacts = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      label: 'WhatsApp',
      value: '+91 97391 83566',
      href: `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent('Hi! I want a website for my restaurant!')}`,
      color: 'bg-green-500',
      lightColor: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+91 97391 83566',
      href: 'tel:+919739183566',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'hello@ariartech.com',
      href: 'mailto:hello@ariartech.com',
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      label: 'Instagram',
      value: '@ariar.tech',
      href: 'https://www.instagram.com/ariar.tech/',
      color: 'bg-pink-500',
      lightColor: 'bg-pink-50 text-pink-700 border-pink-200',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ─────────────────────────────────── */}
      <div className="bg-secondary text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <h1 className="font-display font-bold text-3xl md:text-5xl mb-3">
            Let's Build Your<br />
            <span className="text-primary">Restaurant Website</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto">
            Ready to get orders directly on WhatsApp? Reach out — free consultation, no commitment.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">

          {/* ── Left: Contact cards ──────────────── */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-secondary text-lg md:text-xl mb-5">
              Reach us on
            </h2>

            {contacts.map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-4 p-4 bg-white rounded-2xl border
                            shadow-sm hover:shadow-md active:scale-[0.98]
                            transition-all duration-150 ${c.lightColor}`}>
                <div className={`w-11 h-11 ${c.color} text-white rounded-xl
                                flex items-center justify-center shrink-0 shadow-sm`}>
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide opacity-60">
                    {c.label}
                  </p>
                  <p className="font-bold text-sm md:text-base">{c.value}</p>
                </div>
                <svg className="w-4 h-4 ml-auto opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}

            {/* Response time badge */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shrink-0" />
              <p className="text-green-700 text-sm font-medium">
                Typically responds within <span className="font-bold">5 minutes</span> on WhatsApp
              </p>
            </div>
          </div>

          {/* ── Right: Quick inquiry form ─────────── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
            <h2 className="font-display font-bold text-secondary text-lg md:text-xl mb-1">
              Quick Inquiry
            </h2>
            <p className="text-gray-400 text-xs mb-5">
              Fill this and we'll send it straight to WhatsApp 🚀
            </p>

            <div className="space-y-3">
              <input
                type="text" name="name" placeholder="Your Name *"
                value={form.name} onChange={onChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                           text-sm placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-orange-200 focus:border-primary transition-all"
              />
              <input
                type="tel" name="phone" placeholder="Phone Number *"
                value={form.phone} onChange={onChange} maxLength={10}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                           text-sm placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-orange-200 focus:border-primary transition-all"
              />
              <input
                type="text" name="restaurant" placeholder="Restaurant Name (optional)"
                value={form.restaurant} onChange={onChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                           text-sm placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-orange-200 focus:border-primary transition-all"
              />
              <textarea
                name="message" placeholder="Your message (optional)"
                value={form.message} onChange={onChange} rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                           text-sm placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-orange-200 focus:border-primary transition-all resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!form.name.trim() || !form.phone.trim()}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 disabled:opacity-40
                         disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl
                         transition-all active:scale-[0.98] flex items-center justify-center gap-2
                         text-sm md:text-base shadow-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Send via WhatsApp
            </button>

            <p className="text-[11px] text-gray-400 text-center mt-2">
              Opens WhatsApp with your details pre-filled ✅
            </p>
          </div>
        </div>

        {/* ── Bottom CTA ───────────────────────────── */}
        <div className="mt-8 bg-secondary rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
          </div>
          <h3 className="font-display font-bold text-white text-lg md:text-xl mb-2 relative z-10">
            Not sure yet? Try the demo first 👇
          </h3>
          <p className="text-white/50 text-sm mb-5 relative z-10">
            Browse the menu, add items, and see exactly how your customers will experience it.
          </p>
          <a href="/menu"
            className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-xl
                       text-sm hover:bg-orange-600 transition-all active:scale-95 relative z-10">
            🍽️ Try the Live Demo →
          </a>
        </div>

      </div>
    </div>
  )
}