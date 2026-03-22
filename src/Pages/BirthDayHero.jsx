import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// --- Improved Petal Physics with Leaf Shapes ---
const Petal = ({ i }) => {
  const angle = Math.random() * Math.PI * 2; 
  const velocity = 500 + Math.random() * 800; 
  const duration = 2.5 + Math.random() * 3.5;
  const size = 10 + Math.random() * 15;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0.4],
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity + 300, 
        rotate: Math.random() * 720,
      }}
      transition={{ duration: duration, ease: [0.1, 0.6, 0.3, 1] }}
      className="absolute pointer-events-none"
      style={{
        width: size, 
        height: size * 1.2,
        background: i % 3 === 0 
          ? 'linear-gradient(135deg, #fff 0%, #fecaca 100%)' 
          : i % 3 === 1 ? '#fda4af' : '#fff1f2',
        borderRadius: i % 2 === 0 ? '50% 0% 50% 50%' : '50% 50% 0% 50%',
        filter: 'blur(0.5px) drop-shadow(0 0 10px rgba(251, 113, 133, 0.3))',
        left: '50%',
        top: '50%',
        zIndex: 100
      }}
    />
  );
};

export default function BirthdayHero({ onEnter }) {
  const [isClicked, setIsClicked] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [petals, setPetals] = useState([]);
  
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoother parallax springs
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 60;
      const moveY = (clientY / window.innerHeight - 0.5) * 60;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEnter = () => {
    if (isClicked) return;
    setIsClicked(true);
    setShowFlash(true);
    setPetals([...Array(120)]); 
    
    // Quick flash and then move to main page
    setTimeout(() => setShowFlash(false), 150);
    setTimeout(() => { if (onEnter) onEnter(); }, 3000);
  };

  return (
    <motion.div 
      ref={containerRef}
      animate={{ backgroundColor: isClicked ? "#000000" : "#050507" }}
      className="relative h-screen w-full flex items-center justify-center text-[#f4f4f4] overflow-hidden cursor-crosshair"
    >
      {/* 1. CELEBRATION LAYER */}
      <AnimatePresence>
        {isClicked && petals.map((_, i) => <Petal key={i} i={i} />)}
      </AnimatePresence>

      {/* 2. FILM FLASH EFFECT */}
      <AnimatePresence>
        {showFlash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-[110] pointer-events-none mix-blend-overlay"
          />
        )}
      </AnimatePresence>

      {/* 3. CINEMATIC TEXTURE & VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* 4. PARALLAX MONOGRAM */}
      <motion.div 
        style={{ 
          x: useTransform(smoothX, (v) => v * -1.5), 
          y: useTransform(smoothY, (v) => v * -1.5),
          opacity: isClicked ? 0 : 0.03 
        }}
        className="absolute z-[1] font-serif italic text-[50rem] text-white select-none pointer-events-none transition-opacity duration-1000"
      >
        G
      </motion.div>

      {/* 5. MAIN HERO CONTENT */}
      <motion.div 
        animate={isClicked ? { opacity: 0, scale: 1.1, filter: "blur(40px)" } : { opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 1 }}
        >
          <p className="uppercase text-[9px] tracking-[1.5em] text-zinc-500 mb-10 font-medium">
            Personal Archive — 2026
          </p>
        </motion.div>

        <motion.h1 
          style={{ x: useTransform(smoothX, (v) => v * 0.5), y: useTransform(smoothY, (v) => v * 0.5) }}
          className="text-[7rem] md:text-[15rem] font-serif italic tracking-tighter leading-none mb-12 select-none"
        >
          Gugu
        </motion.h1>

        {/* MAGNETIC BUTTON CONTAINER */}
        <motion.div 
          className="relative"
          style={{ x: useTransform(smoothX, (v) => v * 0.2), y: useTransform(smoothY, (v) => v * 0.2) }}
        >
          <motion.button
            onClick={handleEnter}
            whileHover={{ scale: 1.05, letterSpacing: "0.8em" }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-20 py-6 rounded-full border border-zinc-800 bg-black/20 text-[10px] uppercase tracking-[0.6em] text-zinc-400 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:text-black hover:border-white"
          >
            <span className="relative z-30 transition-colors duration-500">Enter Archive</span>
            <motion.div 
              className="absolute inset-0 bg-white z-20 translate-y-[100%]"
              whileHover={{ translateY: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          </motion.button>
          
          {/* Subtle glow behind button */}
          <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full scale-150 pointer-events-none group-hover:bg-white/10 transition-colors" />
        </motion.div>
      </motion.div>

      {/* 6. BORDER FRAME */}
      <div className="absolute inset-8 border border-white/[0.05] pointer-events-none z-20" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[8px] tracking-[1em] text-zinc-700 uppercase z-20">
        Sisterhood Edition
      </div>
    </motion.div>
  );
}