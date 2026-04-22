import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Collection from './components/Collection'
import About from './components/About'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import CustomCursor from './components/CustomCursor'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="bg-ground min-h-screen text-white selection:bg-neon-cyan selection:text-ink cursor-none">
      <CustomCursor />
      <Navbar cartCount={cartItems.length} onOpenCart={() => setIsCartOpen(true)} />
      <Hero />
      <Gallery />
      <Collection onAddToCart={handleAddToCart} />
      <About />
      <Footer />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </main>
  )
}

export default App
