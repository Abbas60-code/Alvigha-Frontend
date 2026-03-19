import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#3d0a0a] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-[120px] md:text-[180px] font-serif font-bold text-brand-red leading-none drop-shadow-[0_0_30px_rgba(89,0,0,0.5)]">
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-serif text-white mb-4 tracking-widest uppercase">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back to our delicious menu.
        </p>
        <Link 
          to="/"
          className="inline-block bg-brand-red hover:bg-red-800 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(89,0,0,0.4)] cursor-pointer"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
