import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const FloatingCartButton: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen } = useCart();
  const { language } = useLanguage();
  const count = items.reduce(
    (sum, { product, amount }) => sum + (product.saleType === 'quantity' ? amount : 1),
    0,
  );

  if (count === 0 || isCartOpen) return null;

  return (
    <button
      type="button"
      onClick={() => setIsCartOpen(true)}
      aria-label={language === 'ru' ? 'Открыть корзину' : 'Open Cart'}
      className="print-button fixed z-30 w-[70px] h-[70px] flex items-center justify-center rounded-full border-2 border-cream-25/75 bg-warm-chocolate hover:bg-warm-espresso text-cream-25 transition-colors duration-200 active:scale-[0.98]"
      style={{
        right: 'calc(16px + env(safe-area-inset-right, 0px))',
        bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <ShoppingBag className="w-7 h-7 text-cream-200" aria-hidden="true" />
      <span className="absolute -top-1 -right-1 min-w-6 h-6 px-1.5 flex items-center justify-center rounded-sm border border-warm-chocolate bg-cream-25 text-warm-chocolate text-xs font-bold">
        {count}
      </span>
    </button>
  );
};
