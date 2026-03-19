import React from 'react';
import { categories } from '../data';

export default function CategoryNav() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[52px] md:top-16 z-40 bg-black text-white text-[10px] sm:text-xs font-sans tracking-widest border-b border-white/20 whitespace-nowrap overflow-x-auto custom-scrollbar">
      <ul className="flex justify-center sm:justify-center items-center px-4 py-2 sm:py-3 gap-4 sm:gap-6 w-max mx-auto md:w-full">
        {categories.map((cat, idx) => (
          <li 
            key={idx} 
            onClick={() => handleScroll(cat)}
            className="hover:text-red-500 cursor-pointer transition-colors uppercase font-semibold whitespace-nowrap"
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
