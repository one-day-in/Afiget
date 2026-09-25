import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { products } from '../data/products';
import { calculateProductPrice } from '../utils/format';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, amount: number) => void;
  updateAmount: (productId: string, amount: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'afiget_cart_items_v1';
const productById = new Map(products.map((product) => [product.id, product]));

function validAmount(product: Product, amount: number): boolean {
  return Number.isSafeInteger(amount) && amount >= product.minimumAmount && amount <= 100_000
    && (amount - product.minimumAmount) % product.amountStep === 0;
}

function restoredAmount(product: Product, amount: number): number | null {
  if (!Number.isSafeInteger(amount) || amount < 1 || amount > 100_000) return null;
  const normalized = product.minimumAmount + Math.max(0,
    Math.ceil((amount - product.minimumAmount) / product.amountStep)) * product.amountStep;
  return normalized <= 100_000 ? normalized : null;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(parsed)) return [];
      const restored: CartItem[] = [];
      for (const entry of parsed) {
        // Accept carts saved by the previous version, but always use current catalog data.
        const productId = entry?.productId ?? entry?.product?.id;
        const product = productById.get(productId);
        if (!product || product.status === 'unavailable' || restored.some((item) => item.product.id === product.id)) continue;
        const amount = restoredAmount(product, entry.amount);
        if (amount !== null) restored.push({ product, amount });
      }
      return restored;
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(
        items.map(({ product, amount }) => ({ productId: product.id, amount }))
      ));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product: Product, amount: number) => {
    const currentProduct = productById.get(product.id);
    if (!currentProduct || currentProduct.status === 'unavailable' || !validAmount(currentProduct, amount)) return;
    setItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === currentProduct.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        const newAmount = updated[existingIdx].amount + amount;
        if (!validAmount(currentProduct, newAmount)) return prev;
        updated[existingIdx] = {
          product: currentProduct,
          amount: newAmount,
        };
        return updated;
      }
      return [...prev, { product: currentProduct, amount }];
    });
  };

  const updateAmount = (productId: string, amount: number) => {
    setItems((prev) => {
      if (amount <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      const product = productById.get(productId);
      if (!product || !validAmount(product, amount)) return prev;
      return prev.map((item) => {
        if (item.product.id === productId) {
          return { product, amount };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  // Total items calculation
  const totalCount = items.length;

  // Total price calculation
  const totalPrice = items.reduce((sum, { product, amount }) =>
    sum + calculateProductPrice(product.price, amount, product.saleType, product.unit), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateAmount,
        removeFromCart,
        clearCart,
        totalCount,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
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
