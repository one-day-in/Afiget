import React, { useState, useEffect, useRef } from 'react';
import { Minus, Plus, ShoppingBag, Clock, Check } from 'lucide-react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { formatVND, calculateProductPrice, formatAmount } from '../utils/format';
import { productImageUrl } from '../utils/productImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  // State for amount to add
  const [selectedAmount, setSelectedAmount] = useState<number>(product.minimumAmount);
  const [isAddedAnim, setIsAddedAnim] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const addedTimer = useRef<number | null>(null);
  useEffect(() => setSelectedAmount(product.minimumAmount), [product.minimumAmount, product.amountStep]);
  useEffect(() => setImageFailed(false), [product.image]);
  useEffect(() => () => {
    if (addedTimer.current !== null) window.clearTimeout(addedTimer.current);
  }, []);

  const productName = product.name[language] || product.name.ru || product.name.en;
  const productDesc = product.description[language] || product.description.ru || product.description.en;
  const prepTime = product.preparationTime?.[language] || product.preparationTime?.ru;

  const handleDecrease = () => {
    setSelectedAmount((prev) => {
      const next = prev - product.amountStep;
      return next >= product.minimumAmount ? next : prev;
    });
  };

  const handleIncrease = () => {
    setSelectedAmount((prev) => prev + product.amountStep <= 100_000 ? prev + product.amountStep : prev);
  };

  const handleAddToCart = () => {
    if (product.status === 'unavailable') return;
    addToCart(product, selectedAmount);
    setIsAddedAnim(true);
    if (addedTimer.current !== null) window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setIsAddedAnim(false), 1200);
  };

  const currentPrice = calculateProductPrice(product.price, selectedAmount, product.saleType, product.unit);

  // Badge mapping
  const badgeLabels: Record<string, string> = {
    Bestseller: t.bestseller,
    New: t.newBadge,
    Natural: t.natural,
    Classic: t.classic,
    Seasonal: t.seasonal,
  };

  return (
    <div className="group flex flex-col bg-cream-25 rounded-2xl overflow-hidden border border-warm-border/75 shadow-[0_3px_18px_rgba(60,43,33,0.04)] hover:shadow-[0_12px_28px_rgba(60,43,33,0.09)] transition-shadow duration-300">
      
      {/* Product Image Container */}
      <div className="relative aspect-[3/2] w-full bg-cream-200/50 overflow-hidden">
        {product.image && !imageFailed ? (
          <img
            src={productImageUrl(product.image)}
            alt={productName}
            className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-500 ease-out"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-cream-200 text-warm-muted/40 font-serif text-2xl">
            Афиget'
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.08em] text-cream-25 ${
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
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-[25px] font-semibold text-warm-dark leading-[1.04]">
              {productName}
            </h3>
          </div>

          <p className="text-[13px] text-warm-muted leading-[1.55] line-clamp-3 mb-3">
            {productDesc}
          </p>

          <div className="text-xs text-warm-dark mb-4 font-semibold">
            {formatVND(product.price)} <span className="text-warm-muted font-normal">/ {product.unit === '100g' ? (language === 'ru' ? '100 г' : '100 g') : product.unit === 'kg' ? (language === 'ru' ? '1 кг' : '1 kg') : product.unit === 'portion' ? (language === 'ru' ? 'порция' : 'portion') : (language === 'ru' ? 'шт' : 'pc')}</span>
          </div>
        </div>

        {/* Bottom Actions: Amount selector & Price & Add button */}
        <div className="pt-3.5 border-t border-warm-border/55">
          
          {product.status !== 'unavailable' ? (
            <div className="flex flex-col gap-3">
              
              {/* Stepper & Total Calculated */}
              <div className="flex items-center justify-between">
                
                {/* Stepper Buttons */}
                <div className="flex items-center bg-cream-100 rounded-full border border-warm-border/70 p-1">
                  <button
                    onClick={handleDecrease}
                    disabled={selectedAmount <= product.minimumAmount}
                    aria-label={language === 'ru' ? 'Уменьшить количество' : 'Decrease amount'}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-cream-25 text-warm-dark shadow-xs hover:bg-cream-200 disabled:opacity-40 disabled:hover:bg-cream-25 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  
                  <span className="min-w-[4rem] text-center text-xs sm:text-sm font-semibold text-warm-dark px-1.5">
                    {formatAmount(selectedAmount, product.unit, language)}
                  </span>

                  <button
                    onClick={handleIncrease}
                    disabled={selectedAmount + product.amountStep > 100_000}
                    aria-label={language === 'ru' ? 'Увеличить количество' : 'Increase amount'}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-cream-25 text-warm-dark shadow-xs hover:bg-cream-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <span className="font-bold text-sm sm:text-base text-warm-dark tracking-tight">
                    {formatVND(currentPrice)}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors duration-200 ${
                  isAddedAnim
                    ? 'bg-caramel-700 text-cream-25'
                    : 'bg-warm-chocolate hover:bg-warm-espresso text-cream-25'
                }`}
              >
                {isAddedAnim ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.addedToCart}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.addToCart}</span>
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
  );
};
