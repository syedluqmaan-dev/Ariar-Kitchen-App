import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { restaurant } from '../data/restaurantConfig';
import { sendOrderToWhatsApp } from '../utils/whatsappOrderGenerator';
import CartItem from '../components/CartItem';
import toast from 'react-hot-toast';

// ── Inline Field ──────────────────────────────────────────────────────────────
const Field = ({ name, label, type = 'text', placeholder, maxLength, required, value, onChange, onBlur, touched, error }) => (
  <div className="space-y-1">
    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      maxLength={maxLength}
      className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold text-gray-900
                 placeholder-gray-300 outline-none transition-all border-2
                 ${touched && error
                   ? 'border-red-400 bg-red-50'
                   : 'border-transparent bg-gray-100 focus:border-orange-400 focus:bg-white'}`}
    />
    {touched && error && (
      <p className="text-red-500 text-[11px] font-semibold flex items-center gap-1">⚠ {error}</p>
    )}
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Cart() {
  const { cart, totals, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [payment, setPayment]           = useState('');
  const [details, setDetails]           = useState({ name: '', phone: '', address: '', note: '' });
  const [locating, setLocating]         = useState(false);
  const [touched, setTouched]           = useState({});
  const safetyTimerRef                  = useRef(null);

  const onChange = e => {
    setDetails(p => ({ ...p, [e.target.name]: e.target.value }));
    setTouched(p => ({ ...p, [e.target.name]: true }));
  };
  const onBlur = e => setTouched(p => ({ ...p, [e.target.name]: true }));

  // ── Totals ────────────────────────────────────────────────────────────────
  const safeSubtotal    = totals?.subtotal   ?? 0;
  const safeDeliveryFee = totals?.deliveryFee ?? 0;
  const deliveryFee     = deliveryType === 'pickup' ? 0 : safeDeliveryFee;
  const finalTotal      = deliveryType === 'pickup'
    ? safeSubtotal
    : (totals?.total ?? safeSubtotal + safeDeliveryFee);

  // ── Validation ────────────────────────────────────────────────────────────
  const errors = {
    name:    !details.name.trim()                               ? 'Name is required'            : '',
    phone:   !/^\d{10}$/.test(details.phone.trim())            ? 'Enter valid 10-digit number'  : '',
    address: deliveryType === 'delivery' && !details.address.trim() ? 'Address is required'     : '',
  };
  const hasErrors = Object.values(errors).some(Boolean);

  // ── GPS ───────────────────────────────────────────────────────────────────
  const handleUseLocation = () => {
    if (!navigator.geolocation) return toast.error('Geolocation not supported');
    setLocating(true);
    toast('Fetching your location...', { icon: '📍' });
    safetyTimerRef.current = setTimeout(() => {
      setLocating(prev => {
        if (prev) toast.error('Location request timed out.');
        return false;
      });
    }, 15000);

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        clearTimeout(safetyTimerRef.current);
        try {
          const res  = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          const a    = data.address;
          const parts = [
            a.house_number, a.road || a.pedestrian,
            a.neighbourhood || a.suburb,
            a.city || a.town || a.village,
            a.state, a.postcode,
          ].filter(Boolean);
          setDetails(p => ({ ...p, address: parts.join(', ') }));
          setTouched(p => ({ ...p, address: true }));
          toast.success('Location fetched!');
        } catch {
          setDetails(p => ({ ...p, address: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}` }));
          toast.success('Location fetched (approx)');
        } finally { setLocating(false); }
      },
      err => {
        clearTimeout(safetyTimerRef.current);
        setLocating(false);
        const msgs = { 1: 'Permission denied.', 2: 'Location unavailable.', 3: 'Timed out.' };
        toast.error(msgs[err.code] || 'Could not get location.');
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  // ── Place order ───────────────────────────────────────────────────────────
  const handlePlaceOrder = () => {
    setTouched({ name: true, phone: true, address: true });
    if (hasErrors)                        return toast.error('Please fill all required fields');
    if (!(totals?.minOrderMet ?? false))  return toast.error(`Minimum order ₹${restaurant.minOrderAmount}`);
    if (!payment)                         return toast.error('Select a payment method');
    sendOrderToWhatsApp(cart, { ...details, deliveryType, payment }, { ...totals, deliveryFee, total: finalTotal });
    toast.success('Opening WhatsApp...');
  };

  // ── Empty cart ────────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-7xl mb-4">🛒</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 text-sm mb-6">Add something delicious first!</p>
          <Link to="/menu"
            className="inline-block bg-orange-500 text-white font-black py-3.5 px-8
                       rounded-2xl hover:bg-orange-600 transition-colors active:scale-95 text-sm">
            Browse Menu →
          </Link>
        </div>
      </div>
    );
  }

  // ── Main ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-30 bg-white border-b-2 border-gray-100 px-4 py-3.5 flex items-center gap-3">
        <Link to="/menu"
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100
                     hover:bg-gray-200 text-gray-700 font-bold text-lg transition-colors">
          ←
        </Link>
        <div className="flex-1">
          <h1 className="font-black text-gray-900 text-base leading-none">Your Order</h1>
          <p className="text-gray-400 text-xs mt-0.5 font-medium">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-orange-500 font-black text-lg leading-none">₹{finalTotal.toFixed(0)}</p>
          <p className="text-gray-400 text-[10px] font-semibold mt-0.5 uppercase tracking-wide">Total</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-5 pb-40 space-y-3">

        {/* ── SECTION 1: Delivery Type ── */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100">
          <div className="px-4 pt-4 pb-3">
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">
              How do you want it?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'delivery', icon: '🛵', label: 'Delivery',  sub: `+₹${safeDeliveryFee} fee` },
                { key: 'pickup',   icon: '🏃', label: 'Pickup',    sub: 'Free · No wait'           },
              ].map(opt => (
                <button key={opt.key} onClick={() => setDeliveryType(opt.key)}
                  className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl border-2 font-bold
                              text-sm transition-all active:scale-95
                    ${deliveryType === opt.key
                      ? 'border-orange-400 bg-orange-50 text-orange-600'
                      : 'border-gray-100 bg-gray-50 text-gray-500'}`}>
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-xs font-black">{opt.label}</span>
                  <span className={`text-[10px] font-semibold
                    ${deliveryType === opt.key && opt.key === 'pickup' ? 'text-green-600' : 'text-gray-400'}`}>
                    {opt.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 2: Cart Items ── */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100">
          <div className="px-4 pt-4 flex items-center justify-between">
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Items</p>
            <button onClick={clearCart}
              className="text-[11px] text-red-400 hover:text-red-600 font-black uppercase tracking-wide transition-colors">
              Clear all
            </button>
          </div>
          <div className="mt-2 divide-y divide-gray-50">
            {cart.map(item => <CartItem key={item.id} item={item} />)}
          </div>

          {/* Bill rows */}
          <div className="px-4 py-4 border-t-2 border-dashed border-gray-100 space-y-2 mt-1">
            <div className="flex justify-between text-sm text-gray-500 font-semibold">
              <span>Item total</span>
              <span>₹{safeSubtotal.toFixed(0)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-500">Delivery fee</span>
              <span className={deliveryFee === 0 ? 'text-green-600 font-black' : 'text-gray-700'}>
                {deliveryFee > 0 ? `₹${deliveryFee.toFixed(0)}` : 'FREE 🎉'}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t-2 border-gray-900">
              <span>Total</span>
              <span className="text-orange-500">₹{finalTotal.toFixed(0)}</span>
            </div>
          </div>

          {!(totals?.minOrderMet ?? false) && (
            <div className="mx-4 mb-4 bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 py-3">
              <p className="text-amber-700 text-xs font-black">
                ⚠ Add ₹{(restaurant.minOrderAmount - safeSubtotal).toFixed(0)} more to place order
              </p>
            </div>
          )}
        </div>

        {/* ── SECTION 3: Your Details ── */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 px-4 pt-4 pb-5 space-y-4">
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Your Details</p>

          <Field name="name" label="Name" placeholder="Your full name" required
            value={details.name} onChange={onChange} onBlur={onBlur}
            touched={touched.name} error={errors.name} />

          <Field name="phone" label="Phone" type="tel" placeholder="10-digit number" maxLength={10} required
            value={details.phone} onChange={onChange} onBlur={onBlur}
            touched={touched.phone} error={errors.phone} />

          {/* Address or Pickup notice */}
          {deliveryType === 'delivery' ? (
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block">
                Address<span className="text-red-500 ml-0.5">*</span>
              </label>
              <textarea name="address" placeholder="House no, street, area, city..."
                value={details.address} onChange={onChange} onBlur={onBlur} rows={3}
                className={`w-full px-4 py-3.5 rounded-2xl text-sm font-semibold text-gray-900
                           placeholder-gray-300 outline-none transition-all border-2 resize-none
                           ${touched.address && errors.address
                             ? 'border-red-400 bg-red-50'
                             : 'border-transparent bg-gray-100 focus:border-orange-400 focus:bg-white'}`}
              />
              {touched.address && errors.address && (
                <p className="text-red-500 text-[11px] font-semibold">⚠ {errors.address}</p>
              )}
              <button onClick={handleUseLocation} disabled={locating}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl
                            text-xs font-black uppercase tracking-wide transition-all
                  ${locating
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-[0.98]'}`}>
                {locating ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Fetching...
                  </>
                ) : '📍 Use my location'}
              </button>
            </div>
          ) : (
            <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl px-4 py-3">
              <p className="text-xs font-black text-blue-700">🏃 Pickup from</p>
              <p className="text-blue-600 text-sm font-bold mt-0.5">{restaurant?.address ?? 'See address on WhatsApp'}</p>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block">
              Note <span className="text-gray-300 font-semibold normal-case tracking-normal">(optional)</span>
            </label>
            <textarea name="note" placeholder="Less spicy, extra sauce, ring the bell..."
              value={details.note} onChange={onChange} rows={2}
              className="w-full px-4 py-3.5 rounded-2xl text-sm font-semibold text-gray-900
                         placeholder-gray-300 outline-none border-2 border-transparent
                         bg-gray-100 focus:border-orange-400 focus:bg-white transition-all resize-none" />
          </div>
        </div>

        {/* ── SECTION 4: Payment ── */}
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 px-4 pt-4 pb-5">
          <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">Pay with</p>
          <div className="space-y-2">
            {[
              { key: 'cash', icon: '💵', label: 'Cash on Delivery',     sub: 'Pay when it arrives',        badge: 'Popular' },
              { key: 'upi',  icon: '📱', label: 'UPI / Online',          sub: 'GPay, PhonePe, Paytm & more', badge: 'Instant' },
            ].map(opt => (
              <button key={opt.key} onClick={() => setPayment(opt.key)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2
                            transition-all active:scale-[0.98] text-left
                  ${payment === opt.key
                    ? 'border-orange-400 bg-orange-50'
                    : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-xl shrink-0 shadow-sm border border-gray-100">
                  {opt.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-black text-sm ${payment === opt.key ? 'text-orange-600' : 'text-gray-800'}`}>
                      {opt.label}
                    </p>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide
                      ${payment === opt.key ? 'bg-orange-200 text-orange-700' : 'bg-gray-200 text-gray-500'}`}>
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs font-semibold mt-0.5">{opt.sub}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all
                  ${payment === opt.key ? 'border-orange-500' : 'border-gray-300'}`}>
                  {payment === opt.key && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                </div>
              </button>
            ))}
          </div>
          {payment === 'upi' && (
            <div className="mt-3 bg-blue-50 border-2 border-blue-100 rounded-2xl px-4 py-3">
              <p className="text-blue-700 text-xs font-bold">
                📱 We'll send your UPI payment link on WhatsApp after confirming the order.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* ── Sticky Bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-gray-100 px-4 py-4
                      safe-area-inset-bottom shadow-[0_-8px_32px_rgba(0,0,0,0.08)]">
        <div className="max-w-lg mx-auto">
          {/* Mini summary strip */}
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-xs text-gray-400 font-semibold">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} ·{' '}
              {deliveryType === 'delivery' ? '🛵 Delivery' : '🏃 Pickup'}
            </p>
            <p className="text-base font-black text-gray-900">
              ₹{finalTotal.toFixed(0)}
              {payment && (
                <span className="text-xs font-semibold text-gray-400 ml-1">
                  · {payment === 'cash' ? 'Cash' : 'UPI'}
                </span>
              )}
            </p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-500 hover:bg-green-600 text-white
                       font-black py-4 rounded-2xl transition-all active:scale-[0.97]
                       flex items-center justify-center gap-2.5 text-base
                       shadow-lg shadow-green-500/30">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Order on WhatsApp
          </button>
        </div>
      </div>

    </div>
  );
}