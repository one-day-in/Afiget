import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import type { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useProductSelection } from '../hooks/useProductSelection';
import { formatAmount, formatPriceUnit, formatVND } from '../utils/format';
import { productImageUrl } from '../utils/productImage';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { language, t } = useLanguage();
  const { amount, canDecrease, canIncrease, decrease, increase, currentPrice, addSelectedToCart } = useProductSelection(product);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const addedTimer = useRef<number | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;
    const previousStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    Object.assign(body.style, {
      position: 'fixed',
      top: `-${scrollY}px`,
      left: '0',
      right: '0',
      width: '100%',
      overflow: 'hidden',
    });

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    const keepFocusInside = (event: FocusEvent) => {
      if (!dialogRef.current?.contains(event.target as Node)) closeButtonRef.current?.focus();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', keepFocusInside);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', keepFocusInside);
      Object.assign(body.style, previousStyle);
      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  useEffect(() => () => {
    if (addedTimer.current !== null) window.clearTimeout(addedTimer.current);
  }, []);

  const handleAdd = () => {
    if (product.status === 'unavailable') return;
    addSelectedToCart();
    setIsAdded(true);
    if (addedTimer.current !== null) window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setIsAdded(false), 1200);
  };

  const productName = product.name[language];

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-warm-dark/65 p-2 sm:p-6"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="product-detail-title"
        aria-describedby="product-detail-description"
        className="flex w-full max-w-3xl max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-3rem)] flex-col overflow-hidden rounded-xl border border-warm-border bg-cream-25 text-warm-dark shadow-2xl">
        <div className="flex shrink-0 justify-end border-b border-warm-border/70 bg-cream-25 px-3 py-2">
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label={t.closeProductDetails}
            className="flex h-10 w-10 items-center justify-center rounded-full text-warm-dark hover:bg-cream-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto overscroll-contain">
          <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
            <div className="aspect-[4/5] w-full bg-cream-200/50">
              {product.image && !imageFailed ? (
                <img src={productImageUrl(product.image)} alt={productName}
                  className="h-full w-full object-contain" onError={() => setImageFailed(true)} />
              ) : (
                <div className="flex h-full items-center justify-center font-serif text-3xl text-warm-muted/50">Afiget’</div>
              )}
            </div>

            <div className="flex min-w-0 flex-col gap-5 p-5 sm:p-7">
              <div>
                <h2 id="product-detail-title" className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  {productName}
                </h2>
                <p className="mt-3 text-base font-semibold">
                  {formatVND(product.price)} <span className="font-normal text-warm-muted">/ {formatPriceUnit(product.unit, language)}</span>
                </p>
              </div>

              <p id="product-detail-description" className="text-sm leading-relaxed text-warm-muted">
                {product.description[language]}
              </p>

              {product.ingredients && (
                <div className="text-sm leading-relaxed">
                  <h3 className="font-semibold">{t.ingredientsLabel}</h3>
                  <p className="mt-1 text-warm-muted">{product.ingredients[language]}</p>
                </div>
              )}

              <div className="mt-auto border-t border-warm-border/70 pt-5">
                {product.status !== 'unavailable' ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-warm-border/70 bg-cream-100 p-1">
                        <button type="button" onClick={decrease} disabled={!canDecrease} aria-label={t.decreaseAmount}
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-25 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel-700">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[7rem] px-2 text-center text-sm font-semibold">
                          {formatAmount(amount, product.unit, language)}
                        </span>
                        <button type="button" onClick={increase} disabled={!canIncrease} aria-label={t.increaseAmount}
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-25 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel-700">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-lg font-bold">{formatVND(currentPrice)}</span>
                    </div>
                    <button type="button" onClick={handleAdd}
                      className="print-button mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-warm-chocolate px-4 py-3 text-sm font-semibold text-cream-25 hover:bg-warm-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel-700">
                      {isAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                      {isAdded ? t.addedToCart : t.addToCart}
                    </button>
                  </>
                ) : (
                  <p className="font-semibold text-warm-muted">{t.unavailable}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
