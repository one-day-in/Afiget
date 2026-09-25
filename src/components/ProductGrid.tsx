import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
