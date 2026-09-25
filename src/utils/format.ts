export function formatVND(amount: number): string {
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(amount)} ₫`;
}

export function formatAmount(amount: number, unit: string, lang: 'ru' | 'en' = 'ru'): string {
  if (unit === '100g' || unit === 'kg') {
    return `${amount} ${lang === 'ru' ? 'г' : 'g'}`;
  }
  if (unit === 'portion') {
    return `${amount} ${lang === 'ru' ? 'порц.' : 'port.'}`;
  }
  return `${amount} ${lang === 'ru' ? 'шт' : 'pcs'}`;
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
import type { ProductUnit, SaleType } from '../types';
