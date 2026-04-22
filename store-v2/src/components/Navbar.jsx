import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-ground/80 backdrop-blur-md border-b border-ghost/10"
    >
      {/* Brand Logo - Microscopic */}
      <div className="font-mono text-xs tracking-widest text-ghost">
        ᴿᴱᴬᴸᴹ ᴼᶠ ᴹᴼᴼᴺ
      </div>

      {/* Navigation Links - Clinical Coordinates */}
      <ul className="hidden md:flex items-center gap-12 font-mono text-[10px] tracking-widest uppercase text-ghost/70">
        <li>
          <a href="#gallery" className="hover:text-neon-cyan transition-colors duration-300">
            [01] Gallery
          </a>
        </li>
        <li>
          <a href="#collection" className="hover:text-neon-magenta transition-colors duration-300">
            [02] Collection
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-neon-yellow transition-colors duration-300">
            [03] About
          </a>
        </li>
      </ul>

      {/* Cart Button */}
      <button 
        onClick={onOpenCart}
        className="flex items-center gap-3 text-ghost hover:text-white transition-colors group relative"
        aria-label="Cart"
      >
        <ShoppingCart size={18} strokeWidth={1.5} className="group-hover:drop-shadow-neon-cyan" />
        <span className="font-mono text-[10px] tracking-widest">[{cartCount}]</span>
        {/* Subtle hover glow indicator */}
        <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 bg-neon-cyan/5 blur-xl transition-opacity duration-300 pointer-events-none"></div>
      </button>
    </motion.nav>
  );
}
