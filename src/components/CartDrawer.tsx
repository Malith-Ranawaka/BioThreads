import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Minus, Plus, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';

import ImpactCounter from './ImpactCounter';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    useBioLoopCredit, 
    setUseBioLoopCredit, 
    bioLoopCreditAmount, 
    finalTotal 
  } = useCart();

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl font-black text-stone-900">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-stone-400" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length > 0 && <ImpactCounter />}
              
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-stone-50 p-6 rounded-full">
                    <ShoppingBag className="w-12 h-12 text-stone-200" />
                  </div>
                  <p className="text-stone-500 font-medium">Your cart is empty.</p>
                  <button
                    onClick={onClose}
                    className="text-emerald-600 font-bold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-stone-50 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-sm font-black text-stone-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex gap-2 mb-2">
                        {item.selectedSize && (
                          <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded font-bold text-stone-600">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded font-bold text-stone-600">
                            Color: {item.selectedColor}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-3">
                        {item.materialPassport}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-stone-50 rounded-full px-3 py-1 border border-stone-100">
                          <button
                            onClick={() => updateQuantity(index.toString(), item.quantity - 1)}
                            className="text-stone-400 hover:text-stone-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index.toString(), item.quantity + 1)}
                            className="text-stone-400 hover:text-stone-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(index.toString())}
                          className="text-stone-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-stone-50 border-t border-stone-100 space-y-4">
                {/* BioLoop Credit Toggle */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 p-2 rounded-xl">
                        <RefreshCw className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">Apply BioLoop Credit</p>
                        <p className="text-[10px] text-stone-500 font-medium">You have $20.00 available</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUseBioLoopCredit(!useBioLoopCredit)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        useBioLoopCredit ? 'bg-emerald-600' : 'bg-stone-200'
                      }`}
                    >
                      <motion.div
                        animate={{ x: useBioLoopCredit ? 24 : 4 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      />
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500 font-medium">Subtotal</span>
                    <span className="text-stone-900 font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  {useBioLoopCredit && (
                    <div className="flex justify-between text-sm text-emerald-600 font-bold">
                      <span>BioLoop Credit</span>
                      <span>-${bioLoopCreditAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg pt-2 border-t border-stone-200">
                    <span className="text-stone-900 font-black">Total</span>
                    <span className="text-stone-900 font-black">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Elements */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-[10px] text-stone-500 font-bold uppercase tracking-tight">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Low-Toxicity Guarantee
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-stone-500 font-bold uppercase tracking-tight">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    Biodegradable Shipping
                  </div>
                </div>

                <button className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-stone-900/10 active:scale-[0.98]">
                  Place Order
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
