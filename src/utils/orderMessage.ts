import type { CartItem } from '../types';
import type { Language } from '../translations';
import { calculateProductPrice, formatAmount, formatVND } from './format';

interface OrderMessageParams {
  items: CartItem[];
  language: Language;
  name?: string;
  contactMethod?: string;
  contact?: string;
  comment?: string;
  totalPrice: number;
}

/**
 * Builds a clean, human-readable order message in Russian or English.
 */
export function formatOrderMessage({
  items,
  language,
  name,
  contactMethod,
  contact,
  comment,
  totalPrice,
}: OrderMessageParams): string {
  const isRu = language === 'ru';
  const lines: string[] = [];

  lines.push(isRu ? "🥐 ЗАКАЗ — Афиget'" : "🥐 NEW ORDER — Афиget'");
  lines.push('────────────────────────');

  if (name && name.trim()) {
    lines.push(`${isRu ? '👤 Клиент' : '👤 Customer'}: ${name.trim()}`);
  }
  if (contact && contact.trim()) {
    const methodStr = contactMethod ? ` (${contactMethod})` : '';
    lines.push(`${isRu ? '📞 Контакт' : '📞 Contact'}: ${contact.trim()}${methodStr}`);
  }

  if ((name && name.trim()) || (contact && contact.trim())) {
    lines.push('');
  }

  lines.push(isRu ? '🛒 Состав заказа:' : '🛒 Order items:');
  items.forEach(({ product, amount }, index) => {
    const itemTotal = calculateProductPrice(product.price, amount, product.saleType, product.unit);
    const amountStr = formatAmount(amount, product.unit, language);
    lines.push(`${index + 1}. ${product.name[language]}`);
    lines.push(`   ${amountStr} × ${formatVND(product.price)} = ${formatVND(itemTotal)}`);
  });

  lines.push('────────────────────────');
  lines.push(`${isRu ? '💰 Итого' : '💰 Total'}: ${formatVND(totalPrice)}`);

  if (comment && comment.trim()) {
    lines.push('');
    lines.push(`${isRu ? '📝 Комментарий' : '📝 Comment'}: ${comment.trim()}`);
  }

  return lines.join('\n');
}
