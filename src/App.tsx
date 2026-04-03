import { useState, useRef, useEffect } from 'react';
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
import StaticPageModal, { StaticPageType } from './components/StaticPageModal';
import UserProfileModal from './components/UserProfileModal';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [staticPageType, setStaticPageType] = useState<StaticPageType | null>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchQuery]);

  const openStaticPage = (type: StaticPageType) => {
    setStaticPageType(type);
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col">
          <Header 
            onOpenCart={() => setIsCartOpen(true)} 
            onOpenReturn={() => setIsReturnModalOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <BioLoopReturnModal isOpen={isReturnModalOpen} onClose={() => setIsReturnModalOpen(false)} />
          <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
          <StaticPageModal 
            isOpen={staticPageType !== null} 
            onClose={() => setStaticPageType(null)} 
            type={staticPageType} 
          />
          
          <main className="flex-grow">
          <Hero onShopNow={() => productsRef.current?.scrollIntoView({ behavior: 'smooth' })} />
          
          <CategoryBar 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />

          {/* Section Header */}
          <div 
            ref={productsRef}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-4 flex items-end justify-between scroll-mt-24"
          >
            <div>
              <motion.h2 
                key={activeCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-black tracking-tight text-stone-900 capitalize"
              >
                {searchQuery ? `Search Results for "${searchQuery}"` : (activeCategory === 'all' ? 'Trending Sustainable Picks' : activeCategory.replace('-', ' '))}
              </motion.h2>
              <p className="text-stone-500 text-sm font-medium mt-1">
                {searchQuery ? `Found results matching your search.` : `Curated for style and environmental impact.`}
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

          <ProductGrid category={activeCategory} searchQuery={searchQuery} />
          
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
                  <li><button onClick={() => { setActiveCategory('all'); setSearchQuery(''); productsRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-emerald-400 transition-colors text-left w-full">New Arrivals</button></li>
                  <li><button onClick={() => openStaticPage('material-passport')} className="hover:text-emerald-400 transition-colors text-left w-full">Material Passport</button></li>
                  <li><button onClick={() => { setActiveCategory('bioloop'); setSearchQuery(''); productsRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-emerald-400 transition-colors text-left w-full">BioLoop Collection</button></li>
                  <li><button onClick={() => openStaticPage('eco-guide')} className="hover:text-emerald-400 transition-colors text-left w-full">Eco-Saving Guide</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Support</h4>
                <ul className="space-y-4 text-sm">
                  <li><button onClick={() => openStaticPage('shipping')} className="hover:text-emerald-400 transition-colors text-left w-full">Shipping & Returns</button></li>
                  <li><button onClick={() => openStaticPage('contact')} className="hover:text-emerald-400 transition-colors text-left w-full">Contact Us</button></li>
                  <li><button onClick={() => openStaticPage('faq')} className="hover:text-emerald-400 transition-colors text-left w-full">FAQ</button></li>
                  <li><button onClick={() => openStaticPage('privacy')} className="hover:text-emerald-400 transition-colors text-left w-full">Privacy Policy</button></li>
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
