import React, { useState } from 'react';
import { Header } from './components/Header';
import { MenuFilters } from './components/MenuFilters';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { BrandWordmark } from './components/BrandWordmark';
import { categories, products } from './data/products';
import { useLanguage } from './context/LanguageContext';
import { Heart } from 'lucide-react';

export const App: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const sortedProducts = [...products].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen bg-cream-50 text-warm-dark flex flex-col selection:bg-terracotta-500/20">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-24 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <div className="min-w-0">
          {/* Compact introduction */}
          <section className="pt-10 pb-5 sm:pt-14 sm:pb-8 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
            <h1 className="font-serif text-[44px] leading-[0.95] sm:text-[64px] lg:text-[72px] font-semibold text-warm-dark tracking-[-0.035em] mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-sm sm:text-[15px] text-warm-muted leading-[1.75] font-normal max-w-xl mx-auto lg:mx-0">
              {t.heroSubtitle}
            </p>
          </section>

          <MenuFilters
            categories={categories}
            selectedCategoryId={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <section>
            <ProductGrid products={sortedProducts} selectedCategoryId={selectedCategory} />
          </section>
        </div>
        <CartDrawer />
      </main>

      {/* Footer */}
      <footer className="bg-cream-100 border-t border-warm-border/70 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-warm-muted">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <BrandWordmark className="text-[40px]" />
            <span>{t.tagline}</span>
            <span>{t.footerCity}</span>
          </div>

          <span>{t.orderRequestNotice}</span>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-warm-border/40 text-center text-[11px] text-warm-muted/70 flex items-center justify-center gap-1">
          <span>{t.madeWithLove}</span>
          <Heart className="w-3 h-3 text-terracotta-500 inline fill-terracotta-500" />
          <span>· © {new Date().getFullYear()} Афиget'</span>
        </div>
      </footer>
    </div>
  );
};
