import React, { useState } from 'react';
import { PiPlusBold } from "react-icons/pi";
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import AddToCartModal from './AddToCartModal';

export default function MenuItemCard({ item }) {
  const [showModal, setShowModal] = useState(false);

  return (<>
    <motion.div 
      className="bg-black/80 rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors flex flex-col h-full shadow-lg group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      
      {/* Image Container with potential tag pills */}
      <div className="w-full relative h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&w=400&q=80'; }}
        />
        {item.tags && item.tags.map((tag, i) => (
          <span key={i} className="absolute top-2 left-2 bg-white/90 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            {tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow relative">
        <h3 className="text-lg font-bold font-sans text-white mb-1 leading-snug">{item.title}</h3>
        {item.desc && (
          <p className="text-[11px] text-gray-400 leading-relaxed mb-3 line-clamp-2">
            {item.desc}
          </p>
        )}
        
        {/* Variants block if exists */}
        {item.variants && (
          <div className="flex flex-wrap gap-2 mb-3">
            {item.variants.map((v, i) => (
              <span key={i} className="text-[10px] border border-white/20 rounded-full px-2 py-1 text-gray-300">
                {v}
              </span>
            ))}
          </div>
        )}

        {/* Spacer to push price to bottom */}
        <div className="flex-grow"></div>

        {/* Footer of card: Price + Add Button */}
        <div className="flex justify-between items-end mt-2">
          <span className="text-sm font-bold text-gray-200">Rs. {item.price}</span>
        </div>
        
        {/* Absolute floating Add to Cart button */}
        <button 
          onClick={() => setShowModal(true)}
          className="absolute bottom-4 right-4 bg-white/10 p-1.5 rounded hover:bg-white/30 transition-colors border border-white/20 text-white cursor-pointer"
        >
          <PiPlusBold />
        </button>
      </div>

    </motion.div>

    {showModal && (
      <AddToCartModal item={item} onClose={() => setShowModal(false)} />
    )}
  </>);
}
