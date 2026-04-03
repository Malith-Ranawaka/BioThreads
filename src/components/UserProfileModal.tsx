import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Award, RefreshCw, Droplets, Wind, LogOut, Settings, CreditCard } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const user = {
    name: 'Guest User',
    email: 'guest@biothreads.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    balance: 1250,
    tier: 'Eco-Warrior',
    impact: {
      water: '12,450L',
      co2: '45.2kg',
      items: '12'
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-md bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header / Profile Info */}
            <div className="p-8 bg-stone-50 border-b border-stone-100 flex flex-col items-center text-center relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 hover:bg-stone-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-stone-400" />
              </button>

              <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden mb-4 bg-stone-200">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-2xl font-black text-stone-900 tracking-tight">{user.name}</h2>
              <p className="text-stone-500 text-sm font-medium mb-4">{user.email}</p>
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20">
                <Award className="w-3 h-3" />
                {user.tier}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">BioLoop Credit</p>
                  <p className="text-xl font-black text-emerald-700">฿{user.balance.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-stone-50 rounded-3xl border border-stone-100">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Items Returned</p>
                  <p className="text-xl font-black text-stone-900">{user.impact.items}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest px-2">Impact Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                        <Droplets className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-stone-700">Water Saved</span>
                    </div>
                    <span className="text-sm font-black text-stone-900">{user.impact.water}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-stone-200 rounded-xl text-stone-600">
                        <Wind className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-stone-700">CO2 Offset</span>
                    </div>
                    <span className="text-sm font-black text-stone-900">{user.impact.co2}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t border-stone-100">
                <button className="w-full flex items-center justify-between p-4 hover:bg-stone-50 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                    <span className="text-sm font-bold text-stone-700 group-hover:text-stone-900 transition-colors">Account Settings</span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-stone-200 rounded-full" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-stone-50 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                    <span className="text-sm font-bold text-stone-700 group-hover:text-stone-900 transition-colors">Payment Methods</span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-stone-200 rounded-full" />
                </button>
                <button className="w-full flex items-center gap-3 p-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-bold">Sign Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
