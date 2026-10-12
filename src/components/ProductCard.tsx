import React, { useState, useEffect, useRef } from 'react';
import { Minus, Plus, ShoppingBag, Clock, Check } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { formatVND, formatAmount, formatPriceUnit } from '../utils/format';
import { productImageUrl } from '../utils/productImage';
import { useProductSelection } from '../hooks/useProductSelection';

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product, trigger: HTMLButtonElement) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpen }) => {
  const { language, t } = useLanguage();
  const { amount, canDecrease, canIncrease, decrease, increase, currentPrice, addSelectedToCart } = useProductSelection(product);

  const [isAddedAnim, setIsAddedAnim] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const addedTimer = useRef<number | null>(null);
  useEffect(() => setImageFailed(false), [product.image]);
  useEffect(() => () => {
    if (addedTimer.current !== null) window.clearTimeout(addedTimer.current);
  }, []);

  const productName = product.name[language] || product.name.ru || product.name.en;
  const prepTime = product.preparationTime?.[language] || product.preparationTime?.ru;

  const handleAddToCart = () => {
    if (product.status === 'unavailable') return;
    addSelectedToCart();
    setIsAddedAnim(true);
    if (addedTimer.current !== null) window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setIsAddedAnim(false), 1200);
  };

  // Badge mapping
  const badgeLabels: Record<string, string> = {
    Bestseller: t.bestseller,
    New: t.newBadge,
    Natural: t.natural,
    Classic: t.classic,
    Seasonal: t.seasonal,
  };

  return (
    <div className="group min-w-0 flex flex-col bg-cream-25 rounded-xl overflow-hidden border border-warm-border/90 shadow-[0_2px_12px_rgba(84,41,15,0.07)] hover:shadow-[0_10px_24px_rgba(84,41,15,0.14)] transition-shadow duration-300">
      
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] shrink-0 w-full bg-cream-100/60 overflow-hidden border-b border-warm-border/55">
        {product.image && !imageFailed ? (
          <button type="button" onClick={(event) => onOpen(product, event.currentTarget)}
            aria-label={`${t.viewProductDetails}: ${productName}`}
            className="block w-full h-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-caramel-700">
            <img
              src={productImageUrl(product.image)}
              alt={productName}
              className="w-full h-full object-contain"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          </button>
        ) : (
          <button type="button" onClick={(event) => onOpen(product, event.currentTarget)}
            aria-label={`${t.viewProductDetails}: ${productName}`}
            className="w-full h-full flex items-center justify-center bg-cream-200 text-warm-muted/40 font-serif text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-caramel-700">
            Afiget’
          </button>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-sm border border-cream-25/35 text-[10px] font-bold uppercase tracking-[0.08em] text-cream-25 ${
              product.badge === 'Bestseller' ? 'bg-terracotta-500' : product.badge === 'Natural' ? 'bg-caramel-600' : 'bg-warm-espresso/95'
            }`}>
              {badgeLabels[product.badge] || product.badge}
            </span>
          )}

          {product.status === 'preorder' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-cream-25/95 text-caramel-700 border border-caramel-500/40">
              <Clock className="w-3 h-3 text-caramel-700" />
              {prepTime || t.statusPreorder}
            </span>
          )}

          {product.status === 'unavailable' && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-warm-espresso/95 text-cream-25">
              {t.unavailable}
            </span>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col gap-3 min-w-0">
        <div className="grid grid-cols-[minmax(0,1fr)] auto-rows-auto gap-2.5 min-w-0 shrink-0">
          <h3 className="min-w-0">
            <button type="button" onClick={(event) => onOpen(product, event.currentTarget)}
              className="block w-full min-w-0 whitespace-normal [overflow-wrap:anywhere] text-left font-serif text-[15px] sm:text-lg leading-normal font-semibold text-warm-chocolate hover:text-caramel-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel-700 rounded-sm">
              {productName}
            </button>
          </h3>

          <p className="min-w-0 line-clamp-3 [overflow-wrap:anywhere] text-xs leading-[1.45] text-warm-muted">
            {product.description[language]}
          </p>
        </div>

        {/* Price and controls stay below the naturally sized text. */}
        <div className="mt-auto min-w-0 shrink-0">
          <div className="text-[12px] sm:text-sm text-warm-chocolate mb-3 font-bold leading-snug break-words">
            {formatVND(product.price)} <span className="text-warm-muted font-normal text-[11px] sm:text-xs">/ {formatPriceUnit(product.unit, language)}</span>
          </div>

          {/* Bottom Actions: Amount selector & Price & Add button */}
          <div className="pt-2.5 border-t border-warm-border/70">

            {product.status !== 'unavailable' ? (
              <div className="flex flex-col gap-2">

                {/* Stepper & Total Calculated */}
                <div className="flex flex-col gap-1.5 min-w-0">

                  {/* Stepper Buttons */}
                  <div className="flex items-center min-w-0 bg-cream-100 rounded-full border border-warm-border/70 p-1">
                    <button
                      onClick={decrease}
                      disabled={!canDecrease}
                      aria-label={language === 'ru' ? 'Уменьшить количество' : 'Decrease amount'}
                      className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-cream-25 text-warm-dark shadow-xs hover:bg-cream-200 disabled:opacity-40 disabled:hover:bg-cream-25 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="min-w-0 flex-1 text-center text-[11px] sm:text-xs font-semibold text-warm-dark px-0.5 break-words">
                      {formatAmount(amount, product.unit, language)}
                    </span>

                    <button
                      onClick={increase}
                      disabled={!canIncrease}
                      aria-label={language === 'ru' ? 'Увеличить количество' : 'Increase amount'}
                      className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-cream-25 text-warm-dark shadow-xs hover:bg-cream-200 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-warm-dark tracking-tight break-words">
                      {formatVND(currentPrice)}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`print-button w-full min-h-10 py-2 px-1.5 rounded-lg border border-warm-chocolate/25 font-semibold uppercase tracking-[0.03em] text-[11px] sm:text-xs flex items-center justify-center gap-1 min-w-0 transition-colors duration-200 ${
                    isAddedAnim
                      ? 'bg-caramel-700 text-cream-25'
                      : 'bg-warm-chocolate hover:bg-warm-espresso text-cream-25'
                  }`}
                >
                  {isAddedAnim ? (
                    <>
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span className="break-words">{t.addedToCart}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span className="break-words">{t.addToCart}</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <button type="button" disabled className="w-full py-3 text-center text-xs font-semibold text-warm-muted bg-cream-100 rounded-xl cursor-not-allowed">
                {t.unavailable}
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
