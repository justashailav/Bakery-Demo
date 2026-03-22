import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';

/**
 * THE SCRIPT: Cinematic Letter Content
 */
const letterPhrases = [
  { text: "To my sister, Gugu.", accent: true },
  { text: "They say some people are born with a certain kind of light—", accent: false },
  { text: "the kind that makes the world feel a little more vivid,", accent: false },
  { text: "a little more possible.", accent: false },
  { text: "Watching you grow and build your own path", accent: false },
  { text: "has been the greatest story I've ever witnessed.", accent: false },
  { text: "May March 23rd be the start of your most", accent: false },
  { text: "Cinematic Year Yet.", accent: true },
  { text: "Happy Birthday.", accent: true },
];

/**
 * COMPONENT: Individual Phrase with Scroll Reveal
 */
const Phrase = ({ phrase }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -20% 0px", once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 40, filter: "blur(15px)" }}
      transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
      className="py-10 md:py-16"
    >
      <p className={`
        ${phrase.accent 
          ? "text-6xl md:text-9xl text-white font-serif italic tracking-tighter" 
          : "text-2xl md:text-5xl text-zinc-500 font-light leading-tight max-w-5xl"}
      `}>
        {phrase.text}
      </p>
    </motion.div>
  );
};

export default function MemoryGallery() {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  
  // 1. Mouse Tracking for Lens Flare & Custom Cursor
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  // 2. Parallax Background Monogram
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const gY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const gOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.01, 0.08, 0.01]);

  // 3. The Grand Celebration Logic
  const handleCelebrate = () => {
    setIsRevealed(true);
    
    // Play Audio (if source is provided)
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser"));
    }

    const end = Date.now() + 6000;
    const colors = ['#ffffff', '#ffd700', '#444444']; 

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: colors,
        disableForced3d: true
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: colors,
        disableForced3d: true
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-[#020202] py-60 px-6 relative overflow-hidden min-h-screen cursor-none selection:bg-white selection:text-black"
    >
      {/* HIDDEN AUDIO SOURCE */}
      <audio ref={audioRef} src="/path-to-your-song.mp3" preload="auto" />

      {/* --- CINEMATIC OVERLAYS --- */}
      
      {/* Dynamic Lens Flare (follows mouse) */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 w-[800px] h-[800px] bg-white opacity-[0.04] rounded-full blur-[150px] pointer-events-none z-30 translate-x-[-50%] translate-y-[-50%]"
      />
      
      {/* 35mm Film Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Background Parallax "G" */}
      <motion.div 
        style={{ y: gY, opacity: gOpacity }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <span className="text-[50rem] md:text-[75rem] font-serif italic text-white select-none">
          G
        </span>
      </motion.div>

      {/* --- CONTENT LAYER --- */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Intro Tag */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-48 flex items-center gap-10"
        >
          <div className="h-[1px] w-32 bg-zinc-800" />
          <span className="text-zinc-600 uppercase tracking-[1.5em] text-[10px] font-medium">Vol. I — The Manuscript</span>
        </motion.div>

        {/* Letter Phrases */}
        <div className="flex flex-col">
          {letterPhrases.map((phrase, index) => (
            <Phrase key={index} phrase={phrase} />
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-80 pt-20 border-t border-zinc-900/60 flex flex-col items-start gap-6"
        >
          <span className="text-zinc-500 font-serif italic text-5xl">Yours always,</span>
          <div className="flex items-center gap-6">
            <div className="w-12 h-[1px] bg-zinc-700" />
            <span className="text-white tracking-[0.6em] uppercase text-xs font-light">Brother</span>
          </div>
        </motion.div>

        {/* --- THE FINALE REVEAL --- */}
        <div className="mt-80 flex justify-center items-center min-h-[700px]">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.button
                key="trigger"
                exit={{ opacity: 0, filter: "blur(30px)", scale: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCelebrate}
                className="group relative px-24 py-12 overflow-hidden border border-zinc-900 hover:border-zinc-400 transition-all duration-700"
              >
                <span className="relative z-10 text-zinc-600 group-hover:text-white uppercase tracking-[2em] text-[12px] transition-colors duration-500">
                  Open Your Year
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </motion.button>
            ) : (
              <motion.div 
                key="reveal-sequence"
                className="text-center flex flex-col items-center"
              >
                {/* Stage 1: The Date (Impact) */}
                <motion.h2 
                  initial={{ opacity: 0, y: 150 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white font-serif italic text-[9rem] md:text-[16rem] leading-none tracking-tighter"
                >
                  March 23
                </motion.h2>

                {/* Stage 2 & 3: Birthday + Tagline (Sentiment) */}
                <motion.div
                  initial={{ opacity: 0, filter: "blur(20px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 1.5, duration: 2 }}
                  className="flex flex-col items-center"
                >
                  <h3 className="mt-10 text-white font-light text-5xl md:text-8xl tracking-[0.1em] uppercase italic">
                    Happy Birthday
                  </h3>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "160px" }}
                    transition={{ delay: 2.5, duration: 1.5 }}
                    className="h-[1px] bg-zinc-800 my-12"
                  />

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 3.5, duration: 2 }}
                    className="text-white tracking-[1.2em] uppercase text-[12px] font-extralight"
                  >
                    A New Story Begins
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- INVERSION CURSOR --- */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full mix-blend-difference pointer-events-none z-[100] translate-x-[-50%] translate-y-[-50%]"
      />
    </section>
  );
}