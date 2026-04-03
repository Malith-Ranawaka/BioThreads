import React, { createContext, useContext, useState, useMemo } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  useBioLoopCredit: boolean;
  setUseBioLoopCredit: (use: boolean) => void;
  bioLoopCreditAmount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [useBioLoopCredit, setUseBioLoopCredit] = useState(false);
  const bioLoopCreditAmount = 20;

  const addToCart = (product: Product, size?: string, color?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existingIndex !== -1) {
        const newCart = [...prev];
        newCart[existingIndex] = { ...newCart[existingIndex], quantity: newCart[existingIndex].quantity + 1 };
        return newCart;
      }
      const newItem: CartItem = { 
        ...product, 
        quantity: 1, 
        selectedSize: size, 
        selectedColor: color,
        // We need a unique ID for the cart item if we want to remove/update easily
        // But for now let's use the index or a composite key
      };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (itemId: string) => {
    // We'll use a composite key or just the index for simplicity in this demo
    // But let's stick to the current logic and just filter by ID + variations if needed
    // Actually, let's change the logic to use a unique cartItemId
    setCart((prev) => prev.filter((_, index) => index.toString() !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item, index) => (index.toString() === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  
  const finalTotal = useMemo(() => {
    const total = subtotal > 0 ? subtotal : 0;
    if (useBioLoopCredit && total > 0) {
      return Math.max(0, total - bioLoopCreditAmount);
    }
    return total;
  }, [subtotal, useBioLoopCredit]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        useBioLoopCredit,
        setUseBioLoopCredit,
        bioLoopCreditAmount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
