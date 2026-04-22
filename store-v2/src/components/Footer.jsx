export default function Footer() {
  return (
    <footer className="py-12 px-8 border-t border-ghost/10 bg-ground">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 font-mono text-[10px] tracking-widest text-ghost uppercase">
        
        {/* Brand */}
        <div>
          <span className="text-white block mb-2">REALM OF MOON</span>
          <p className="opacity-50">Official Store · 2026</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-8">
          <a href="#" className="hover:text-neon-cyan transition-colors">Instagram</a>
          <a href="#" className="hover:text-neon-magenta transition-colors">Size Guide</a>
          <a href="#" className="hover:text-neon-yellow transition-colors">Shipping</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Copy */}
        <div className="opacity-40">
          © 2026 Realm of Moon. All artwork original.
        </div>
        
      </div>
    </footer>
  );
}
