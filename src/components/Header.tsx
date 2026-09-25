import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { formatVND } from '../utils/format';
import { BrandWordmark } from './BrandWordmark';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { totalCount, totalPrice, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-30 bg-cream-50/95 backdrop-blur-md border-b border-warm-border/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Location tag */}
        <div className="flex items-center gap-3">
          <a href={import.meta.env.BASE_URL} className="group flex items-baseline gap-2">
            <BrandWordmark className="text-[35px] sm:text-[43px]" />
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-warm-muted font-medium">
              {t.brandCategory}
            </span>
          </a>
        </div>

        {/* Right side controls: Language switch & Cart button */}
        <div className="flex items-center gap-3 sm:gap-5">
          
          {/* Language Switcher */}
          <div className="flex items-center bg-cream-200/80 p-1 rounded-full border border-warm-border/60 text-xs font-semibold">
            <button
              onClick={() => setLanguage('ru')}
              aria-label="Русский"
              aria-pressed={language === 'ru'}
              className={`px-3 py-1.5 rounded-full transition-all ${
                language === 'ru'
                  ? 'bg-warm-dark text-cream-50 shadow-sm'
                  : 'text-warm-muted hover:text-warm-dark'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage('en')}
              aria-label="English"
              aria-pressed={language === 'en'}
              className={`px-3 py-1.5 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-warm-dark text-cream-50 shadow-sm'
                  : 'text-warm-muted hover:text-warm-dark'
              }`}
            >
              EN
            </button>
          </div>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={language === 'ru' ? 'Открыть корзину' : 'Open Cart'}
            className="relative flex items-center gap-2.5 bg-warm-chocolate hover:bg-warm-espresso text-cream-25 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium text-sm transition-colors duration-200 active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-cream-200" />
            <span className="hidden sm:inline font-semibold">
              {totalCount > 0 ? formatVND(totalPrice) : t.cartTitle}
            </span>
            {totalCount > 0 && (
              <span className="flex items-center justify-center bg-terracotta-500 text-cream-25 text-xs font-bold w-5 h-5 rounded-full">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
