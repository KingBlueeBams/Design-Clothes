import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative py-32 px-8 min-h-screen flex items-center bg-ground overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        
        {/* Manifesto Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-mono text-[10px] tracking-widest text-ghost mb-8 uppercase">
            003 / MANIFESTO
          </p>
          <h2 className="font-monumental text-4xl md:text-6xl font-bold tracking-tighter text-white/90 leading-[0.85] mb-12">
            Born from the friction<br/>between noise and silence.
          </h2>
          
          <div className="font-mono text-xs md:text-sm tracking-wide text-ghost/80 space-y-8 leading-loose max-w-lg">
            <p>
              REALM OF MOON is a wearable art label. Every piece starts as a raw,
              maximalist artwork — chaotic, inked, surrealist — then gets contained
              inside the most minimal, clinical frame possible. 
            </p>
            <p>
              The garment is the museum. Your body is the wall.
            </p>
            <p className="text-white border-l border-neon-yellow pl-6">
              Limited drops. Original art. No reprints.
            </p>
          </div>
        </motion.div>

        {/* Visual Palette Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 relative flex items-center justify-center">
            {/* The Neumorphic Block */}
            <div className="absolute inset-0 rounded-full bg-ground shadow-neumorphic-dark flex items-center justify-center border border-white/5">
              <span className="font-monumental text-8xl text-ghost/10 font-black tracking-tighter">NCR</span>
            </div>
            
            {/* Orbiting Neon Palettes */}
            <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-neon-cyan shadow-[0_0_15px_rgba(0,255,230,0.8)]"></div>
              <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-4 h-4 rounded-full bg-neon-magenta shadow-[0_0_15px_rgba(255,20,170,0.8)]"></div>
              <div className="absolute bottom-1/4 left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-yellow shadow-[0_0_15px_rgba(210,255,0,0.8)]"></div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
