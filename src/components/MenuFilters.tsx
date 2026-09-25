import React from 'react';
import { Category } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface MenuFiltersProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const MenuFilters: React.FC<MenuFiltersProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const { language, t } = useLanguage();

  const allCategoryItem: Category = {
    id: 'all',
    name: { ru: t.all, en: t.all },
    sortOrder: -1,
  };

  const list = [allCategoryItem, ...categories];

  return (
    <div className="sticky top-20 z-20 bg-cream-50/95 backdrop-blur-md py-4 border-b border-warm-border/55 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {list.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            const categoryName = cat.name[language] || cat.name.en || cat.name.ru;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                aria-pressed={isSelected}
                className={`whitespace-nowrap px-4 py-2.5 sm:px-5 rounded-full text-[13px] sm:text-sm font-medium transition-colors duration-200 border ${
                  isSelected
                    ? 'bg-warm-chocolate text-cream-25 border-warm-chocolate'
                    : 'bg-cream-25 hover:bg-cream-100 text-warm-dark/80 border-warm-border/70 hover:border-caramel-500'
                }`}
              >
                {categoryName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
