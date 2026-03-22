import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const beautyItems = [
  { id: 1, label: "The Vision", content: "Your ability to see beauty in the smallest Himalayan details.", icon: "✧", position: { top: '15%', left: '10%' } },
  { id: 2, label: "The Strength", content: "The quiet power you carry in everything you build.", icon: "◈", position: { top: '60%', left: '75%' } },
  { id: 3, label: "The 2026 Gift", content: "A special collection curated just for your birthday journey.", icon: "❈", position: { top: '35%', left: '45%' } },
];

export default function BeautifulThings() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className="min-h-screen bg-[#020202] py-40 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 1. LAYERED BACKGROUND KINETICS */}
      <div className="absolute inset-0 z-0">
        {/* Animated Grainy Mesh */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,transparent_50%)]" 
        />
        
        {/* Subtle SVG Distortion Mesh (The "Mist") */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* 2. THE FLOATING CONSTELLATION */}
      <div className="relative w-full max-w-5xl h-[600px] z-10">
        <AnimatePresence>
          {!selectedId && beautyItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              transition={{ delay: idx * 0.2, duration: 1, ease: [0.19, 1, 0.22, 1] }}
              style={{ top: item.position.top, left: item.position.left }}
              className="absolute"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedId(item.id)}
                className="relative cursor-pointer group"
              >
                {/* Orbital Ring */}
                <div className="absolute inset-[-20px] border border-white/5 rounded-full group-hover:border-white/20 transition-colors duration-700" />
                
                {/* Content Node */}
                <div className="relative flex flex-col items-center">
                  <span className="text-4xl text-zinc-700 group-hover:text-white transition-all duration-700">
                    {item.icon}
                  </span>
                  <p className="mt-4 text-[8px] uppercase tracking-[0.6em] text-zinc-600 group-hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. THE REVEAL: KINETIC TEXT MASK */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
          >
            {/* The "Lens Flare" Background Shift */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 bg-[#050505] flex items-center justify-center overflow-hidden"
            >
                <div className="w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)] animate-pulse" />
            </motion.div>

            <div className="relative z-10 text-center max-w-5xl">
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[10px] uppercase tracking-[1.5em] text-zinc-500 mb-12 block"
              >
                {beautyItems.find(i => i.id === selectedId).label}
              </motion.span>

              {/* MASKED TEXT ANIMATION */}
              <div className="relative">
                <motion.h3 
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  className="text-4xl md:text-8xl font-serif italic text-white leading-tight"
                >
                  {beautyItems.find(i => i.id === selectedId).content}
                </motion.h3>
                
                {/* Secondary Ghost Text for Depth */}
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.05 }}
                  className="absolute inset-0 text-4xl md:text-8xl font-serif italic text-white leading-tight blur-md pointer-events-none"
                >
                   {beautyItems.find(i => i.id === selectedId).content}
                </motion.h3>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={() => setSelectedId(null)}
                className="mt-24 text-zinc-600 hover:text-white text-[9px] uppercase tracking-[0.5em] flex flex-col items-center group transition-colors"
              >
                <div className="w-[1px] h-12 bg-zinc-800 group-hover:bg-white transition-colors mb-4" />
                Close Archive
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static Labels (Ambient Decoration) */}
      <div className="absolute bottom-10 left-10 hidden md:block">
         <p className="text-zinc-800 text-[8px] uppercase tracking-[1em]">Collection 2026</p>
      </div>
    </section>
  );
}