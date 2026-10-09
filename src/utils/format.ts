import type { ProductUnit, SaleType } from '../types';

export function formatVND(amount: number): string {
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount)} ₫`;
}

export function formatAmount(amount: number, unit: string, lang: 'ru' | 'en' = 'ru'): string {
  if (unit === 'kg') {
    const kilograms = new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
      maximumFractionDigits: 1,
    }).format(amount / 1000);
    return `${kilograms} ${lang === 'ru' ? 'кг' : 'kg'}`;
  }
  if (unit === '100g') {
    return `${amount} ${lang === 'ru' ? 'г' : 'g'}`;
  }
  if (unit === 'container250ml') {
    if (lang === 'en') return `${amount} ${amount === 1 ? 'container' : 'containers'} (250 ml)`;
    const lastTwo = amount % 100;
    const lastDigit = amount % 10;
    const noun = lastTwo >= 11 && lastTwo <= 14 ? 'контейнеров'
      : lastDigit === 1 ? 'контейнер'
      : lastDigit >= 2 && lastDigit <= 4 ? 'контейнера' : 'контейнеров';
    return `${amount} ${noun} (250 мл)`;
  }
  if (unit === 'portion') {
    return `${amount} ${lang === 'ru' ? 'порц.' : 'port.'}`;
  }
  return `${amount} ${lang === 'ru' ? 'шт' : 'pcs'}`;
}

export function formatPriceUnit(unit: ProductUnit, lang: 'ru' | 'en'): string {
  if (unit === '100g') return lang === 'ru' ? '100 г' : '100 g';
  if (unit === 'kg') return lang === 'ru' ? '1 кг' : '1 kg';
  if (unit === 'container250ml') return lang === 'ru' ? 'контейнер 250 мл' : '250 ml container';
  if (unit === 'portion') return lang === 'ru' ? 'порция' : 'portion';
  return lang === 'ru' ? 'шт' : 'pc';
}

export function calculateProductPrice(
  price: number,
  amount: number,
  saleType: SaleType,
  unit: ProductUnit
): number {
  if (saleType === 'weight') {
    return Math.round((price * amount) / (unit === 'kg' ? 1000 : 100));
  }
  // price is per piece/portion
  return price * amount;
}
