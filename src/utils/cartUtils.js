// Cart utility functions
import { restaurant } from '../data/restaurantConfig';

const CART_STORAGE_KEY = 'cart_items';

// Load cart from localStorage
export const getInitialCart = () => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
};

// Save cart to localStorage
export const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

// Calculate totals
export const calculateCartTotal = (cart) => {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const deliveryFee = subtotal >= restaurant.minOrderAmount ? restaurant.deliveryFee : 0;
  
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    minOrderMet: subtotal >= restaurant.minOrderAmount
  };
};

// Add item to cart
export const addToCartUtil = (cart, item) => {
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    return cart.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, qty: cartItem.qty + 1 }
        : cartItem
    );
  }
  
  return [...cart, { id: item.id, name: item.name, price: item.price, qty: 1 }];
};

// Remove item from cart
export const removeFromCartUtil = (cart, itemId) => {
  return cart.filter(item => item.id !== itemId);
};

// Increase quantity
export const increaseQuantityUtil = (cart, itemId) => {
  return cart.map(item =>
    item.id === itemId
      ? { ...item, qty: item.qty + 1 }
      : item
  );
};

// Decrease quantity
export const decreaseQuantityUtil = (cart, itemId) => {
  const item = cart.find(item => item.id === itemId);
  
  if (item && item.qty === 1) {
    return removeFromCartUtil(cart, itemId);
  }
  
  return cart.map(item =>
    item.id === itemId
      ? { ...item, qty: item.qty - 1 }
      : item
  );
};

// Get cart item count
export const getCartItemCount = (cart) => {
  return cart.reduce((count, item) => count + item.qty, 0);
};