import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthdayHero from './BirthDayHero';
import PhotoArchive from './PhotoArchive'; // The Bento Grid we made
import BeautifulThings from './BeautifulThings'; // The New Interactive Section
import MemoryGallery from "./MemoryGallery";

export default function GuguExperience() {
  const [showArchive, setShowArchive] = useState(false);

  return (
    <main className="bg-[#050505] min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!showArchive ? (
          /* PHASE 1: THE ENTRANCE */
          <motion.div 
            key="hero"
            exit={{ y: -100, opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Ensure your BirthdayHero has an 'onEnter' prop on its button */}
            <BirthdayHero onEnter={() => setShowArchive(true)} />
          </motion.div>
        ) : (
          /* PHASE 2: THE FULL JOURNEY */
          <motion.div 
            key="archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* 1. The Visual Archive (Bento Grid) */}
            <PhotoArchive />

            {/* 2. The Interactive Reveal (The "Beautiful Things") */}
            <BeautifulThings />

            {/* 3. The Final Emotional Note (The Letter) */}
            <MemoryGallery />

            {/* 4. The Developer's Signature */}
            <footer className="py-20 text-center border-t border-zinc-900">
               <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-700">
                 Designed for Gugu • 23 March 2026 • Shimla
               </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}