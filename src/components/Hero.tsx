import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../constants';

interface HeroProps {
  onShopNow?: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden bg-stone-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src={HERO_SLIDES[current].image}
            alt={HERO_SLIDES[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
            <div className="max-w-3xl">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
              >
                {HERO_SLIDES[current].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-stone-100 mb-8 max-w-xl mx-auto font-medium"
              >
                {HERO_SLIDES[current].subtitle}
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={onShopNow}
                className="px-8 py-4 bg-white text-stone-900 font-bold rounded-full hover:bg-emerald-50 transition-colors shadow-lg"
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === i ? 'w-8 bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
