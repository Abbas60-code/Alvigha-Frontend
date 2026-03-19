import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16 border-t border-white/10 pt-12 pb-6 px-4 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start mb-8 gap-8">
        
        {/* Brand */}
        <div className="w-full md:w-1/3">
          <h2 className="text-red-600 font-serif text-3xl font-bold italic mb-4">Alvigha</h2>
          <p className="text-gray-400 text-xs leading-relaxed">Serving Karachi's finest Desi cuisine since 2019. Premium flavors, premium experience.</p>
        </div>

        {/* Contact Info */}
        <div className="w-full md:w-1/3 text-xs text-gray-300 leading-relaxed tracking-wider">
          <p className="mb-1"><span className="font-bold text-white">Phone: </span> +923182141472</p>
          <p className="mb-4"><span className="font-bold text-white">Email: </span> alvigha.food@gmail.com</p>
          
          <h4 className="font-bold text-white mb-1">SMCHS Branch:</h4>
          <p className="mb-4">121, Commercial Area, Block A, Sindhi Muslim Cooperative Housing Society, Karachi</p>

          <h4 className="font-bold text-white mb-1">Gulshan-e-Iqbal Branch:</h4>
          <p>A 283, Block 2 Gulshan-e-Iqbal, Karachi</p>
        </div>

        {/* Social & Quick Links */}
        <div className="w-full md:w-1/3">
          <h4 className="font-bold text-white mb-3 text-sm">Follow Us</h4>
          <div className="flex gap-4 mb-6">
            <a href="https://www.facebook.com/alvigha" target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors cursor-pointer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/alvigha" target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors cursor-pointer"><FaInstagram /></a>
          </div>

          <h4 className="font-bold text-white mb-3 text-sm">Quick Links</h4>
          <div className="flex flex-col gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-white transition-colors cursor-pointer">Menu</Link>
            <Link to="/about" className="hover:text-white transition-colors cursor-pointer">About Us</Link>
            <Link to="/contact" className="hover:text-white transition-colors cursor-pointer">Contact Us</Link>
            <Link to="/ballroom" className="hover:text-white transition-colors cursor-pointer">Ballroom Booking</Link>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 text-center text-[10px] text-gray-500 uppercase tracking-widest">
        <p>© 2025 Alvigha Restaurant. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
