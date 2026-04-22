import { useState } from 'react';
import { motion } from 'framer-motion';
import realm01 from '../assets/art/realm-01.jpg';
import realm02 from '../assets/art/realm-02.jpg';
import ProductModal from './ProductModal';

const products = [
  { id: 1, name: 'Shark Faith — Oversized Tee', type: 'OVERSIZED TEE', drop: 'FAITH DROP · 001', price: 'Rp 320.000', img: realm01, neonColor: 'text-neon-cyan', neonBorder: 'border-neon-cyan' },
  { id: 2, name: 'Shark Faith — Hoodie', type: 'HOODIE', drop: 'FAITH DROP · 001', price: 'Rp 520.000', img: realm01, neonColor: 'text-neon-cyan', neonBorder: 'border-neon-cyan' },
  { id: 3, name: 'Fatum Brutum — Oversized Tee', type: 'OVERSIZED TEE', drop: 'LEAVING · 002', price: 'Rp 320.000', img: realm02, neonColor: 'text-neon-magenta', neonBorder: 'border-neon-magenta' },
  { id: 4, name: 'Fatum Brutum — Tote Bag', type: 'TOTE Bag', drop: 'LEAVING · 002', price: 'Rp 175.000', img: realm02, neonColor: 'text-neon-magenta', neonBorder: 'border-neon-magenta' },
];

export default function Collection({ onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <section id="collection" className="relative py-32 px-8 bg-ground">
        {/* Registration Crosshairs */}
        <div className="absolute inset-0 pointer-events-none crosshairs crosshairs-inner"></div>

        <div className="max-w-7xl mx-auto mb-24 relative z-10">
          <p className="font-mono text-[10px] tracking-widest text-ghost mb-4 uppercase">
            002 / WEARABLES
          </p>
          <h2 className="font-monumental text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white/90">
            Wear the Canvas
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {products.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group flex flex-col cursor-none"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product Image Box */}
              <div className="relative aspect-[3/4] bg-ink/30 mb-6 p-4 border border-ghost/5 group-hover:border-ghost/20 transition-colors duration-500">
                <div className="absolute top-4 right-4 z-20 px-2 py-1 bg-ground/80 backdrop-blur-sm border border-ghost/10 font-mono text-[8px] tracking-widest text-ghost uppercase">
                  {product.type}
                </div>
                <div className="w-full h-full bg-ink/50 relative overflow-hidden group-hover:shadow-neumorphic-dark transition-all duration-500">
                   {/* Product Image Art Thumbnail */}
                   <img 
                      src={product.img} 
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                   />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow font-mono">
                <span className={`text-[8px] tracking-widest uppercase mb-2 ${product.neonColor}`}>{product.drop}</span>
                <h4 className="text-sm font-medium text-white mb-4 leading-relaxed group-hover:text-white transition-colors">{product.name}</h4>
                
                <div className="mt-auto flex items-center justify-between border-t border-ghost/10 pt-4">
                  <span className="text-xs text-ghost tracking-widest">{product.price}</span>
                  <button 
                    className={`text-[9px] tracking-wider uppercase text-white hover:${product.neonColor} transition-colors px-3 py-1 border border-transparent group-hover:border-ghost/20`}
                  >
                    View Product
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
