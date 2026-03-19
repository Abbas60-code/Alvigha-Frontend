import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function Section({ title, children }) {
  return (
    <section id={title} className="py-8 md:py-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center scroll-mt-28 md:scroll-mt-32">
      {/* Dark elegant banner for the title */}
      <motion.div 
        className="w-full max-w-4xl bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 text-center shadow-xl rounded-md relative mb-8 md:mb-10 border-b border-[#E5CDAC]/20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-5xl font-serif text-white tracking-widest uppercase relative z-10 drop-shadow-md">
          {title}
        </h2>
      </motion.div>
      
      {/* Grid container for items */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        {children}
      </div>
    </section>
  );
}
