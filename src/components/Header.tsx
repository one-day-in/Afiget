import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex justify-center pt-5 sm:pt-6">
      <div className="flex items-center bg-cream-25/70 p-1 rounded-md border border-warm-border/75 text-xs font-semibold">
        <button
          onClick={() => setLanguage('ru')}
          aria-label="Русский"
          aria-pressed={language === 'ru'}
          className={`px-3 py-1.5 rounded-full transition-all ${
            language === 'ru'
              ? 'bg-warm-dark text-cream-50 shadow-sm'
              : 'text-warm-muted hover:text-warm-dark'
          }`}
        >
          RU
        </button>
        <button
          onClick={() => setLanguage('en')}
          aria-label="English"
          aria-pressed={language === 'en'}
          className={`px-3 py-1.5 rounded-full transition-all ${
            language === 'en'
              ? 'bg-warm-dark text-cream-50 shadow-sm'
              : 'text-warm-muted hover:text-warm-dark'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};
