import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaGlassCheers, FaStar } from 'react-icons/fa';

export default function Ballroom() {
  const eventImages = [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=1200"
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#3d0a0a] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 tracking-widest uppercase">Ballroom Booking</h1>
          <p className="text-brand-red italic text-lg md:text-xl font-light">Make your special moments unforgettable</p>
        </motion.div>

        {/* Carousel / Hero Images */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 h-[300px] md:h-[400px]"
        >
          {eventImages.map((src, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-2xl group border border-white/10">
              <img src={src} alt="Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
            </div>
          ))}
        </motion.div>

        {/* Reservation Details & Form */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 space-y-8"
          >
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
              <h2 className="text-3xl font-serif text-white mb-6 tracking-wide">Host Your Dream Event</h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                From intimate Nikkah ceremonies and vibrant Mehndi nights to corporate gatherings and luxury birthday parties, Alvigha's private event space offers the perfect blend of elegance and tradition.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 text-white">
                  <FaUsers className="text-brand-red text-xl" />
                  <span>Up to 100 Guests</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <FaGlassCheers className="text-brand-red text-xl" />
                  <span>Custom Catering</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <FaCalendarAlt className="text-brand-red text-xl" />
                  <span>Flexible Dates</span>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <FaStar className="text-brand-red text-xl" />
                  <span>Premium Decor</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-serif text-white mb-8 tracking-widest uppercase text-center md:text-left">Reservation Details</h3>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red" />
                  <input type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone Number" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red" />
                  <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-brand-red appearance-none">
                    <option>Select Event Type</option>
                    <option>Birthday Party</option>
                    <option>Nikkah / Mehndi</option>
                    <option>Corporate Event</option>
                    <option>Bridal / Baby Shower</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="date" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-brand-red" />
                  <input type="number" placeholder="No. of People" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red" />
                </div>

                <textarea rows="3" placeholder="Additional Requests" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red resize-none"></textarea>

                <button className="w-full bg-brand-red hover:bg-red-700 text-white font-bold uppercase tracking-widest py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] cursor-pointer">
                  Submit Booking
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
