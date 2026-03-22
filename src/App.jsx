import { motion, useScroll, useSpring } from "framer-motion";
import GuguExperience from "./Pages/GuguExperience";

function App() {
  // The progress bar adds that premium "Apple-style" touch
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#050505] selection:bg-white selection:text-black min-h-screen">
      
      {/* 1. Progress Bar (Fixed at top) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-zinc-500 origin-left z-[100]" 
        style={{ scaleX }} 
      />

      {/* 2. The Main Experience 
          This component now contains:
          - BirthdayHero (The Entrance)
          - PhotoArchive (The Bento Grid)
          - BeautifulThings (The Interactive Reveal)
          - BirthdayLetter (The Final Note)
      */}
      <GuguExperience />

      {/* 3. Global Decorative Footer */}
      <footer className="py-20 text-center bg-[#050505] border-t border-zinc-900/50">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-[9px] uppercase tracking-[0.5em] text-zinc-800"
        >
          March 23 • For Gugu • Designed with Love by Justa
        </motion.p>
      </footer>
    </div>
  );
}

export default App;