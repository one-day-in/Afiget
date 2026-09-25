import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { formatVND, calculateProductPrice, formatAmount } from '../utils/format';
import { productImageUrl } from '../utils/productImage';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { language } = useLanguage();
  const { updateAmount, removeFromCart } = useCart();
  const { product, amount } = item;
  const [imageFailed, setImageFailed] = useState(false);

  const productName = product.name[language] || product.name.ru || product.name.en;
  const lineTotal = calculateProductPrice(product.price, amount, product.saleType, product.unit);

  const handleDecrease = () => {
    const nextAmount = amount - product.amountStep;
    if (nextAmount < product.minimumAmount) {
      removeFromCart(product.id);
    } else {
      updateAmount(product.id, nextAmount);
    }
  };

  const handleIncrease = () => {
    if (amount + product.amountStep <= 100_000) updateAmount(product.id, amount + product.amountStep);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-cream-200/90 items-center">
      {/* Thumbnail */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-cream-200 overflow-hidden flex-shrink-0 border border-warm-border/50">
        {product.image && !imageFailed ? (
          <img
            src={productImageUrl(product.image)}
            alt={productName}
            className="w-full h-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-serif text-warm-muted/50 text-sm">
            Афиget'
          </div>
        )}
      </div>

      {/* Info & Controls */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-serif text-sm sm:text-base font-bold text-warm-dark truncate">
            {productName}
          </h4>
          <button
            onClick={() => removeFromCart(product.id)}
            aria-label={language === 'ru' ? `Удалить ${productName}` : `Remove ${productName}`}
            className="text-warm-muted hover:text-caramel-700 transition-colors p-1"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-warm-muted mb-2">
          {formatVND(product.price)} / {product.unit === '100g' ? '100g' : product.unit}
        </div>

        {/* Stepper + Subtotal */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center bg-cream-100 rounded-full border border-warm-border/60 p-0.5">
            <button
              onClick={handleDecrease}
              aria-label={language === 'ru' ? 'Уменьшить количество' : 'Decrease cart amount'}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-25 text-warm-dark shadow-xs hover:bg-cream-200"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="min-w-[3.5rem] text-center text-xs font-semibold text-warm-dark">
              {formatAmount(amount, product.unit, language)}
            </span>
            <button
              onClick={handleIncrease}
              aria-label={language === 'ru' ? 'Увеличить количество' : 'Increase cart amount'}
              disabled={amount + product.amountStep > 100_000}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-cream-25 text-warm-dark shadow-xs hover:bg-cream-200"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="font-bold text-sm sm:text-base text-warm-dark">
            {formatVND(lineTotal)}
          </div>
        </div>
      </div>
    </div>
  );
};
