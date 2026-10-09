import React, { useCallback, useRef, useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import { useLanguage } from '../context/LanguageContext';

interface ProductGridProps {
  products: Product[];
  selectedCategoryId: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategoryId,
}) => {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);

  const openProduct = (product: Product, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger;
    setSelectedProduct(product);
  };
  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const filteredProducts = products.filter((p) => {
    if (selectedCategoryId === 'all') return true;
    return p.categoryId === selectedCategoryId;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-warm-muted text-base">{t.menuEmpty}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid min-w-0 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onOpen={openProduct} />
        ))}
      </div>
      {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={closeProduct} />}
    </>
  );
};
