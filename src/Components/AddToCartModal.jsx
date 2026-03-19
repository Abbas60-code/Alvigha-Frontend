import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PiXBold, PiMinusBold, PiPlusBold } from 'react-icons/pi';
import { FiShare2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function AddToCartModal({ item, onClose }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [instructions, setInstructions] = useState('');

  if (!item) return null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(item);
    }
    onClose();
    setIsCartOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: item.title, text: item.desc || item.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Portal — renders directly into document.body, completely outside any stacking context
  return ReactDOM.createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 9998 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        key="modal-panel"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.95 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', pointerEvents: 'none' }}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
          style={{ pointerEvents: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left: Image */}
          <div className="relative w-full md:w-[45%] h-56 md:h-auto shrink-0 bg-gray-100">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80';
              }}
            />
            {/* Item name overlay on mobile */}
            <div className="absolute bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-black/70 to-transparent p-4">
              <h2 className="text-white text-lg font-bold leading-tight">{item.title}</h2>
              {item.desc && (
                <p className="text-white/80 text-xs mt-1 leading-relaxed line-clamp-2">{item.desc}</p>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col flex-grow overflow-y-auto">
            {/* Top bar with share & close */}
            <div className="flex justify-end gap-2 p-3 shrink-0">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                <FiShare2 size={16} />
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                <PiXBold size={16} />
              </button>
            </div>

            {/* Item info — hidden on mobile (shown in overlay above) */}
            <div className="hidden md:block px-5 pb-3">
              <h2 className="text-gray-900 text-xl font-bold leading-tight">{item.title}</h2>
              {item.desc && (
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{item.desc}</p>
              )}
            </div>

            {/* Special Instructions */}
            <div className="px-5 pb-4 flex-grow">
              <label className="block text-gray-800 font-semibold text-sm mb-2">
                Special Instructions
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Please enter instructions about this item"
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-gray-500 placeholder:text-gray-400"
              />
            </div>

            {/* Footer: Qty + Add Button */}
            <div className="px-5 pb-5 flex items-center justify-between gap-4 shrink-0 border-t border-gray-100 pt-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3 border border-gray-300 rounded-full px-3 py-1.5">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="text-gray-700 hover:text-black transition cursor-pointer"
                >
                  <PiMinusBold size={16} />
                </button>
                <span className="text-gray-900 font-bold text-base w-5 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="text-gray-700 hover:text-black transition cursor-pointer"
                >
                  <PiPlusBold size={16} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                className="flex-grow bg-gray-900 text-white font-bold py-2.5 px-5 rounded-full hover:bg-black transition cursor-pointer text-sm tracking-wide"
              >
                Add to Cart — Rs. {(item.price * qty).toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body  // Portal target — directly in body, no stacking context issue
  );
}
