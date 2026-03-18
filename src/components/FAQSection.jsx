import { useState } from 'react'

const faqs = [
  {
    q: 'Do I need any technical knowledge?',
    a: 'Absolutely not. We handle everything — building the website, setting it up, deploying it live. You just tell us your menu and brand details. If you can use WhatsApp, you can use our system.',
  },
  {
    q: 'How long does the setup take?',
    a: 'We go live within 48 hours of receiving your menu, logo, and details. In most cases even faster. You share everything on WhatsApp and we do the rest.',
  },
  {
    q: 'Do I need to download any app?',
    a: 'No app needed at all. Orders come directly to your existing WhatsApp. Your customers just click a link — no download, no signup required for them either.',
  },
  {
    q: 'What if I want to change my menu later?',
    a: 'Just WhatsApp us the changes. We update your menu within 24 hours. First month of updates is free. After that it\'s ₹200 per update — or ₹500/month for unlimited changes.',
  },
  {
    q: 'Will I get a custom domain like myrestaurant.in?',
    a: 'Yes! We can set up a custom domain for ₹800/year. Your site would be something like zaynskitchen.in instead of a generic link. Highly recommended for professionalism.',
  },
  {
    q: 'Is there a monthly fee after setup?',
    a: 'No monthly fees. You pay ₹8,000 once and your site stays live forever. We host it on Vercel which is free. The only optional recurring cost is domain renewal at ₹800/year.',
  },
  {
    q: 'What if customers want to pay online?',
    a: 'Currently orders go to WhatsApp where you can coordinate payment. Customers can choose Cash on Delivery or UPI. You then send them your UPI QR on WhatsApp. Clean and simple.',
  },
  {
    q: 'Do you provide support after launch?',
    a: 'Yes — 1 month of free WhatsApp support is included. We\'re a small team, not a call center. You\'re talking directly to the person who built your site.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className="bg-gray-50 py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">FAQ</span>
          <h2 className="font-display font-bold text-secondary text-2xl md:text-4xl mt-2">
            Questions? We've Got<br />
            <span className="text-primary">Answers.</span>
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-3">
                <span className="font-semibold text-gray-800 text-sm md:text-base">
                  {faq.q}
                </span>
                <span className={`text-primary font-bold text-lg shrink-0 transition-transform duration-200
                  ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 border-t border-gray-50">
                  <p className="text-gray-600 text-sm leading-relaxed pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}