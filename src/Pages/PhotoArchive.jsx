import React, { useRef, useState } from 'react';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useMotionTemplate 
} from 'framer-motion';

// ASSET IMPORTS
import Gugu1 from "../assets/Gugu1.jpeg";
import Gugu2 from "../assets/Gugu2.jpeg";
import Gugu3 from "../assets/Gugu3.jpeg";
import Gugu4 from "../assets/Gugu4.jpeg";
import Gugu5 from "../assets/Gugu5.jpeg";
import Gugu6 from "../assets/Gugu6.mp4";
import Gugu7 from "../assets/Gugu7.mp4";
import Gugu8 from "../assets/Gugu8.jpeg";
import Gugu9 from "../assets/Gugu9.jpeg";

const MediaCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Spotlight / Flashlight logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        if (videoRef.current) videoRef.current.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (videoRef.current) videoRef.current.pause();
      }}
      // Entrance Animation
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
      viewport={{ once: true }}
      className={`${item.span} relative group bg-[#050505] overflow-hidden border border-white/[0.03] min-h-[450px] md:h-full cursor-none`}
    >
      {/* 1. THE DYNAMIC SPOTLIGHT LAYER */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px, 
              rgba(255,255,255,0.12), 
              transparent 70%
            )
          `
        }}
      />

      {/* 2. THE MEDIA CONTENT */}
      <div className="absolute inset-0 z-10">
        <motion.div 
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }}
          className={`w-full h-full transition-all duration-1000 ease-in-out 
            ${isHovered ? 'grayscale-0 brightness-110' : 'grayscale brightness-[0.25]'}`}
        >
          {item.type === 'video' ? (
            <video 
              ref={videoRef} 
              src={item.src} 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover" 
            />
          ) : (
            <img 
              src={item.src} 
              alt={item.title} 
              className="w-full h-full object-cover" 
            />
          )}
        </motion.div>
      </div>

      {/* 3. FLOATING KINETIC TEXT */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 z-40 pointer-events-none">
        <div className="flex justify-between items-start">
          <motion.p 
             animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
             className="text-[9px] text-zinc-400 font-mono tracking-[0.3em]"
          >
            DATA_ARCHIVE_0{item.id}
          </motion.p>
          <div className={`w-1 h-1 rounded-full ${item.type === 'video' ? 'bg-rose-500 animate-pulse' : 'bg-zinc-700'}`} />
        </div>

        <div className="overflow-hidden">
          <motion.h3 
            animate={{ 
              y: isHovered ? 0 : 60,
              skewY: isHovered ? 0 : 5
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-serif italic text-4xl md:text-5xl leading-tight"
          >
            {item.title}
          </motion.h3>
          <motion.p 
            animate={{ opacity: isHovered ? 0.5 : 0 }}
            className="text-zinc-400 text-[8px] uppercase tracking-[0.5em] mt-4"
          >
            {item.category} // 2026
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default function PhotoArchive() {
  const items = [
    { id: 1, type: 'video', src: Gugu6, title: "The Entrance", span: "md:col-span-8 md:row-span-2", category: "Motion Portrait" },
    { id: 2, type: 'image', src: Gugu1, title: "Stillness", span: "md:col-span-4 md:row-span-1", category: "Static Archive" },
    { id: 3, type: 'image', src: Gugu2, title: "Soft Light", span: "md:col-span-4 md:row-span-1", category: "Detail Study" },
    { id: 4, type: 'video', src: Gugu7, title: "Midnight", span: "md:col-span-4 md:row-span-2", category: "Cinematic" },
    { id: 5, type: 'image', src: Gugu3, title: "Narrative", span: "md:col-span-8 md:row-span-1", category: "Editorial" },
    { id: 6, type: 'image', src: Gugu4, title: "Perspective", span: "md:col-span-6 md:row-span-1", category: "Study" },
    { id: 7, type: 'image', src: Gugu5, title: "Bloom", span: "md:col-span-6 md:row-span-1", category: "Study" },
    { id: 8, type: 'image', src: Gugu8, title: "Moments", span: "md:col-span-5 md:row-span-1", category: "Collection" },
    { id: 9, type: 'image', src: Gugu9, title: "The End", span: "md:col-span-7 md:row-span-1", category: "Collection" },
  ];

  return (
    <section className="min-h-screen py-24 md:py-48 px-4 md:px-10 bg-[#020202]">
      <div className="max-w-[1700px] mx-auto">
        
        {/* Kinetic Header */}
        <header className="mb-24 md:mb-40 flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-12">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-zinc-600 text-[9px] tracking-[1em] uppercase block mb-8"
            >
              Curated Visual Exhibit
            </motion.span>
            <h1 className="text-6xl md:text-[11rem] font-serif italic text-white tracking-tighter leading-[0.8] mix-blend-difference">
              Archive
            </h1>
          </div>
          <div className="hidden md:block text-right pb-4">
             <p className="text-zinc-500 text-[10px] tracking-[0.5em] uppercase">Volume 01</p>
             <p className="text-zinc-800 text-[10px] tracking-[0.5em] uppercase mt-2">March 23, 2026</p>
          </div>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 auto-rows-fr md:auto-rows-[450px]">
          {items.map((item, i) => (
            <MediaCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Minimal Footer */}
        <footer className="mt-40 pt-10 border-t border-white/5 flex justify-between items-center">
          <span className="text-zinc-800 text-[8px] tracking-[1em] uppercase">Gugu Production</span>
          <div className="flex gap-8">
            <span className="text-zinc-600 text-[8px] uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Instagram</span>
            <span className="text-zinc-600 text-[8px] uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Vimeo</span>
          </div>
        </footer>
      </div>
    </section>
  );
}