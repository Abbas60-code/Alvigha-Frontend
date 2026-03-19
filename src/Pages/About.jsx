import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#3d0a0a] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-brand-red font-serif text-6xl font-bold italic tracking-tighter drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">Alvigha</span>
        </motion.div>

        {/* Content Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black/60 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl text-white"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-center tracking-widest uppercase">About Alvigha</h1>
          <h2 className="text-xl md:text-2xl font-serif italic text-brand-red mb-8 text-center">Our Story</h2>
          
          <div className="space-y-6 text-gray-200 leading-relaxed text-lg font-light tracking-wide text-center md:text-left">
            <p>
              Started back in December 2019, Alvigha began as a passion project to bring authentic, premium Desi flavors to Karachi. Our journey started with a focus on perfection - specifically our signature Mutton Chops and BBQ Platter.
            </p>
            <p>
              When the pandemic hit in 2020, we adapted by offering a unique rooftop dining experience that allowed families to enjoy their favorite meals safely under the stars. This resilience and the love from our customers helped us grow.
            </p>
            <p>
              Today, Alvigha is more than just a restaurant; it's a destination. With multiple branches in SMCHS and Gulshan-e-Iqbal, we continue to serve Karachi's finest Desi cuisine with the same dedication to quality and taste that we started with.
            </p>
            <p>
              Every dish at Alvigha tells a story of tradition, spices, and a commitment to excellence. Welcome to our table!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
