import { useState } from 'react';
import Header from './components/Header';
import Logo from './components/Logo';
import Hero from './components/Hero';
import CategoryBar from './components/CategoryBar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import BioLoopReturnModal from './components/BioLoopReturnModal';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { motion } from 'motion/react';

import ImpactDashboard from './components/ImpactDashboard';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col">
          <Header 
            onOpenCart={() => setIsCartOpen(true)} 
            onOpenReturn={() => setIsReturnModalOpen(true)}
          />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <BioLoopReturnModal isOpen={isReturnModalOpen} onClose={() => setIsReturnModalOpen(false)} />
          
          <main className="flex-grow">
          <Hero />
          
          <CategoryBar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          {/* Section Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4 flex items-end justify-between">
            <div>
              <motion.h2 
                key={activeCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-black tracking-tight text-stone-900 capitalize"
              >
                {activeCategory === 'all' ? 'Trending Sustainable Picks' : activeCategory.replace('-', ' ')}
              </motion.h2>
              <p className="text-stone-500 text-sm font-medium mt-1">
                Curated for style and environmental impact.
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
              <span>Sort by:</span>
              <select className="bg-transparent border-none focus:ring-0 text-stone-900 cursor-pointer">
                <option>Impact (Eco-Saving)</option>
                <option>Price: Low to High</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <ProductGrid category={activeCategory} />
          
          <ImpactDashboard />
        </main>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <Logo className="items-start mb-6" showTagline={true} />
                <p className="max-w-md text-sm leading-relaxed mt-4">
                  We're on a mission to revolutionize fashion through circularity. 
                  Our BioLoop program ensures that every thread we produce stays 
                  out of landfills and in your wardrobe.
                </p>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Marketplace</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Material Passport</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">BioLoop Collection</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Eco-Saving Guide</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Support</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Shipping & Returns</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs">© 2026 BioThreads. All rights reserved.</p>
              <div className="flex gap-6 text-xs">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
