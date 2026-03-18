import { restaurant } from '../data/restaurantConfig'

const formatCurrency = amount => `₹${amount.toLocaleString('en-IN')}`

const generateOrderId = () => {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `AK${num}`
}

const getFormattedTime = () => {
  const now = new Date()
  return now.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).replace(',', ',')
}

export function sendOrderToWhatsApp(cart, details, totals) {
  const { name, phone, address, note, deliveryType, payment } = details

  const orderId = generateOrderId()
  const time = getFormattedTime()

  const orderLines = cart
    .map((item, i) =>
      `${i + 1}. ${item.name}\n   ${item.qty} × ${formatCurrency(item.price)} = ${formatCurrency(item.price * item.qty)}`
    )
    .join('\n')

  const paymentLabel = payment === 'cash' ? 'Cash on Delivery' : 'UPI / Online'

  const lines = [
    `🍽️ *NEW ORDER - ${restaurant.name}*`,
    `🆔 Order ID: ${orderId}`,
    `🕒 Time: ${time}`,
    `━━━━━━━━━━━━━━━━━━━`,
    `👤 *CUSTOMER*`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `📦 *DELIVERY*`,
    `Type: ${deliveryType === 'pickup' ? 'Self Pickup 🏃' : 'Home Delivery 🛵'}`,
    deliveryType === 'delivery'
      ? `Address:\n${address}`
      : null,
    `━━━━━━━━━━━━━━━━━━━`,
    `🛒 *ORDER ITEMS*`,
    orderLines,
    `━━━━━━━━━━━━━━━━━━━`,
    `💰 *BILL SUMMARY*`,
    `Subtotal: ${formatCurrency(totals.subtotal)}`,
    `Delivery: ${deliveryType === 'pickup' ? 'FREE (Self Pickup)' : formatCurrency(totals.deliveryFee)}`,
    `*TOTAL: ${formatCurrency(totals.total)}*`,
    `💳 *PAYMENT*`,
    `Method: ${paymentLabel}`,
    note ? `📝 *INSTRUCTIONS*\n${note}` : null,
    `━━━━━━━━━━━━━━━━━━━`,
    `⚡ ${restaurant.name} | Powered by Ariar Technology`,
  ].filter(line => line !== null).join('\n')

  const url = `https://wa.me/91${restaurant.whatsappNumber}?text=${encodeURIComponent(lines)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}