import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Droplets, RefreshCw, ShoppingBag, Heart, Ruler } from 'lucide-react';
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
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [showSizeChart, setShowSizeChart] = useState(false);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  // Set default selections if available
  if (!selectedSize && product.sizes && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }
  if (!selectedColor && product.colors && product.colors.length > 0) {
    setSelectedColor(product.colors[0].name);
  }

  // Determine current image based on selected color
  const currentImage = product.colors?.find(c => c.name === selectedColor)?.image || product.image;

  const SizeChart = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute inset-0 z-50 bg-white p-8 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-stone-900">Size Guide</h3>
        <button onClick={() => setShowSizeChart(false)} className="p-2 hover:bg-stone-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="py-4 text-left font-black text-stone-400 uppercase tracking-widest text-[10px]">Size</th>
              <th className="py-4 text-left font-black text-stone-400 uppercase tracking-widest text-[10px]">Chest (in)</th>
              <th className="py-4 text-left font-black text-stone-400 uppercase tracking-widest text-[10px]">Waist (in)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {[
              { s: 'S', c: '34-36', w: '28-30' },
              { s: 'M', c: '38-40', w: '32-34' },
              { s: 'L', c: '42-44', w: '36-38' },
              { s: 'XL', c: '46-48', w: '40-42' },
            ].map((row) => (
              <tr key={row.s}>
                <td className="py-4 font-bold text-stone-900">{row.s}</td>
                <td className="py-4 text-stone-600">{row.c}</td>
                <td className="py-4 text-stone-600">{row.w}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
          <p className="text-xs text-stone-500 leading-relaxed">
            <span className="font-bold text-stone-900 block mb-2">How to measure:</span>
            Chest: Measure around the fullest part of your chest, keeping the tape horizontal.
            <br />
            Waist: Measure around the narrowest part (typically where your body bends side to side), keeping the tape horizontal.
          </p>
        </div>
      </div>
    </motion.div>
  );

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
          <AnimatePresence>
            {showSizeChart && <SizeChart />}
          </AnimatePresence>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-auto bg-stone-50">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={product.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
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

              {/* Variations */}
              <div className="space-y-6">
                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Color: {selectedColor}</span>
                    </div>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            selectedColor === color.name ? 'border-emerald-600 scale-110' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Size</span>
                      <button 
                        onClick={() => setShowSizeChart(true)}
                        className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-700"
                      >
                        <Ruler className="w-3 h-3" />
                        Size Guide
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                            selectedSize === size 
                              ? 'bg-stone-900 text-white border-stone-900' 
                              : 'bg-white text-stone-600 border-stone-200 hover:border-stone-900'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
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
                    addToCart(product, selectedSize, selectedColor);
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
