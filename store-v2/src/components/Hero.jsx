import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ground bg-grid pt-32">
      {/* Registration Crosshairs */}
      <div className="absolute inset-0 pointer-events-none crosshairs crosshairs-inner z-10"></div>

      <div className="relative z-20 w-full max-w-[90vw] mx-auto flex flex-col items-center justify-center text-center pb-24">
        
        {/* Microscopic Coordinate Label */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <p className="font-mono text-[10px] tracking-widest text-ghost uppercase flex items-center gap-4">
            <span className="w-8 h-[1px] bg-ghost/30"></span>
            NCR · OFFICIAL STORE · 2026
            <span className="w-8 h-[1px] bg-ghost/30"></span>
          </p>
        </motion.div>

        {/* Monumental Title with Glitch */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-monumental text-monumental font-black leading-[0.8] tracking-tighter text-white mix-blend-difference glitch-text"
          data-text="REALM OF MOON"
        >
          REALM<br/>OF MOON
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 text-ghost font-mono text-xs md:text-sm max-w-md tracking-widest uppercase leading-loose"
        >
          Where chaos is the canvas.<br/>Every drop is a statement.
        </motion.p>

        {/* Interactive Button */}
        <motion.a 
          href="#gallery"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px 2px rgba(0, 255, 230, 0.2)" }}
          className="relative z-30 mt-16 px-8 py-4 font-mono text-[10px] tracking-[0.3em] uppercase text-neon-cyan border border-neon-cyan/30 bg-ground/80 backdrop-blur-md shadow-neumorphic-dark hover:border-neon-cyan transition-all duration-300"
        >
          View Exhibition
        </motion.a>

      </div>
    </section>
  );
}
