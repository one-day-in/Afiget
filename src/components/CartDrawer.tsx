import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { CartItem } from './CartItem';
import { CheckoutModal } from './CheckoutModal';
import { formatVND } from '../utils/format';

export const CartDrawer: React.FC = () => {
  const { t, language } = useLanguage();
  const { items, isCartOpen, setIsCartOpen, totalPrice, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const renderPanel = (sidebar: boolean) => (
      <div className={sidebar
        ? 'sticky top-24 h-[calc(100vh-7rem)] max-h-[760px] min-h-[28rem] bg-cream-25 rounded-2xl border border-warm-border/80 shadow-sm overflow-hidden flex flex-col'
        : 'fixed inset-y-0 right-0 z-50 w-full max-w-md bg-cream-50 shadow-2xl flex flex-col border-l border-warm-border'}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-warm-border/70 bg-cream-100/60">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-terracotta-600" />
            <h3 className="font-serif text-xl font-bold text-warm-dark">
              {t.cartTitle}
            </h3>
            {items.length > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cream-200 text-warm-dark">
                {items.length}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-warm-muted hover:text-caramel-700 transition-colors mr-2"
                title={t.clearCart}
              >
                {t.clearCart}
              </button>
            )}
            {!sidebar && <button
              onClick={() => setIsCartOpen(false)}
              aria-label={language === 'ru' ? 'Закрыть корзину' : 'Close cart'}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-cream-200/80 text-warm-muted hover:text-warm-dark hover:bg-cream-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>}
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-cream-200">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-cream-200/80 flex items-center justify-center mb-4 text-warm-muted/60">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-warm-dark mb-1">
                {t.cartEmpty}
              </h4>
              <p className="text-xs text-warm-muted max-w-xs mb-6">
                {t.cartEmptySubtitle}
              </p>
              {!sidebar && <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-warm-dark text-cream-50 rounded-full text-xs font-semibold hover:bg-warm-espresso transition-colors"
              >
                {t.exploreMenu}
              </button>}
            </div>
          ) : (
            items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))
          )}
        </div>

        {/* Footer with Total & Checkout Button */}
        {items.length > 0 && (
          <div className="p-6 border-t border-warm-border/70 bg-cream-100/50 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-base font-medium text-warm-dark">
                <span className="text-warm-muted">{t.orderSummary}:</span>
                <span className="font-bold text-xl font-sans text-warm-dark">
                  {formatVND(totalPrice)}
                </span>
              </div>
              <p className="text-[11px] text-warm-muted leading-tight">
                {t.deliveryNotice}
              </p>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full py-4 bg-warm-chocolate hover:bg-warm-espresso text-cream-50 font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
            >
              <span>{t.checkoutButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
  );

  return (
    <>
      <aside className="hidden lg:block min-w-0 pt-8">{renderPanel(true)}</aside>
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-warm-dark/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          {renderPanel(false)}
        </>
      )}
      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};
