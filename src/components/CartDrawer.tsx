import React, { useState } from 'react';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
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
        ? 'sticky top-20 h-[calc(100vh-6rem)] max-h-[760px] min-h-[28rem] bg-cream-25 rounded-xl border border-warm-border/90 shadow-[0_6px_24px_rgba(84,41,15,0.09)] overflow-hidden flex flex-col'
        : 'fixed inset-y-0 right-0 z-50 w-full max-w-md bg-cream-25 shadow-2xl flex flex-col border-l border-warm-border'}
        style={sidebar ? undefined : {
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
        }}>
        
        {/* Header */}
        <div
          className="shrink-0 flex items-center gap-2.5 px-6 py-5 border-b border-warm-border/70 bg-cream-100/60"
          style={sidebar ? undefined : { paddingTop: 'calc(1.25rem + env(safe-area-inset-top, 0px))' }}
        >
          {!sidebar && (
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label={language === 'ru' ? 'Закрыть корзину' : 'Close cart'}
              className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full bg-cream-200/80 text-warm-muted hover:text-warm-dark hover:bg-cream-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {sidebar && <ShoppingBag className="w-5 h-5 shrink-0 text-terracotta-600" />}
          <h3 className="min-w-0 font-serif text-xl font-bold text-warm-dark">
            {t.cartTitle}
          </h3>
          {items.length > 0 && (
            <span className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full bg-cream-200 text-warm-dark">
              {items.length}
            </span>
          )}
        </div>

        {/* Content List */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-2">
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
            <>
              <div className="divide-y divide-cream-200">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
              <div className="flex justify-end border-t border-cream-200 py-2">
                <button
                  onClick={clearCart}
                  className="min-h-11 inline-flex items-center justify-center gap-2 px-2 text-xs text-warm-muted hover:text-caramel-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {t.clearCart}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer with Total & Checkout Button */}
        {items.length > 0 && (
          <div
            className="shrink-0 p-6 border-t border-warm-border/70 bg-cream-100/50 space-y-4"
            style={sidebar ? undefined : { paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between text-base font-medium text-warm-dark">
                <span className="text-warm-muted">{t.orderSummary}:</span>
                <span className="font-bold text-xl font-sans text-warm-dark">
                  {formatVND(totalPrice)}
                </span>
              </div>
              <p className="text-xs text-warm-muted leading-snug">
                {t.deliveryNotice}
              </p>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="print-button w-full py-4 bg-warm-chocolate hover:bg-warm-espresso text-cream-25 font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
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
