import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { restaurant } from '../data/restaurantConfig';
import { sendOrderToWhatsApp } from '../utils/whatsappOrderGenerator';
import CartItem from '../components/CartItem';
import toast from 'react-hot-toast';

const STEPS = ['Cart', 'Details', 'Payment'];

// --- Field Component (Moved outside for performance) ---
const Field = ({ name, label, type = 'text', placeholder, maxLength, required, value, onChange, onBlur, touched, error }) => (
  <div>
    <label className="text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1 block">
      {label}
      {required && <span className="text-red-500 text-sm leading-none">*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      maxLength={maxLength}
      className={`w-full px-3.5 py-3 bg-gray-50 border rounded-xl text-sm
                 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all
                 ${touched && error
                   ? 'border-red-300 focus:ring-red-100 bg-red-50'
                   : 'border-gray-200 focus:ring-orange-200 focus:border-primary'}`}
    />
    {touched && error && (
      <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
        <span>⚠️</span> {error}
      </p>
    )}
  </div>
);
// --- End Field Component ---

export default function Cart() {
  const { cart, totals, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [payment, setPayment] = useState('');
  const [details, setDetails] = useState({ name: '', phone: '', address: '', note: '' });
  const [locating, setLocating] = useState(false);
  const [touched, setTouched] = useState({});

  const onChange = e => {
    setDetails(p => ({ ...p, [e.target.name]: e.target.value }));
    setTouched(p => ({ ...p, [e.target.name]: true }));
  };
  const onBlur = e => setTouched(p => ({ ...p, [e.target.name]: true }));

  // Safely calculate totals with fallbacks
  const safeSubtotal = totals?.subtotal ?? 0;
  const safeDeliveryFee = totals?.deliveryFee ?? 0;
  const finalTotal = deliveryType === 'pickup' ? safeSubtotal : (totals?.total ?? safeSubtotal + safeDeliveryFee);
  const deliveryFee = deliveryType === 'pickup' ? 0 : safeDeliveryFee;

  // field errors
  const errors = {
    name: !details.name.trim() ? 'Name is required' : '',
    phone: !/^\d{10}$/.test(details.phone.trim()) ? 'Enter valid 10-digit number' : '',
    address: deliveryType === 'delivery' && !details.address.trim() ? 'Address is required' : '',
  };
  const hasErrors = Object.values(errors).some(Boolean);

  // ── GPS ──────────────────────────────────────────
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      return;
    }
    setLocating(true);
    toast('Fetching your location...', { icon: '📍' });

    // Safety timeout to reset loading state if something fails
    const safetyTimeout = setTimeout(() => {
      if (locating) {
        setLocating(false);
        toast.error('Location request timed out. Please try again.');
      }
    }, 15000);

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        clearTimeout(safetyTimeout);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          const a = data.address;
          const parts = [
            a.house_number, a.road || a.pedestrian,
            a.neighbourhood || a.suburb,
            a.city || a.town || a.village,
            a.state, a.postcode
          ].filter(Boolean);
          setDetails(p => ({ ...p, address: parts.join(', ') }));
          setTouched(p => ({ ...p, address: true }));
          toast.success('Location fetched!');
        } catch {
          setDetails(p => ({ ...p, address: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}` }));
          toast.success('Location fetched (approx coordinates)');
        } finally {
          setLocating(false);
        }
      },
      err => {
        clearTimeout(safetyTimeout);
        setLocating(false);
        const msgs = { 1: 'Permission denied.', 2: 'Location unavailable.', 3: 'Request timed out.' };
        toast.error(msgs[err.code] || 'Could not get location.');
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleDetailsNext = () => {
    // touch all fields to show errors
    setTouched({ name: true, phone: true, address: true });
    if (hasErrors) return toast.error('Please fill all required fields');
    if (!(totals?.minOrderMet ?? false)) return toast.error(`Minimum order ₹${restaurant.minOrderAmount}`);
    setStep(2);
  };

  const handlePlaceOrder = () => {
    if (!payment) return toast.error('Please select a payment method');
    sendOrderToWhatsApp(cart, { ...details, deliveryType, payment }, { ...totals, deliveryFee, total: finalTotal });
    toast.success('Opening WhatsApp...');
  };

  // ── Step bar ─────────────────────────────────────
  const StepBar = () => (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all
            ${i === step ? 'bg-primary text-white shadow-sm' :
              i < step ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            {i < step ? '✓' : i + 1} {s}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-6 h-px mx-1 ${i < step ? 'bg-green-300' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  // ── Empty cart ───────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-xs">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-5xl mx-auto mb-4">🛒</div>
          <h2 className="font-display font-bold text-gray-900 text-2xl mb-2">Cart is empty</h2>
          <p className="text-gray-500 text-sm mb-6">Add some delicious items to get started!</p>
          <Link to="/menu"
            className="inline-block bg-primary text-white font-bold py-3 px-8
                       rounded-xl hover:bg-orange-600 transition-colors active:scale-95">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-2xl mx-auto md:max-w-4xl">

        {/* ── Header ──────────────────────────────── */}
        <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3 sticky top-0 z-20 shadow-sm">
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100
                         hover:bg-gray-200 text-gray-600 transition-colors text-lg">
              ←
            </button>
          ) : (
            <Link to="/menu"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100
                         hover:bg-gray-200 text-gray-600 transition-colors text-lg">
              ←
            </Link>
          )}
          <div>
            <h1 className="font-display font-bold text-gray-900 text-lg leading-none">
              {step === 0 ? 'Your Cart' : step === 1 ? 'Delivery Details' : 'Payment'}
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} · ₹{finalTotal.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="px-4 pt-5 md:px-6">
          <StepBar />

          {/* ══════════════════════════════════════
              STEP 0 — CART
          ══════════════════════════════════════ */}
          {step === 0 && (
            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="md:col-span-3 space-y-4">

                {/* Delivery toggle */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Order Type</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'delivery', icon: '🛵', label: 'Home Delivery', sub: `+₹${safeDeliveryFee} fee` },
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
                      className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors flex items-center gap-1">
                      🗑 Clear all
                    </button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {cart.map(item => <CartItem key={item.id} item={item} />)}
                  </div>
                </div>
              </div>

              {/* Bill summary */}
              <div className="md:col-span-2 mt-4 md:mt-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:sticky md:top-24">
                  <h2 className="font-semibold text-gray-800 text-sm mb-3">Bill Summary</h2>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Item Total</span><span>₹{safeSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
                        {deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : 'FREE'}
                      </span>
                    </div>
                    {deliveryType === 'pickup' && safeDeliveryFee > 0 && (
                      <div className="bg-green-50 rounded-xl px-3 py-2 text-green-700 text-xs font-medium">
                        🎉 You save ₹{safeDeliveryFee.toFixed(2)} with self pickup!
                      </div>
                    )}
                    <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-primary text-base">₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {!(totals?.minOrderMet ?? false) && (
                    <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
                      <p className="text-amber-700 text-xs font-medium">
                        ⚠️ Add ₹{restaurant.minOrderAmount - safeSubtotal} more for minimum order
                      </p>
                    </div>
                  )}

                  <button onClick={() => setStep(1)} disabled={!(totals?.minOrderMet ?? false)}
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

          {/* ══════════════════════════════════════
              STEP 1 — DETAILS
          ══════════════════════════════════════ */}
          {step === 1 && (
            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="md:col-span-3 space-y-4">

                {/* Required fields notice */}
                <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5
                                flex items-center gap-2">
                  <span className="text-orange-500 text-sm">ℹ️</span>
                  <p className="text-orange-700 text-xs font-medium">
                    Fields marked with <span className="text-red-500 font-bold">*</span> are required to place your order
                  </p>
                </div>

                {/* Name */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <Field
                    name="name"
                    label="👤 Your Name"
                    placeholder="e.g. Ahmed Khan"
                    required
                    value={details.name}
                    onChange={onChange}
                    onBlur={onBlur}
                    touched={touched.name}
                    error={errors.name}
                  />
                </div>

                {/* Phone */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <Field
                    name="phone"
                    label="📞 Phone Number"
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    required
                    value={details.phone}
                    onChange={onChange}
                    onBlur={onBlur}
                    touched={touched.phone}
                    error={errors.phone}
                  />
                </div>

                {/* Address */}
                {deliveryType === 'delivery' ? (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-2">
                    <label className="text-xs font-bold text-gray-600 flex items-center gap-1">
                      📍 Delivery Address
                      <span className="text-red-500 text-sm leading-none">*</span>
                    </label>
                    <textarea name="address" placeholder="House no, Street, Area, City..."
                      value={details.address} onChange={onChange} onBlur={onBlur} rows={3}
                      className={`w-full px-3.5 py-3 bg-gray-50 border rounded-xl text-sm
                                 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none
                                 ${touched.address && errors.address
                                   ? 'border-red-300 focus:ring-red-100 bg-red-50'
                                   : 'border-gray-200 focus:ring-orange-200 focus:border-primary'}`} />
                    {touched.address && errors.address && (
                      <p className="text-red-500 text-[11px] flex items-center gap-1">
                        ⚠️ {errors.address}
                      </p>
                    )}
                    <button onClick={handleUseLocation} disabled={locating}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                                  border text-xs font-semibold transition-all
                        ${locating
                          ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 active:scale-[0.98]'}`}>
                      {locating ? (
                        <>
                          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Fetching location...
                        </>
                      ) : <>📍 Use My Current Location</>}
                    </button>
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                    <p className="text-xs font-bold text-blue-700 mb-1">🏃 Self Pickup</p>
                    <p className="text-blue-600 text-sm font-medium">{restaurant?.address ?? 'Address not provided'}</p>
                    <p className="text-blue-500 text-xs mt-1">
                      Your order will be ready — we'll confirm via WhatsApp
                    </p>
                  </div>
                )}

                {/* Special note */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <label className="text-xs font-bold text-gray-600 mb-1.5 block">
                    📝 Special Instructions
                    <span className="text-gray-400 font-normal ml-1">(optional)</span>
                  </label>
                  <textarea name="note" placeholder="Less spicy, extra sauce, call before delivery..."
                    value={details.note} onChange={onChange} rows={2}
                    className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                               placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-200
                               focus:border-primary transition-all resize-none" />
                </div>

              </div>

              {/* Order summary */}
              <div className="md:col-span-2 mt-4 md:mt-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:sticky md:top-24">
                  <h2 className="font-semibold text-gray-800 text-sm mb-3">Order Summary</h2>
                  <div className="space-y-2 text-xs text-gray-600 mb-3">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.qty}× {item.name}</span>
                        <span className="font-semibold text-gray-800">₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-gray-900 text-sm">
                    <span>Total</span>
                    <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400 text-center">
                    {deliveryType === 'delivery' ? '🛵 Home Delivery' : '🏃 Self Pickup'}
                  </div>

                  <button onClick={handleDetailsNext}
                    className="mt-4 w-full bg-primary hover:bg-orange-600 text-white font-bold
                               py-3.5 rounded-xl transition-all active:scale-[0.98]
                               flex items-center justify-center gap-2 text-sm shadow-sm shadow-primary/20">
                    Continue to Payment →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════
              STEP 2 — PAYMENT
          ══════════════════════════════════════ */}
          {step === 2 && (
            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="md:col-span-3 space-y-4">

                {/* Order items table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50">
                    <h2 className="font-semibold text-gray-800 text-sm">🧾 Order Review</h2>
                  </div>
                  <div className="px-4 py-3 space-y-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-medium text-gray-800">{item.name}</span>
                          <span className="text-gray-400 text-xs ml-2">× {item.qty}</span>
                        </div>
                        <span className="font-semibold text-gray-800">₹{item.price * item.qty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 pb-3 space-y-1.5 border-t border-gray-50 pt-3">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Subtotal</span><span>₹{safeSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Delivery</span>
                      <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : ''}>
                        {deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : 'FREE'}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 text-sm pt-1 border-t border-gray-100">
                      <span>Total to Pay</span>
                      <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Customer info summary */}
                  <div className="mx-4 mb-4 bg-gray-50 rounded-xl p-3 space-y-1">
                    <p className="text-xs text-gray-500">
                      👤 <span className="font-semibold text-gray-700">{details.name || 'Not provided'}</span>
                      &nbsp;·&nbsp; 📞 {details.phone || 'Not provided'}
                    </p>
                    {deliveryType === 'delivery' && details.address && (
                      <p className="text-xs text-gray-500">📍 {details.address}</p>
                    )}
                    {deliveryType === 'pickup' && (
                      <p className="text-xs text-gray-500">🏃 Self Pickup</p>
                    )}
                  </div>

                  {/* ── Payment options BELOW order list ── */}
                  <div className="px-4 pb-4 border-t border-gray-50 pt-4">
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
                          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shrink-0 shadow-sm">
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
                            {payment === opt.key && <div className="w-2 h-2 rounded-full bg-primary" />}
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
                </div>

              </div>

              {/* Place order */}
              <div className="md:col-span-2 mt-4 md:mt-0">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:sticky md:top-24">
                  <div className="text-center mb-4">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2">
                      📲
                    </div>
                    <p className="font-bold text-gray-900 text-sm">Ready to order?</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Your order goes directly to our WhatsApp
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 mb-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">₹{finalTotal.toFixed(2)}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {payment === 'cash' ? '💵 Pay on delivery' :
                       payment === 'upi'  ? '📱 UPI link via WhatsApp' :
                       '← Select payment method'}
                    </p>
                  </div>

                  <button onClick={handlePlaceOrder} disabled={!payment}
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
  );
}