import { Product } from '../types';
import { ShieldCheck, Droplets, RefreshCw, ShoppingCart, Leaf, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-3xl overflow-hidden border border-stone-100 hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-50">
        <motion.div 
          className="w-full h-full"
          animate={{ scale: isHovered ? 1.12 : 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={isHovered && product.secondaryImage ? 'secondary' : 'primary'}
              src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
              alt={product.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
        </motion.div>
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-30 p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 ${
            isWishlisted 
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
              : 'bg-white/80 text-stone-400 hover:text-rose-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Dynamic Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badges?.map((badge, idx) => (
            <div 
              key={idx}
              className="bg-stone-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm border border-white/10"
            >
              {badge}
            </div>
          ))}
          {product.isBioLoop && (
            <div className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
              <RefreshCw className="w-2.5 h-2.5" />
              BIOLOOP
            </div>
          )}
        </div>

        {/* Biodegradability Score Overlay */}
        {product.biodegradabilityLabel && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className="absolute top-3 right-14 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-stone-100 shadow-sm z-10"
          >
            <div className="flex items-center gap-1.5">
              <Leaf className="w-3 h-3 text-emerald-600" />
              <span className="text-[9px] font-black text-stone-900 uppercase tracking-tighter">
                {product.biodegradabilityLabel}
              </span>
            </div>
          </motion.div>
        )}

        {/* Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full bg-stone-900 text-white py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-2xl"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1.5">
          <h3 className="text-sm font-black text-stone-900 group-hover:text-emerald-700 transition-colors tracking-tight">
            {product.title}
          </h3>
          <span className="text-sm font-black text-stone-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">
          {product.materialPassport}
        </p>

        {/* Eco Tag */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 bg-stone-50 text-stone-600 px-3 py-2 rounded-xl border border-stone-100 mb-4 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-100 transition-colors">
            <Droplets className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black tracking-widest uppercase">
              {product.ecoSaving}
            </span>
          </div>

          {/* Sustainability Specs */}
          <div className="space-y-2 pt-4 border-t border-stone-100">
            <div className="flex justify-between items-start text-[10px] gap-4">
              <span className="text-stone-400 font-black uppercase tracking-widest flex-shrink-0">Composition</span>
              <span className="text-stone-900 font-black text-right leading-tight">{product.materialComposition}</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-stone-400 font-black uppercase tracking-widest">Bio-Score</span>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 bg-stone-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${product.biodegradabilityScore}%` }}
                    className="h-full bg-emerald-500" 
                  />
                </div>
                <span className="text-stone-900 font-black">{product.biodegradabilityScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
