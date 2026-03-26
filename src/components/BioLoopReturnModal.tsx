import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, Package, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface BioLoopReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BioLoopReturnModal({ isOpen, onClose }: BioLoopReturnModalProps) {
  const [step, setStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const mockPurchasedItems = [
    { id: 'p1', title: 'Hemp Utility Jacket', date: 'Oct 2024', value: 25, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200' },
    { id: 'p2', title: 'Bamboo Essential Tee', date: 'Jan 2025', value: 15, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200' },
  ];

  const handleReturn = () => {
    setStep(3);
    // In a real app, this would call an API
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-stone-400" />
            </button>

            <div className="p-8 md:p-10">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <RefreshCw className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-stone-900 mb-2">BioLoop Return Program</h2>
                    <p className="text-stone-500 text-sm font-medium">
                      Ready to close the loop? Select an item from your history to return for BioThreads credit.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {mockPurchasedItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedItem(item.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                          selectedItem === item.id 
                            ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                            : 'border-stone-100 hover:border-stone-200'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow text-left">
                          <p className="text-sm font-bold text-stone-900">{item.title}</p>
                          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Purchased {item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-emerald-600">฿{item.value}</p>
                          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Credit</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={!selectedItem}
                    onClick={() => setStep(2)}
                    className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:hover:bg-stone-900"
                  >
                    Continue to Return
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 space-y-4">
                    <div className="flex items-center gap-3">
                      <Package className="w-6 h-6 text-emerald-600" />
                      <h3 className="font-black text-stone-900">Return Details</h3>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      We'll send you a <span className="font-bold text-stone-900">biodegradable shipping mailer</span>. 
                      Once we receive and verify the item's material integrity, your credit will be applied.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 p-2 rounded-lg">
                      <ShieldCheck className="w-4 h-4" />
                      Verified Circular Process
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500 font-medium">Estimated Credit</span>
                      <span className="text-stone-900 font-black">฿25.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-500 font-medium">Shipping & Handling</span>
                      <span className="text-emerald-600 font-black uppercase tracking-widest text-[10px]">Free for BioLoop</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-stone-100 text-stone-600 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-stone-200 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleReturn}
                      className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                    >
                      Confirm Return
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center space-y-6 py-4">
                  <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-stone-900 mb-2">Return Initiated!</h2>
                    <p className="text-stone-500 text-sm font-medium leading-relaxed">
                      Your BioLoop mailer is on its way. Check your email for the tracking link and instructions.
                    </p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-2xl inline-block">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Estimated Credit Date</p>
                    <p className="text-sm font-bold text-stone-900">March 30, 2026</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-full bg-stone-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
