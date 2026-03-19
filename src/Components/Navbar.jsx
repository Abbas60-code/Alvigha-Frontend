import React from 'react';
import { Link } from 'react-router-dom';
import { PiShoppingCartSimpleFill, PiListBold } from "react-icons/pi";
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';

export default function Navbar() {
  const { setIsCartOpen, cartCount } = useCart();
  const { setIsMenuOpen } = useMenu();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 text-white backdrop-blur-sm px-3 md:px-4 py-2 flex items-center justify-between font-sans border-b border-white/10 h-[52px] md:h-16">
      
      {/* Brand Logo */}
      <Link to="/" className="flex items-center hover:opacity-80 transition-opacity cursor-pointer">
        <span className="text-brand-red font-serif text-2xl md:text-3xl font-bold italic tracking-tighter">Alvigha</span>
      </Link>

      {/* Marquee or Delivery Timings */}
      <div className="hidden md:flex flex-col items-center flex-1 max-w-2xl mx-auto opacity-80 text-xs text-center font-medium tracking-wide">
        <p>Gulshan Branch Open Timing From 6:00PM To 12:30AM - SMCHS Branch Open Timing From 6:00PM To 04:00AM.</p>
        <div className="mt-1 bg-white/20 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest border border-white/30">
          Delivery Excelling
        </div>
      </div>

      {/* Actions (Cart & Menu) */}
      <div className="flex items-center gap-2">
        {/* Cart Button */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-1 md:gap-2 bg-white/10 hover:bg-white/20 transition-colors px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 text-xs md:text-sm font-semibold cursor-pointer"
        >
          <PiShoppingCartSimpleFill className="text-lg text-gray-300" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {cartCount}
            </span>
          )}
        </button>

        {/* Hamburger Menu */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
        >
          <PiListBold size={24} className="text-gray-300" />
        </button>
      </div>

    </nav>
  );
}
