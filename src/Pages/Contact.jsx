import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorMsg('');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        if (data?.errors) {
          setErrorMsg(Object.values(data.errors).flat()[0] || `Request failed (${response.status})`);
        } else if (data?.message) {
          setErrorMsg(`${data.message}`);
        } else if (data) {
          setErrorMsg(`Request failed (${response.status}): ${JSON.stringify(data)}`);
        } else {
          setErrorMsg(`Request failed (${response.status}). Something went wrong. Please try again.`);
        }
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg('Could not connect to server. Please check your connection.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#3d0a0a] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          <div className="md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
            <h1 className="text-4xl font-serif font-bold text-white mb-2 tracking-widest uppercase">Contact Us</h1>
            <p className="text-brand-red italic mb-10 text-lg">We'd love to hear from you</p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-brand-red/20 p-3 rounded-full text-brand-red h-fit">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <p className="text-gray-300">alvigha.food@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-red/20 p-3 rounded-full text-brand-red h-fit">
                  <FaPhone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Phone</h4>
                  <p className="text-gray-300">0334-2945479 / +923182141472</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-red/20 p-3 rounded-full text-brand-red h-fit">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Locations</h4>
                  <div className="space-y-4 text-gray-300 text-sm">
                    <p>
                      <span className="text-white font-semibold">SMCHS Branch:</span><br/>
                      121, Commercial Area, Block A, Sindhi Muslim Cooperative Housing Society, Karachi
                    </p>
                    <p>
                      <span className="text-white font-semibold">Gulshan Branch:</span><br/>
                      A 283, Block 2 Gulshan-e-Iqbal, Karachi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-12 bg-white/5">
            <h2 className="text-2xl font-serif font-bold text-white mb-8 tracking-widest uppercase">Send Us a Message</h2>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-green-500/20 border border-green-500/40 text-green-400 rounded-lg px-4 py-3 mb-6"
              >
                <FaCheckCircle size={18} />
                <span className="text-sm font-medium">Your message has been sent successfully! We will contact you soon. 🎉</span>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg px-4 py-3 mb-6"
              >
                <FaExclamationCircle size={18} />
                <span className="text-sm font-medium">{errorMsg}</span>
              </motion.div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">Full Name *</label>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                  placeholder="Your Name"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Email *</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Phone Number</label>
                  <input 
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors"
                    placeholder="03XX-XXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2 font-medium">Message *</label>
                <textarea 
                  id="message"
                  name="message"
                  autoComplete="off"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-red transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-gray-200 transition-colors shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-serif text-lg tracking-widest uppercase">SMCHS Branch</h3>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.6764!2d67.0581!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM4LjUiTiA2N8KwMDMnMjkuMiJF!5e0!3m2!1sen!2s!4v1701000000000!5m2!1sen!2s"
              width="100%" 
              height="250" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="SMCHS Branch Location"
              className="w-full"
            ></iframe>
          </div>
          <div className="bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-white font-serif text-lg tracking-widest uppercase">Gulshan Branch</h3>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.2!2d67.0935!3d24.9198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU1JzExLjMiTiA2N8KwMDUnMzYuNiJF!5e0!3m2!1sen!2s!4v1701000000000!5m2!1sen!2s"
              width="100%" 
              height="250" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Gulshan Branch Location"
              className="w-full"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}