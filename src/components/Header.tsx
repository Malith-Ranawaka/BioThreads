import { Search, User, ShoppingCart, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Logo from './Logo';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenReturn: () => void;
}

export default function Header({ onOpenCart, onOpenReturn }: HeaderProps) {
  const { totalItems } = useCart();
  const balance = 1250; // Mock BioLoop credit balance

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo showTagline={true} />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search sustainable fashion..."
              className="block w-full pl-10 pr-3 py-2 border border-stone-200 rounded-full bg-stone-50 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={onOpenReturn}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-full hover:bg-emerald-100 transition-colors border border-emerald-100"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest">Return for Credit</span>
            </button>

            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">BioLoop Credit</span>
              <span className="text-sm font-bold text-emerald-700">฿{balance.toLocaleString()}</span>
            </div>

            <button className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors relative">
              <User className="w-5 h-5" />
            </button>

            <button 
              onClick={onOpenCart}
              className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
