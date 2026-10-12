import React from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { CartDrawer } from './components/CartDrawer';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BrandWordmark } from './components/BrandWordmark';
import { products } from './data/products';
import { useLanguage } from './context/LanguageContext';
import { Heart } from 'lucide-react';

export const App: React.FC = () => {
  const { t } = useLanguage();
  const sortedProducts = [...products].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="paper-background min-h-screen text-warm-dark flex flex-col selection:bg-terracotta-500/20">
      <FloatingCartButton />

      {/* Main Content */}
      <main className="flex-1 pb-24 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 lg:pr-24">
        <Header />
        <section aria-labelledby="brand-title" className="pt-6 pb-7 sm:pt-9 sm:pb-10 text-center max-w-3xl mx-auto">
          <h1 id="brand-title" className="text-[clamp(76px,18vw,112px)] leading-none">
            <BrandWordmark className="brand-wordmark--hero" />
          </h1>
          <p className="mt-3 text-xs sm:text-sm font-semibold tracking-[0.12em] text-warm-muted">
            {t.brandCategory}
          </p>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-warm-muted leading-relaxed max-w-lg mx-auto">
            {t.heroSubtitle}
          </p>
        </section>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          <div className="min-w-0">
            <section aria-labelledby="menu-title">
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <h2 id="menu-title" className="font-serif text-2xl sm:text-[28px] leading-tight font-semibold text-warm-chocolate">
                  {t.heroTitle}
                </h2>
                <span aria-hidden="true" className="h-px flex-1 bg-warm-border/70" />
              </div>
              <ProductGrid products={sortedProducts} selectedCategoryId="all" />
            </section>
          </div>
          <CartDrawer />
        </div>
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
          <span>· © {new Date().getFullYear()} Afiget’</span>
        </div>
      </footer>
    </div>
  );
};
