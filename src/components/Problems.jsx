export default function ProblemSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-secondary text-2xl md:text-3xl">
            Sound Familiar?
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Whether you're a restaurant, cloud kitchen, or home chef — the problem is the same.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {[
            {
              icon: '💸',
              audience: 'Restaurant Owners',
              title: 'Losing ₹25,000–₹45,000 Every Month',
              desc: '25–30% of every order goes to a platform. You cook. You deliver. They take the cut.',
              color: 'border-red-100 bg-red-50',
              textColor: 'text-red-600',
            },
            {
              icon: '📱',
              audience: 'Home Chefs & Tiffin Services',
              title: 'Taking Orders Manually Is a Mess',
              desc: 'Tracking orders on WhatsApp manually. Wrong orders. Missed messages. No system.',
              color: 'border-orange-100 bg-orange-50',
              textColor: 'text-orange-600',
            },
          ].map(card => (
            <div key={card.title} className={`border-2 ${card.color} rounded-2xl p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{card.icon}</span>
                <span className={`text-[11px] font-bold uppercase tracking-wide ${card.textColor}`}>
                  {card.audience}
                </span>
              </div>
              <h3 className={`font-bold text-sm md:text-base mb-1 ${card.textColor}`}>
                {card.title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Both have the same solution */}
        <div className="bg-secondary rounded-2xl p-5 md:p-6 flex flex-col md:flex-row
                        items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white/70 text-sm md:text-base">
            Both problems have{' '}
            <span className="text-primary font-bold">one solution</span>
            {' '}— your own ordering website where orders come directly to your WhatsApp.
          </p>
          <div className="shrink-0 bg-primary/20 border border-primary/30 rounded-xl px-4 py-2">
            <p className="font-display font-bold text-primary text-xl">₹8,000</p>
            <p className="text-white/40 text-xs">one time. forever.</p>
          </div>
        </div>

      </div>
    </section>
  )
}