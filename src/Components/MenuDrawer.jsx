import React from 'react';
import { useMenu } from '../context/MenuContext';
import { PiXBold } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';

import { Link } from 'react-router-dom';

export default function MenuDrawer() {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Transparent Backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-80 bg-black z-[80] shadow-[-10px_0_30px_rgba(0,0,0,0.9)] flex flex-col pt-6 px-6 font-sans cursor-default border-l border-white/10"
          >
            {/* Close Button Header */}
            <div className="flex justify-end mb-10 text-white">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-red-500 transition-colors cursor-pointer"
              >
                <PiXBold size={28} />
              </button>
            </div>

            {/* Menu Links aligned to alvigha.com styling */}
            <div className="flex flex-col gap-4">
              
              <Link 
                to="/ballroom"
                className="w-full bg-transparent border border-white text-white font-bold tracking-widest uppercase py-3 rounded-full hover:bg-white hover:text-black transition-colors text-sm cursor-pointer text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Ballroom Booking
              </Link>
              
              <Link 
                to="/about"
                className="w-full bg-white text-black font-bold tracking-widest uppercase py-3 rounded-full hover:bg-gray-200 transition-colors text-sm cursor-pointer text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              <Link 
                to="/contact"
                className="w-full bg-white text-black font-bold tracking-widest uppercase py-3 rounded-full hover:bg-gray-200 transition-colors text-sm cursor-pointer text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
