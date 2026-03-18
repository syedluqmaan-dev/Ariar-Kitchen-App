import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { restaurant } from '../data/restaurantConfig'

export default function Navbar() {
  const { itemCount } = useCart()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { name: 'Home',  path: '/' },
    { name: 'Menu',  path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    
  ]

  return (
    <>
      {/* ── Promo banner ─────────────────────────────── */}
      <div className="bg-secondary text-white text-center py-2 px-4 text-xs sm:text-sm">
        <span className="opacity-80">🍽️ Own a restaurant?</span>{' '}
        <a
          href={`https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent('Hi! I saw the Ariar Kitchen demo and want the same for my restaurant!')}`}
          target="_blank" rel="noopener noreferrer"
          className="font-bold text-primary underline underline-offset-2 hover:text-orange-400 transition-colors"
        >
          Get your own site →
        </a>
      </div>

      {/* ── Main nav ─────────────────────────────────── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 border-b
        ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-gray-200' : 'bg-white border-gray-100'}`}>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-primary rounded-xl flex items-center justify-center
                              text-white font-display font-bold text-xl shadow-sm shrink-0
                              group-hover:rotate-6 transition-transform duration-200">
                A
              </div>
              <div className="leading-tight min-w-0">
                <span className="font-display font-bold text-secondary text-base md:text-lg tracking-tight block truncate">
                  Ariar Kitchen
                </span>
                <a
                  href="https://www.ariartech.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-[11px] text-gray-500 flex items-center gap-1 -mt-0.5 w-fit hover:text-primary transition-colors"
                >
                  by <span className="text-primary font-semibold">Ariar Technology</span>
                  <span className="text-primary">↗</span>
                </a>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Cart + CTA + Hamburger */}
            <div className="flex items-center gap-2">
              {/* Desktop CTA */}
              <a href={`https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent('Hi! I want a website like Ariar Kitchen!')}`}
                target="_blank" rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 bg-primary text-white text-sm font-semibold
                           px-4 py-2 rounded-full hover:bg-orange-600 transition-colors shadow-sm shadow-primary/20">
                <span>Get yours</span>
                <span>→</span>
              </a>

              {/* Cart icon */}
              <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors group">
                <svg className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] h-[18px]
                                   bg-primary text-white text-[10px] font-bold rounded-full
                                   flex items-center justify-center animate-fade-in px-0.5">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Hamburger — mobile only */}
              <button onClick={() => setMenuOpen(o => !o)}
                className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile dropdown menu ──────────────────── */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white animate-slide-up">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-50'}`}>
                  {link.name}
                  {link.path === '/menu' && (
                    <span className="ml-auto text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">Order</span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="px-4 pb-4">
              <a href={`https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent('Hi! I want a website like Ariar Kitchen for my restaurant!')}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-white
                           font-semibold py-3 px-4 rounded-xl text-sm hover:bg-orange-600 transition-colors">
                🍽️ Get Your Restaurant Website
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}