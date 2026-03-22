import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from 'framer-motion';
import confetti from 'canvas-confetti';

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

const Phrase = ({ phrase }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -20% 0px", once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className="py-6 md:py-16"
    >
      <p className={`
        ${phrase.accent 
          ? "text-4xl sm:text-6xl md:text-9xl text-white font-serif italic tracking-tighter" 
          : "text-xl sm:text-2xl md:text-5xl text-zinc-500 font-light leading-snug md:leading-tight max-w-5xl"}
      `}>
        {phrase.text}
      </p>
    </motion.div>
  );
};

export default function MemoryGallery() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  
  // Detect touch device to disable cursor
  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const gY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const gOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.01, 0.08, 0.01]);

  const handleCelebrate = () => {
    setIsRevealed(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    const end = Date.now() + 6000;
    const colors = ['#ffffff', '#ffd700', '#444444']; 

    (function frame() {
      confetti({
        particleCount: isMobile ? 1 : 2,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      confetti({
        particleCount: isMobile ? 1 : 2,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`bg-[#020202] py-40 md:py-60 px-6 relative overflow-hidden min-h-screen ${isMobile ? 'cursor-default' : 'cursor-none'} selection:bg-white selection:text-black`}
    >
      <audio ref={audioRef} src="/path-to-your-song.mp3" preload="auto" />

      {/* --- CINEMATIC OVERLAYS --- */}
      {!isMobile && (
        <motion.div 
          style={{ x: mouseX, y: mouseY }}
          className="fixed top-0 left-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-white opacity-[0.04] rounded-full blur-[100px] md:blur-[150px] pointer-events-none z-30 translate-x-[-50%] translate-y-[-50%]"
        />
      )}
      
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Responsive background monogram */}
      <motion.div 
        style={{ y: gY, opacity: gOpacity }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <span className="text-[20rem] sm:text-[40rem] md:text-[75rem] font-serif italic text-white select-none overflow-hidden">
          G
        </span>
      </motion.div>

      {/* --- CONTENT LAYER --- */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Intro Tag - Shrunk for mobile */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-20 md:mb-48 flex items-center gap-4 md:gap-10"
        >
          <div className="h-[1px] w-12 md:w-32 bg-zinc-800" />
          <span className="text-zinc-600 uppercase tracking-[0.5em] md:tracking-[1.5em] text-[8px] md:text-[10px] font-medium whitespace-nowrap">Vol. I — The Manuscript</span>
        </motion.div>

        <div className="flex flex-col">
          {letterPhrases.map((phrase, index) => (
            <Phrase key={index} phrase={phrase} />
          ))}
        </div>

        {/* Signature - Adjusted for smaller screens */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 md:mt-80 pt-10 md:pt-20 border-t border-zinc-900/60 flex flex-col items-start gap-4 md:gap-6"
        >
          <span className="text-zinc-500 font-serif italic text-3xl md:text-5xl">Yours always,</span>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-8 md:w-12 h-[1px] bg-zinc-700" />
            <span className="text-white tracking-[0.3em] md:tracking-[0.6em] uppercase text-[10px] md:text-xs font-light">Brother</span>
          </div>
        </motion.div>

        {/* --- THE FINALE REVEAL --- */}
        <div className="mt-40 md:mt-80 flex justify-center items-center min-h-[400px] md:min-h-[700px]">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.button
                key="trigger"
                exit={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
                onClick={handleCelebrate}
                className="group relative px-10 md:px-24 py-6 md:py-12 overflow-hidden border border-zinc-900 transition-all duration-700"
              >
                <span className="relative z-10 text-zinc-600 group-active:text-white uppercase tracking-[1em] md:tracking-[2em] text-[10px] md:text-[12px]">
                  Open Your Year
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/5 opacity-0 group-active:opacity-100 transition-opacity" 
                />
              </motion.button>
            ) : (
              <motion.div 
                key="reveal-sequence"
                className="text-center flex flex-col items-center w-full"
              >
                {/* Scaled down text for mobile: 5rem instead of 16rem */}
                <motion.h2 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white font-serif italic text-6xl sm:text-8xl md:text-[16rem] leading-none tracking-tighter"
                >
                  March 23
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1.5 }}
                  className="flex flex-col items-center"
                >
                  <h3 className="mt-6 md:mt-10 text-white font-light text-2xl sm:text-4xl md:text-8xl tracking-[0.1em] uppercase italic">
                    Happy Birthday
                  </h3>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isMobile ? "80px" : "160px" }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="h-[1px] bg-zinc-800 my-8 md:my-12"
                  />

                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 2, duration: 2 }}
                    className="text-white tracking-[0.5em] md:tracking-[1.2em] text-[8px] md:text-[12px] uppercase font-extralight"
                  >
                    A New Story Begins
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- INVERSION CURSOR (Hidden on mobile) --- */}
      {!isMobile && (
        <motion.div 
          style={{ x: mouseX, y: mouseY }}
          className="fixed top-0 left-0 w-5 h-5 bg-white rounded-full mix-blend-difference pointer-events-none z-[100] translate-x-[-50%] translate-y-[-50%]"
        />
      )}
    </section>
  );
}