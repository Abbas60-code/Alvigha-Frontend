import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PiShoppingCartSimpleFill, PiListBold, PiUserCircleBold, PiSignOutBold } from "react-icons/pi";
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { setIsCartOpen, cartCount } = useCart();
  const { setIsMenuOpen } = useMenu();
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem('userInfo');
      if (stored) {
        setUserInfo(JSON.parse(stored));
      } else {
        setUserInfo(null);
      }
    };
    
    checkAuth();
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.dispatchEvent(new Event('authChange'));
    setUserInfo(null);
    setDropdownOpen(false);
    navigate('/login');
  };

  // Get first name only
  const firstName = userInfo?.fullName?.split(' ')[0] || '';

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
        
        {/* User Section */}
        <div className="relative" ref={dropdownRef}>
          {userInfo ? (
            /* Logged In: Show name with dropdown */
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 sm:gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-2 sm:px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <PiUserCircleBold size={20} className="text-brand-accent" />
              <span className="inline text-sm font-semibold text-brand-accent">
                {firstName}
              </span>
            </button>
          ) : (
            /* Not Logged In: Show icon link */
            <Link
              to="/login"
              className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Login / Register"
            >
              <PiUserCircleBold size={26} className="text-gray-300" />
            </Link>
          )}

          {/* Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen && userInfo && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 bg-black/95 border border-white/10 rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-xs text-gray-400">Logged in as</p>
                  <p className="text-sm font-bold text-brand-accent truncate">{userInfo.fullName}</p>
                  <p className="text-xs text-gray-500 truncate">{userInfo.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 transition-colors cursor-pointer"
                >
                  <PiSignOutBold size={16} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
