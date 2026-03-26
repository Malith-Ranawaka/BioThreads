import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Droplets, RefreshCw, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-auto bg-stone-50">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            
            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className={`absolute top-6 left-6 z-10 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                isWishlisted 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                  : 'bg-white/80 text-stone-400 hover:text-rose-500 hover:bg-white shadow-lg'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {product.isBioLoop && (
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                      BioLoop Collection
                    </span>
                  )}
                  <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">
                    {product.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight mb-2">
                  {product.title}
                </h2>
                <p className="text-2xl font-black text-emerald-700">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Description (The Hook & Details) */}
              <div className="space-y-4">
                <p className="text-lg font-bold text-stone-800 leading-relaxed italic border-l-4 border-emerald-500 pl-4">
                  {product.description.split('. ')[0]}.
                </p>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {product.description.split('. ').slice(1).join('. ')}
                </p>
              </div>

              {/* Material Passport Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Composition</span>
                  </div>
                  <p className="text-xs font-bold text-stone-900">{product.materialComposition}</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Eco Impact</span>
                  </div>
                  <p className="text-xs font-bold text-stone-900">{product.ecoSaving}</p>
                </div>
              </div>

              {/* Detailed Material Passport */}
              <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Material Passport</h4>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Verified Circular</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-500 font-medium">Biodegradability</span>
                    <span className="text-stone-900 font-bold">{product.biodegradabilityScore}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${product.biodegradabilityScore}%` }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                  <p className="text-[10px] text-stone-400 font-medium italic">
                    {product.biodegradabilityLabel}
                  </p>
                </div>
                <div className="pt-2">
                  <p className="text-[10px] text-stone-500 leading-relaxed">
                    {product.materialPassport}
                  </p>
                </div>
              </div>

              {/* BioLoop Value Callout */}
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
                <div className="bg-emerald-600 p-3 rounded-2xl text-white">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-1">BioLoop Value</p>
                  <p className="text-sm font-bold text-emerald-900">
                    Return this item when worn out for ${product.returnValue.toFixed(0)} BioThreads credit.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="flex-1 bg-stone-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-stone-900/10"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <div className="flex items-center justify-center px-6 py-4 bg-stone-50 rounded-2xl text-[10px] font-black text-stone-400 uppercase tracking-widest">
                  Stock: {product.stockLevel} units
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
