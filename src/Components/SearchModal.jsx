import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiXBold, PiMagnifyingGlassBold } from 'react-icons/pi';
import { menuData } from '../data';
import { useCart } from '../context/CartContext';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { addToCart, setIsCartOpen } = useCart();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const allItems = [];
    Object.entries(menuData).forEach(([category, items]) => {
      items.forEach(item => {
        if (
          item.title.toLowerCase().includes(q) ||
          (item.desc && item.desc.toLowerCase().includes(q)) ||
          category.toLowerCase().includes(q)
        ) {
          allItems.push({ ...item, category });
        }
      });
    });
    return allItems;
  }, [query]);

  const handleAdd = (item) => {
    addToCart(item);
    setIsCartOpen(true);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] cursor-pointer"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-lg z-[100] bg-brand-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-black/40">
              <PiMagnifyingGlassBold className="text-gray-400 text-xl shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search menu items..."
                className="flex-grow bg-transparent text-white outline-none placeholder-gray-500 text-lg"
                autoFocus
              />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <PiXBold size={20} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {query.trim() && results.length === 0 && (
                <p className="text-gray-500 text-center py-8">No items found for "{query}"</p>
              )}
              {results.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                  onClick={() => handleAdd(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=80'; }}
                  />
                  <div className="flex-grow min-w-0">
                    <h4 className="text-white text-sm font-semibold truncate">{item.title}</h4>
                    <p className="text-gray-500 text-[11px] truncate">{item.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-red-500 font-bold text-sm">Rs. {item.price}</span>
                    <p className="text-[10px] text-gray-500 group-hover:text-green-400 transition-colors">+ Add</p>
                  </div>
                </div>
              ))}
              {!query.trim() && (
                <p className="text-gray-500 text-center py-8 text-sm">Type to search our menu...</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
