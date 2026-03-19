import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "A BOWL OF SOUP IS WINTER'S COZY HUG.",
    subtitle: "HOT N SOUR SOUP",
    alignment: "center"
  },
  {
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb2258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "MUTTON CHOP PERFECTION.",
    subtitle: "SIGNATURE CHOPS",
    alignment: "left"
  },
  {
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "CUISINE WITH CULTURE.",
    subtitle: "RAMADAN KAREEM",
    alignment: "right"
  },
  {
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "FLAVOURS OF TRADITION.",
    subtitle: "SHEESH TAWOOK",
    alignment: "left"
  },
  {
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    title: "RICH & CREAMY DELIGHT.",
    subtitle: "GREEN HANDI",
    alignment: "right"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all slide images on mount
  useEffect(() => {
    let loaded = 0;
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        loaded++;
        if (loaded === slides.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === slides.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    const timer = setInterval(slideNext, 6000);
    return () => clearInterval(timer);
  }, [slideNext, imagesLoaded]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 1.2 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 }
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] mt-[52px] md:mt-16 bg-black overflow-hidden group">
      
      {/* Hidden preload images */}
      <div className="hidden">
        {slides.map((slide, idx) => (
          <img key={idx} src={slide.image} alt="" />
        ))}
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image using actual img tag */}
          <div className="absolute inset-0">
            <img
              src={slides[current].image}
              alt={slides[current].subtitle}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlays */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className={`relative h-full container mx-auto px-6 md:px-16 flex flex-col justify-center
            ${slides[current].alignment === 'center' ? 'items-center text-center' : 
              slides[current].alignment === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
          >
            <motion.h1 
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-[#f2eee3] leading-[1.1] mb-6 drop-shadow-2xl max-w-4xl tracking-tight"
            >
              {slides[current].title}
            </motion.h1>
            
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="relative inline-block"
            >
              <div className="h-[2px] w-24 bg-red-600 mb-4 mx-auto md:mx-0" style={{ margin: slides[current].alignment === 'center' ? '0 auto' : slides[current].alignment === 'right' ? '0 0 0 auto' : '0 auto 0 0' }} />
              <h2 className="text-xl md:text-3xl font-serif text-white uppercase tracking-[0.3em] font-light">
                {slides[current].subtitle}
              </h2>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={slidePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-4 text-white hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer hidden md:block"
      >
        <PiCaretLeftBold size={48} className="drop-shadow-lg" />
      </button>
      <button 
        onClick={slideNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-4 text-white hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer hidden md:block"
      >
        <PiCaretRightBold size={48} className="drop-shadow-lg" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            className={`h-1 transition-all duration-300 rounded-full cursor-pointer
              ${idx === current ? 'w-12 bg-red-600' : 'w-4 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>

    </section>
  );
}
