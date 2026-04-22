import { motion } from 'framer-motion';
import realm01 from '../assets/art/realm-01.jpg';
import realm02 from '../assets/art/realm-02.jpg';

const artworks = [
  {
    id: '01',
    title: 'Faith Drop',
    desc: 'A figure crowned by a shark — emblem of predatory grace and spiritual weight. Heavy outlines born from urban ink culture, bleeding neon life.',
    tag: 'FAITH / URBAN SURREALISM',
    edition: 'ED. 001',
    price: 'Rp 320.000',
    img: realm01,
    neonColor: 'text-neon-cyan',
    neonRing: 'ring-neon-cyan',
    neonBgHover: 'hover:bg-neon-cyan/10 hover:text-neon-cyan',
    neonShadow: 'shadow-neon-cyan',
  },
  {
    id: '02',
    title: 'Leaving',
    desc: 'Amor Fati — love of fate. A seated figure mid-departure, surrounded by glitch-objects and ghost fire. Surrender rendered as fine art.',
    tag: 'LEAVING / FATUM BRUTUM',
    edition: 'ED. 002',
    price: 'Rp 320.000',
    img: realm02,
    neonColor: 'text-neon-magenta',
    neonRing: 'ring-neon-magenta',
    neonBgHover: 'hover:bg-neon-magenta/10 hover:text-neon-magenta',
    neonShadow: 'shadow-neon-magenta',
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-32 px-8 min-h-screen bg-ground">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-24">
        <p className="font-mono text-[10px] tracking-widest text-ghost mb-4 uppercase">
          001 / FEATURED ARTWORK
        </p>
        <h2 className="font-monumental text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white/90">
          The Collection
        </h2>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-16">
        {artworks.map((art, index) => (
          <motion.div 
            key={art.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className="group relative"
          >
            {/* Neumorphic Card Base */}
            <div className="p-8 rounded-[2rem] bg-ground shadow-neumorphic-dark border border-white/5 transition-all duration-500">
              
              {/* Art Frame with Neon Bleed */}
              <div className="relative aspect-[3/4] mb-8 overflow-hidden rounded-xl bg-ink/50">
                {/* Simulated Neon Bleed Border */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ring-1 ring-inset ${art.neonRing} ${art.neonShadow} rounded-xl z-20`}></div>
                
                {/* Registration Marks on Art */}
                <div className="absolute inset-4 border border-ghost/10 z-10 pointer-events-none mix-blend-difference"></div>
                
                {/* Artwork Image */}
                <img 
                  src={art.img} 
                  alt={art.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay Tags */}
                <div className="absolute bottom-6 left-6 z-30 font-mono">
                  <span className="text-white text-4xl font-light leading-none">{art.id}</span>
                  <p className="text-[8px] tracking-widest text-ghost mt-2 uppercase">{art.tag}</p>
                </div>
              </div>

              {/* Data Annotation Block (Specimen Data) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-mono text-[10px] tracking-wider text-ghost uppercase">
                <div className="md:col-span-4">
                  <h3 className="text-white text-lg tracking-normal font-medium mb-1">{art.title}</h3>
                  <span className="text-ghost/50">{art.edition}</span>
                </div>
                <div className="md:col-span-8">
                  <p className="leading-relaxed mb-6 opacity-80 normal-case tracking-normal text-xs">{art.desc}</p>
                  <div className="flex items-center gap-4">
                    <button className="px-6 py-3 border border-ghost/20 hover:border-white transition-colors">
                      View Full
                    </button>
                    <button className={`px-6 py-3 border border-transparent bg-white/5 ${art.neonBgHover} transition-colors flex items-center gap-2`}>
                      <span>{art.price}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
