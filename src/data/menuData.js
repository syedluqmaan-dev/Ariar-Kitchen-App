// ─────────────────────────────────────────────────────────
// Menu Data — Ariar Kitchen
// ─────────────────────────────────────────────────────────

export const menu = [
  // Burgers
  { id: 1, name: "Classic Chicken Burger", price: 120, category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", description: "Grilled chicken patty with lettuce, tomato, and our special sauce", popular: true, veg: false },
  { id: 2, name: "Spicy Zinger Burger",    price: 150, category: "Burgers", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400", description: "Crispy spicy chicken with jalapeños and spicy mayo", popular: true, veg: false },
  { id: 3, name: "Veg Supreme Burger",     price: 110, category: "Burgers", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400", description: "Crispy veg patty with cheese, lettuce, and tomato", popular: true, veg: true },

  // Pizza
  { id: 4, name: "Margherita Pizza", price: 200, category: "Pizza", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400", description: "Classic cheese pizza with tomato sauce and oregano", popular: true, veg: true },
  { id: 5, name: "Pepperoni Pizza",  price: 280, category: "Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400", description: "Loaded with pepperoni and extra mozzarella cheese", popular: true, veg: false },

  // Drinks
  { id: 6, name: "Coca-Cola",       price: 40, category: "Drinks", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400", description: "330ml chilled can", popular: true, veg: true },
  { id: 7, name: "Fresh Lime Soda", price: 50, category: "Drinks", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400", description: "Fresh lime with soda — sweet or salted", popular: false, veg: true },

  // Starters
  { id: 8, name: "Chicken Wings (6 pcs)", price: 180, category: "Starters", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400", description: "Spicy grilled chicken wings served with dipping sauce", popular: true, veg: false },
  { id: 9, name: "French Fries",         price: 80,  category: "Starters", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=400", description: "Crispy golden fries with seasoning salt", popular: true, veg: true },
]

// Get unique categories in order
export const getCategories = () => [...new Set(menu.map(item => item.category))]

// Get items filtered by category
export const getItemsByCategory = (category) => menu.filter(item => item.category === category)