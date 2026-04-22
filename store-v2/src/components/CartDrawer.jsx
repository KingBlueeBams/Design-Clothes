import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem }) {
  const total = cartItems.reduce((sum, item) => {
    // Basic price parsing for this prototype (e.g. "Rp 320.000" -> 320000)
    const priceNum = parseInt(item.price.replace(/\D/g, ''));
    return sum + priceNum;
  }, 0);

  const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(total);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ground/80 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ground border-l border-ghost/10 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-ghost/10">
              <h2 className="font-monumental text-3xl font-bold tracking-tighter text-white uppercase">Cart</h2>
              <button onClick={onClose} className="text-ghost hover:text-neon-magenta transition-colors">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-8 space-y-8 font-mono">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-ghost text-xs tracking-widest uppercase">
                  <div className="w-16 h-16 border border-ghost/20 rounded-full flex items-center justify-center mb-4">0</div>
                  Cart is empty
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 items-center group"
                  >
                    <div className="w-16 h-20 bg-ink/50 border border-ghost/10 flex-shrink-0 relative overflow-hidden">
                      {item.img ? (
                        <img src={item.img} alt={item.name || item.title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[6px] text-ghost/50 text-center">Asset</div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <span className={`text-[8px] tracking-widest uppercase ${item.neonColor || 'text-neon-cyan'}`}>{item.drop || item.tag}</span>
                      <h4 className="text-xs text-white mt-1">{item.name || item.title}</h4>
                      <p className="text-xs text-ghost mt-2">{item.price}</p>
                    </div>
                    <button onClick={() => onRemoveItem(idx)} className="text-ghost/50 hover:text-neon-magenta p-2 transition-colors">
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-ghost/10 bg-ground/90 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6 font-mono text-sm">
                <span className="text-ghost uppercase tracking-widest">Total</span>
                <span className="text-white">{formattedTotal}</span>
              </div>
              <button 
                disabled={cartItems.length === 0}
                className="w-full py-4 bg-white/5 border border-ghost/20 text-white font-mono text-[10px] tracking-widest uppercase hover:bg-white hover:text-ground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
