import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { restaurant } from '../data/restaurantConfig'
import { sendOrderToWhatsApp } from '../utils/whatsappOrderGenerator'
import CartItem from '../components/CartItem'
import toast from 'react-hot-toast'

const STEPS = ['Cart', 'Details', 'Payment']

export default function Cart() {
  const { cart, totals, clearCart } = useCart()
  const [step, setStep] = useState(0) // 0=cart, 1=details, 2=payment
  const [deliveryType, setDeliveryType] = useState('delivery') // 'delivery' | 'pickup'
  const [payment, setPayment] = useState('') // 'cash' | 'upi'
  const [details, setDetails] = useState({ name: '', phone: '', address: '', note: '' })
  const [locating, setLocating] = useState(false)

  const onChange = e => setDetails(p => ({ ...p, [e.target.name]: e.target.value }))

  const finalTotal = deliveryType === 'pickup' ? totals.subtotal : totals.total
  const deliveryFee = deliveryType === 'pickup' ? 0 : totals.deliveryFee

  // ── GPS location ─────────────────────────────────
  const handleUseLocation = () => {
    if (!navigator.geolocation) { toast.error('Geolocation not supported'); return }
    setLocating(true)
    toast('Fetching your location...', { icon: '📍' })
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          )
          const data = await res.json()
          const a = data.address
          const parts = [
            a.house_number, a.road || a.pedestrian,
            a.neighbourhood || a.suburb,
            a.city || a.town || a.village,
            a.state, a.postcode
          ].filter(Boolean)
          setDetails(p => ({ ...p, address: parts.join(', ') }))
          toast.success('Location fetched!')
        } catch {
          setDetails(p => ({ ...p, address: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}` }))
          toast.success('Location fetched!')
        } finally { setLocating(false) }
      },
      err => {
        setLocating(false)
        const msgs = {
          1: 'Permission denied. Allow location in browser.',
          2: 'Location unavailable.',
          3: 'Request timed out.'
        }
        toast.error(msgs[err.code] || 'Could not get location.')
      },
      { timeout: 10000, maximumAge: 60000 }
    )
  }

  // ── Validation & place order ──────────────────────
  const handleDetailsNext = () => {
    if (!details.name.trim())                    return toast.error('Please enter your name')
    if (!/^\d{10}$/.test(details.phone.trim()))  return toast.error('Enter a valid 10-digit number')
    if (deliveryType === 'delivery' && !details.address.trim())
                                                 return toast.error('Please enter delivery address')
    if (!totals.minOrderMet)                     return toast.error(`Minimum order ₹${restaurant.minOrderAmount}`)
    setStep(2)
  }

  const handlePlaceOrder = () => {
    if (!payment) return toast.error('Please select a payment method')
    sendOrderToWhatsApp(cart, { ...details, deliveryType, payment }, {
      ...totals,
      deliveryFee,
      total: finalTotal
    })
    toast.success('Opening WhatsApp...')
  }

  // ── Step indicator ────────────────────────────────
  const StepBar = () => (
    <div className="flex items-center justify-center gap-0 mb-6">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all
            ${i === step ? 'bg-primary text-white' :
              i < step ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            {i < step ? '✓' : i + 1} {s}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-6 h-px mx-1 ${i < step ? 'bg-green-300' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  )

  // ── Empty state ───────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-xs">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center
                          justify-center text-5xl mx-auto mb-4">🛒</div>
          <h2 className="font-display font-bold text-gray-900 text-2xl mb-2">Cart is empty</h2>
          <p className="text-gray-500 text-sm mb-6">Add some delicious items to get started!</p>
          <Link to="/menu"
            className="inline-block bg-primary text-white font-bold py-3 px-8
                       rounded-xl hover:bg-orange-600 transition-colors active:scale-95">
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-2xl mx-auto md:max-w-4xl">

        {/* ── Header ──────────────────────────────── */}
        <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3 sticky top-0 z-20">
          <button onClick={() => step > 0 ? setStep(s => s - 1) : window.history.back()}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100
                       hover:bg-gray-200 text-gray-600 transition-colors text-lg">
            ←
          </button>
          <div>
            <h1 className="font-display font-bold text-gray-900 text-lg leading-none">
              {step === 0 ? 'Your Cart' : step === 1 ? 'Delivery Details' : 'Payment'}
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">
              {cart.length} item{cart.length !== 1 ? 's' : ''} · ₹{finalTotal}
            </p>
          </div>
        </div>

        <div className="px-4 pt-5 md:px-6">
          <StepBar />

          {/* ══════════════════════════════════════════
              STEP 0 — CART ITEMS
          ══════════════════════════════════════════ */}
          {step === 0 && (
            <div className="md:grid md:grid-cols-5 md:gap-6">

              {/* Left — items */}
              <div className="md:col-span-3 space-y-3">

                {/* Delivery toggle */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                    Order Type
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'delivery', icon: '🛵', label: 'Home Delivery', sub: `+₹${totals.deliveryFee} fee` },
                      { key: 'pickup',   icon: '🏃', label: 'Self Pickup',   sub: 'No delivery fee' },
                    ].map(opt => (
                      <button key={opt.key} onClick={() => setDeliveryType(opt.key)}
                        className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2
                                    font-semibold text-sm transition-all active:scale-95
                          ${deliveryType === opt.key
                            ? 'border-primary bg-orange-50 text-primary'
                            : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'}`}>
                        <span className="text-2xl">{opt.icon}</span>
                        <span className="text-xs font-bold">{opt.label}</span>
                        <span className={`text-[10px] font-medium
                          ${deliveryType === opt.key
                            ? opt.key === 'pickup' ? 'text-green-600' : 'text-primary/70'
                            : 'text-gray-400'}`}>
                          {opt.sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cart items */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800 text-sm">Order Items</h2>
                    <button onClick={clearCart}
                      className="text-xs text-red-400 hover:text-red-600 font-semibold
                                 transition-colors flex items-center gap-1">
                      🗑 Clear all
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {cart.map(item => <CartItem key={item.id} item={item} />)}
                  </div>
                </div>
              </div>

              {/* Right — bill */}
              <div className="md:col-span-2 mt-3 md:mt-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:sticky md:top-24">
                  <h2 className="font-semibold text-gray-800 text-sm mb-3">Bill Summary</h2>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Item Total</span>
                      <span>₹{totals.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
                        {deliveryFee > 0 ? `₹${deliveryFee}` : 'FREE'}
                      </span>
                    </div>
                    {deliveryType === 'pickup' && (
                      <div className="bg-green-50 rounded-xl px-3 py-2 text-green-700 text-xs font-medium">
                        🎉 You save ₹{totals.deliveryFee} with self pickup!
                      </div>
                    )}
                    <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-primary text-base">₹{finalTotal}</span>
                    </div>
                  </div>

                  {!totals.minOrderMet && (
                    <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
                      <p className="text-amber-700 text-xs font-medium">
                        ⚠️ Add ₹{restaurant.minOrderAmount - totals.subtotal} more for minimum order
                      </p>
                    </div>
                  )}

                  <button onClick={() => setStep(1)}
                    disabled={!totals.minOrderMet}
                    className="mt-4 w-full bg-primary hover:bg-orange-600 disabled:bg-gray-200
                               disabled:text-gray-400 disabled:cursor-not-allowed text-white
                               font-bold py-3.5 rounded-xl transition-all active:scale-[0.98]
                               flex items-center justify-center gap-2 text-sm shadow-sm shadow-primary/20">
                    Continue to Details →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 1 — DELIVERY DETAILS
          ══════════════════════════════════════════ */}
          {step === 1 && (
            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="md:col-span-3 space-y-3">

                {/* Name */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                    👤 Your Name
                  </label>
                  <input type="text" name="name" placeholder="e.g. Ahmed Khan"
                    value={details.name} onChange={onChange}
                    className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl
                               text-sm placeholder-gray-400 focus:outline-none focus:ring-2
                               focus:ring-orange-200 focus:border-primary transition-all" />
                </div>

                {/* Phone */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                    📞 Phone Number
                  </label>
                  <input type="tel" name="phone" placeholder="10-digit mobile number"
                    value={details.phone} onChange={onChange} maxLength={10}
                    className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl
                               text-sm placeholder-gray-400 focus:outline-none focus:ring-2
                               focus:ring-orange-200 focus:border-primary transition-all" />
                </div>

                {/* Address — only for delivery */}
                {deliveryType === 'delivery' && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                      📍 Delivery Address
                    </label>
                    <textarea name="address" placeholder="House no, Street, Area, City..."
                      value={details.address} onChange={onChange} rows={3}
                      className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                 text-sm placeholder-gray-400 focus:outline-none focus:ring-2
                                 focus:ring-orange-200 focus:border-primary transition-all resize-none" />
                    <button onClick={handleUseLocation} disabled={locating}
                      className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5
                                  rounded-xl border text-xs font-semibold transition-all
                        ${locating
                          ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 active:scale-[0.98]'}`}>
                      {locating ? (
                        <>
                          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10"
                              stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Fetching location...
                        </>
                      ) : (
                        <>📍 Use My Current Location</>
                      )}
                    </button>
                  </div>
                )}

                {/* Pickup info */}
                {deliveryType === 'pickup' && (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                    <p className="text-xs font-bold text-blue-700 mb-1">🏃 Self Pickup</p>
                    <p className="text-blue-600 text-sm font-medium">{restaurant.address}</p>
                    <p className="text-blue-500 text-xs mt-1">
                      Your order will be ready — we'll confirm via WhatsApp
                    </p>
                  </div>
                )}

                {/* Special note */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                    📝 Special Instructions <span className="text-gray-300 font-normal">(optional)</span>
                  </label>
                  <textarea name="note" placeholder="Less spicy, extra sauce, no onions..."
                    value={details.note} onChange={onChange} rows={2}
                    className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl
                               text-sm placeholder-gray-400 focus:outline-none focus:ring-2
                               focus:ring-orange-200 focus:border-primary transition-all resize-none" />
                </div>
              </div>

              {/* Right — order summary */}
              <div className="md:col-span-2 mt-3 md:mt-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:sticky md:top-24">
                  <h2 className="font-semibold text-gray-800 text-sm mb-3">Order Summary</h2>
                  <div className="space-y-2 text-xs text-gray-600 mb-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.qty}× {item.name}</span>
                        <span>₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-gray-900 text-sm">
                    <span>Total</span>
                    <span className="text-primary">₹{finalTotal}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400 text-center">
                    {deliveryType === 'delivery' ? '🛵 Home Delivery' : '🏃 Self Pickup'}
                  </div>

                  <button onClick={handleDetailsNext}
                    className="mt-4 w-full bg-primary hover:bg-orange-600 text-white
                               font-bold py-3.5 rounded-xl transition-all active:scale-[0.98]
                               flex items-center justify-center gap-2 text-sm shadow-sm shadow-primary/20">
                    Continue to Payment →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════
              STEP 2 — PAYMENT
          ══════════════════════════════════════════ */}
          {step === 2 && (
            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="md:col-span-3 space-y-3">

                {/* Payment options */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                    💳 Select Payment Method
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        key: 'cash',
                        icon: '💵',
                        label: 'Cash on Delivery',
                        sub: 'Pay when your order arrives',
                        badge: 'Most Popular',
                        badgeColor: 'bg-green-100 text-green-700'
                      },
                      {
                        key: 'upi',
                        icon: '📱',
                        label: 'UPI / Online Payment',
                        sub: 'GPay, PhonePe, Paytm & more',
                        badge: 'Instant',
                        badgeColor: 'bg-blue-100 text-blue-700'
                      },
                    ].map(opt => (
                      <button key={opt.key} onClick={() => setPayment(opt.key)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2
                                    transition-all active:scale-[0.98] text-left
                          ${payment === opt.key
                            ? 'border-primary bg-orange-50'
                            : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                                         text-xl shrink-0 ${payment === opt.key ? 'bg-white' : 'bg-white'}`}>
                          {opt.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className={`font-bold text-sm ${payment === opt.key ? 'text-primary' : 'text-gray-800'}`}>
                              {opt.label}
                            </p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${opt.badgeColor}`}>
                              {opt.badge}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs mt-0.5">{opt.sub}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center
                          ${payment === opt.key ? 'border-primary' : 'border-gray-300'}`}>
                          {payment === opt.key && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* UPI note */}
                  {payment === 'upi' && (
                    <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                      <p className="text-blue-700 text-xs font-medium">
                        📱 After placing order, we'll send you the UPI payment link on WhatsApp.
                      </p>
                    </div>
                  )}
                </div>

                {/* Order review */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                    🧾 Order Review
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.qty}× {item.name}</span>
                        <span className="font-semibold text-gray-800">₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-100 space-y-1.5 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{totals.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Delivery</span>
                      <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
                        {deliveryFee > 0 ? `₹${deliveryFee}` : 'FREE'}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-100">
                      <span>Total to Pay</span>
                      <span className="text-primary text-base">₹{finalTotal}</span>
                    </div>
                  </div>

                  {/* Customer summary */}
                  <div className="mt-3 bg-gray-50 rounded-xl p-3 space-y-1">
                    <p className="text-xs text-gray-500">
                      👤 <span className="font-semibold text-gray-700">{details.name}</span>
                      &nbsp;·&nbsp; 📞 {details.phone}
                    </p>
                    {deliveryType === 'delivery' && details.address && (
                      <p className="text-xs text-gray-500">
                        📍 {details.address}
                      </p>
                    )}
                    {deliveryType === 'pickup' && (
                      <p className="text-xs text-gray-500">🏃 Self Pickup</p>
                    )}
                    {payment && (
                      <p className="text-xs text-gray-500">
                        💳 {payment === 'cash' ? 'Cash on Delivery' : 'UPI / Online'}
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Right — place order */}
              <div className="md:col-span-2 mt-3 md:mt-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:sticky md:top-24">
                  <div className="text-center mb-4">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center
                                    justify-center text-3xl mx-auto mb-2">
                      📲
                    </div>
                    <p className="font-bold text-gray-900 text-sm">Ready to order?</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Your order goes directly to our WhatsApp
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 mb-4 text-center">
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">₹{finalTotal}</p>
                    <p className="text-xs text-gray-400">
                      {payment === 'cash' ? '💵 Pay on delivery' :
                       payment === 'upi'  ? '📱 UPI link via WhatsApp' : ''}
                    </p>
                  </div>

                  <button onClick={handlePlaceOrder}
                    disabled={!payment}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-200
                               disabled:text-gray-400 disabled:cursor-not-allowed text-white
                               font-bold py-4 rounded-xl transition-all active:scale-[0.98]
                               flex items-center justify-center gap-2 text-sm md:text-base
                               shadow-lg shadow-green-500/20">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Place Order via WhatsApp
                  </button>

                  <p className="text-[11px] text-gray-400 text-center mt-3">
                    We'll confirm your order within minutes 🎉
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}