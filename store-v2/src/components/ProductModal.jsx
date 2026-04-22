import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [isAdded, setIsAdded] = useState(false);

  // Urgency Timer Logic
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart({ ...product, selectedSize });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <motion.div 
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-ground/90 backdrop-blur-xl" onClick={onClose}></div>

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl bg-ground border border-ghost/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 text-ghost hover:text-white transition-colors"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Left: Interactive 2D Tilt Image */}
            <div className="w-full md:w-1/2 relative bg-ink/30 border-b md:border-b-0 md:border-r border-ghost/10 p-8 flex items-center justify-center overflow-hidden min-h-[40vh]">
              {/* Registration Marks */}
              <div className="absolute inset-4 border border-ghost/10 pointer-events-none"></div>
              
              <motion.div
                className="relative w-3/4 aspect-[3/4]"
                whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ perspective: 1000 }}
              >
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className={`w-full h-full object-cover shadow-neumorphic-dark ring-1 ${product.neonBorder || 'ring-ghost/20'}`}
                />
              </motion.div>
            </div>

            {/* Right: Product Details & Controls */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center font-mono overflow-y-auto">
              
              {/* Urgency Timer */}
              <div className="mb-8 flex items-center gap-3 text-neon-magenta text-[10px] tracking-widest uppercase animate-pulse">
                <span className="w-2 h-2 rounded-full bg-neon-magenta"></span>
                DROP CLOSES IN: {formatTime(timeLeft)}
              </div>

              {/* Title & Data */}
              <span className={`text-[10px] tracking-widest uppercase mb-4 ${product.neonColor || 'text-neon-cyan'}`}>
                {product.drop}
              </span>
              <h2 className="font-monumental text-5xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-4 uppercase">
                {product.name}
              </h2>
              <p className="text-xl text-ghost mb-8">{product.price}</p>
              
              {/* Specimen Description */}
              <div className="text-xs text-ghost/70 leading-relaxed mb-12 border-l border-ghost/20 pl-4">
                <p><strong>MATERIAL:</strong> 100% HEAVYWEIGHT COTTON 235GSM</p>
                <p><strong>PRINT:</strong> PLASTISOL INK / NEON EXTRACT</p>
                <p><strong>FIT:</strong> BOXY OVERSIZED DROP SHOULDER</p>
              </div>

              {/* Size Selector */}
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[10px] text-ghost tracking-widest uppercase">Select Size</span>
                  <button className="text-[8px] text-ghost/50 hover:text-white underline tracking-widest uppercase">Size Guide</button>
                </div>
                <div className="flex gap-4">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-4 text-xs tracking-widest transition-all duration-300 border ${
                        selectedSize === size 
                          ? `border-white bg-white text-ground` 
                          : `border-ghost/20 text-ghost hover:border-ghost/50`
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAdd}
                disabled={!selectedSize || isAdded}
                className={`w-full py-6 flex items-center justify-center gap-4 border transition-all duration-300 uppercase tracking-[0.2em] text-xs ${
                  isAdded 
                    ? `border-neon-cyan bg-neon-cyan/10 text-neon-cyan`
                    : selectedSize
                      ? `border-white bg-white/5 text-white hover:bg-white hover:text-ground`
                      : `border-ghost/10 text-ghost/30 cursor-not-allowed`
                }`}
              >
                {isAdded ? (
                  <><Check size={18} /> Added to Cart</>
                ) : (
                  selectedSize ? 'Add to Cart' : 'Select a Size'
                )}
              </button>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
