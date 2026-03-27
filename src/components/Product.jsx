
export default function Product() {
  const before = [
    { icon: '📞', title: 'Order chaos',    desc: 'Calls, DMs, WhatsApp — all scattered' },
    { icon: '😵', title: 'No system',      desc: 'Manual notes, wrong orders, missed messages' },
    { icon: '💸', title: '30% gone',       desc: 'Every order pays Swiggy or Zomato first' },
    { icon: '👥', title: 'No ownership',   desc: 'Platform owns your customers, not you' },
  ]

  const after = [
    { icon: '📱', title: 'One place',      desc: 'All orders straight to your WhatsApp' },
    { icon: '🛒', title: 'Proper system',  desc: 'Menu, cart, order — handled cleanly' },
    { icon: '💰', title: '100% yours',     desc: 'Zero commission. Every rupee stays with you' },
    { icon: '👤', title: 'You own it',     desc: 'Your website, your brand, your customers' },
  ]

  const included = [
    { icon: '🌐', label: 'Custom ordering website', value: '✅ Included',     zero: false },
    { icon: '📱', label: 'WhatsApp integration',    value: '✅ Included',     zero: false },
    { icon: '🎨', label: 'Brand customization',     value: '✅ Included',     zero: false },
    { icon: '📋', label: 'Full menu setup',          value: '✅ Included',     zero: false },
    { icon: '📲', label: 'QR code for tables',       value: '✅ Included',     zero: false },
    { icon: '🔧', label: '1 month free support',     value: '✅ Included',     zero: false },
    { icon: '🚀', label: 'Hosting',                  value: '✅ Free', zero: false },
    { icon: '🔗', label: 'Custom domain — yourbrand.in on Google', value: '✅ Optional add-on', zero: false },
    { icon: '💸', label: 'Commission',               value: '🚫 Zero',         zero: true  },
    { icon: '📅', label: 'Monthly fees',             value: '🚫 None',         zero: true  },
  ]

  return (
    <section
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="bg-[#0f0f0f] py-16 md:py-24 px-6 flex flex-col items-center"
    >
      {/* Eyebrow */}
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#ff7832] mb-4">
        Before vs After
      </p>

      {/* Headline */}
      <h2
        style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
        className="text-[#f5f0e8] text-center leading-[1.13] mb-3
                   text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem]"
      >
        The old way is{' '}
        <em style={{ fontStyle: 'italic', color: '#ff7832' }}>costing you.</em>
      </h2>

      <p className="text-[rgba(245,240,232,0.35)] text-[13px] text-center max-w-sm leading-relaxed mb-10">
        Here's exactly what changes when you get your own ordering website.
      </p>

      {/* ── Before / After ── */}
      <div className="grid grid-cols-2 gap-2.5 w-full max-w-2xl mb-2.5">

        {/* Before */}
        <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]
                        rounded-[20px] p-5">
          <span className="inline-block text-[10px] font-medium uppercase tracking-[0.13em]
                           bg-[rgba(226,75,74,0.1)] text-[#f09595] border border-[rgba(226,75,74,0.15)]
                           px-3 py-1 rounded-full mb-4">
            Without us
          </span>
          <div className="flex flex-col gap-3">
            {before.map((b) => (
              <div key={b.title} className="flex items-start gap-2.5">
                <div className="w-[30px] h-[30px] bg-[rgba(226,75,74,0.1)] rounded-[8px]
                               flex items-center justify-center text-[14px] shrink-0">
                  {b.icon}
                </div>
                <div>
                  <p className="text-[#f5f0e8] text-[12px] font-medium leading-none mb-0.5">
                    {b.title}
                  </p>
                  <p className="text-[rgba(245,240,232,0.38)] text-[11px] leading-snug">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* After */}
        <div className="bg-[rgba(255,120,50,0.04)] border border-[rgba(255,120,50,0.22)]
                        rounded-[20px] p-5">
          <span className="inline-block text-[10px] font-medium uppercase tracking-[0.13em]
                           bg-[rgba(255,120,50,0.1)] text-[#ff7832] border border-[rgba(255,120,50,0.2)]
                           px-3 py-1 rounded-full mb-4">
            With Ariar Kitchen
          </span>
          <div className="flex flex-col gap-3">
            {after.map((a) => (
              <div key={a.title} className="flex items-start gap-2.5">
                <div className="w-[30px] h-[30px] bg-[rgba(255,120,50,0.1)] rounded-[8px]
                               flex items-center justify-center text-[14px] shrink-0">
                  {a.icon}
                </div>
                <div>
                  <p className="text-[#f5f0e8] text-[12px] font-medium leading-none mb-0.5">
                    {a.title}
                  </p>
                  <p className="text-[rgba(245,240,232,0.38)] text-[11px] leading-snug">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-full max-w-2xl h-px bg-[rgba(255,255,255,0.06)] my-8" />

      {/* ── What's included ── */}
      <p className="text-[11px] font-medium uppercase tracking-[0.16em]
                    text-[rgba(245,240,232,0.3)] mb-5 text-center">
        What's included
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 w-full max-w-2xl mb-2.5">
        {included.map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl p-4 flex flex-col gap-2
              ${item.zero
                ? 'bg-[rgba(34,197,94,0.03)] border border-[rgba(34,197,94,0.15)]'
                : 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]'
              }`}
          >
            <div className="w-[34px] h-[34px] bg-[rgba(255,120,50,0.1)] rounded-[9px]
                           flex items-center justify-center text-[16px]">
              {item.icon}
            </div>
            <p className="text-[#f5f0e8] text-[12px] font-medium leading-snug">
              {item.label}
            </p>
            <p className={`text-[10px] font-medium ${item.zero ? 'text-green-400' : 'text-[#ff7832]'}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="w-full max-w-2xl bg-[rgba(255,120,50,0.06)] border border-[rgba(255,120,50,0.2)]
                      rounded-[18px] px-5 py-4 flex items-center gap-3 mt-2.5">
        <div className="w-[34px] h-[34px] bg-[rgba(255,120,50,0.15)] rounded-[9px]
                       flex items-center justify-center text-[16px] shrink-0">
          ⚡
        </div>
        <p className="text-[rgba(245,240,232,0.45)] text-[13px] leading-relaxed">
          One time setup ·{' '}
          <span className="text-[#f5f0e8] font-medium">Live in 72 hours</span>
          {' '}· Free consultation ·{' '}
          <span className="text-[#f5f0e8] font-medium">Direct WhatsApp support</span>
        </p>
      </div>

    </section>
  )
}

