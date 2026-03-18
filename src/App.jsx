import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import FloatingCart from './components/FloatingCart'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'

import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/"      element={<Home />} />
            <Route path="/menu"  element={<Menu />} />
            <Route path="/cart"  element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
           
          </Routes>
          <FloatingCart />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: {
                background: '#1A1A2E',
                color: '#fff',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
                padding: '12px 16px',
              },
              success: { iconTheme: { primary: '#FF6B35', secondary: '#fff' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </div>
      </CartProvider>
    </Router>
  )
}

export default App