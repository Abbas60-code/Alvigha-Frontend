import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaGlassCheers, FaStar } from 'react-icons/fa';

export default function Ballroom() {
  const eventImages = [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=1200"
  ];

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: '', date: '', guests: '', requests: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Booking request submitted successfully! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', eventType: '', date: '', guests: '', requests: '' });
      } else {
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };


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
              
              {message && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-bold ${message.includes('success') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {message}
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red" />
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Phone Number" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red" />
                  <div className="relative">
                    <select
                      required
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full bg-[#1a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red appearance-none cursor-pointer pr-10"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" disabled className="bg-[#1a0a0a] text-gray-400">Select Event Type</option>
                      <option value="Birthday Party" className="bg-[#1a0a0a] text-white">Birthday Party</option>
                      <option value="Nikkah / Mehndi" className="bg-[#1a0a0a] text-white">Nikkah / Mehndi</option>
                      <option value="Corporate Event" className="bg-[#1a0a0a] text-white">Corporate Event</option>
                      <option value="Bridal / Baby Shower" className="bg-[#1a0a0a] text-white">Bridal / Baby Shower</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required name="date" value={formData.date} onChange={handleChange} type="date" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-brand-red" />
                  <input required name="guests" value={formData.guests} onChange={handleChange} type="number" placeholder="No. of People" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red" />
                </div>

                <textarea name="requests" value={formData.requests} onChange={handleChange} rows="3" placeholder="Additional Requests" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red resize-none"></textarea>

                <button disabled={loading} className={`w-full bg-brand-red hover:bg-red-700 text-white font-bold uppercase tracking-widest py-4 rounded-lg transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {loading ? 'Submitting...' : 'Submit Booking'}
                </button>
              </form>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
