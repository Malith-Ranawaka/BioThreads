import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Gift, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ImpactCounter() {
  const { subtotal } = useCart();
  const goal = 150; // $150 to divert 1kg
  const progress = Math.min((subtotal / goal) * 100, 100);
  const remaining = Math.max(goal - subtotal, 0);
  const isUnlocked = subtotal >= goal;

  return (
    <div className="bg-sand/30 rounded-3xl p-5 border border-sand/50 space-y-4">
      <div className="flex items-start gap-3">
        <div className="bg-sage p-2 rounded-xl shadow-sm">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-black text-slate-earth uppercase tracking-tight">
            Circular Impact Counter
          </h4>
          <p className="text-[11px] text-slate-earth/70 font-medium leading-tight mt-0.5">
            {isUnlocked 
              ? "Incredible! You've diverted 1kg of textile waste from Australian landfills."
              : `You are $${remaining.toFixed(0)} away from diverting 1kg of textile waste from Australian landfills.`}
          </p>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-3 bg-stone-200/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-sage rounded-full"
        />
      </div>

      {/* Reward Unlock */}
      <div className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-500 ${
        isUnlocked ? 'bg-sage/10 border border-sage/30' : 'bg-stone-100/50 border border-stone-200'
      }`}>
        <div className={`p-1.5 rounded-lg transition-colors ${
          isUnlocked ? 'bg-sage text-white' : 'bg-stone-200 text-stone-400'
        }`}>
          {isUnlocked ? <CheckCircle2 className="w-4 h-4" /> : <Gift className="w-4 h-4" />}
        </div>
        <div className="flex-1">
          <p className={`text-[10px] font-black uppercase tracking-widest ${
            isUnlocked ? 'text-sage' : 'text-stone-400'
          }`}>
            {isUnlocked ? 'Reward Unlocked' : 'Next Reward'}
          </p>
          <p className={`text-xs font-bold ${
            isUnlocked ? 'text-slate-earth' : 'text-stone-500'
          }`}>
            Free BioLoop Shipping Label
          </p>
        </div>
        {isUnlocked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-sage text-white text-[9px] font-black px-2 py-1 rounded-md"
          >
            CLAIMED
          </motion.div>
        )}
      </div>
    </div>
  );
}
