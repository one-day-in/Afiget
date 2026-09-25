import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, Check, Send, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types';
import type { Language } from '../translations';
import { calculateProductPrice, formatAmount, formatVND } from '../utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WEB3FORMS_ACCESS_KEY = '6cf9b2c9-5918-4ff7-923d-8a0b769e345c';

const contactMethods = ['Telegram', 'Zalo', 'WhatsApp', 'Phone', 'Email', 'Other'] as const;
type ContactMethod = typeof contactMethods[number];
type FieldErrors = Partial<Record<'cart' | 'name' | 'method' | 'contact', string>>;

function orderSummary(
  items: CartItem[], language: Language, name: string,
  method: ContactMethod, contact: string, comment: string, total: number
): string {
  const isRussian = language === 'ru';
  const lines = [
    "Афиget' — NEW ORDER REQUEST", '',
    `${isRussian ? 'Клиент' : 'Customer'}: ${name}`,
    `${isRussian ? 'Контакт' : 'Contact'}: ${method} — ${contact}`,
    '', isRussian ? 'ЗАКАЗ' : 'ORDER', '',
  ];
  for (const { product, amount } of items) {
    lines.push(
      product.name[language],
      formatAmount(amount, product.unit, language),
      formatVND(calculateProductPrice(product.price, amount, product.saleType, product.unit)),
      ''
    );
  }
  lines.push('--------------------', `${isRussian ? 'СТОИМОСТЬ ПРОДУКТОВ' : 'PRODUCT TOTAL'}: ${formatVND(total)}`);
  if (comment) lines.push('', `${isRussian ? 'Комментарий' : 'Comment'}: ${comment}`);
  return lines.join('\n');
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const { items, totalPrice, clearCart } = useCart();
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod | ''>('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [highlightedMethodIndex, setHighlightedMethodIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedTotal, setSubmittedTotal] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMethodDropdownOpen(false);
      }
    };

    if (isMethodDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMethodDropdownOpen]);

  const selectContactMethod = (method: ContactMethod) => {
    setContactMethod(method);
    setErrors((current) => ({ ...current, method: undefined }));
    setIsMethodDropdownOpen(false);
  };

  const handleDropdownKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isSubmitting) return;

    if (!isMethodDropdownOpen) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        setIsMethodDropdownOpen(true);
        const currentIndex = contactMethod ? contactMethods.indexOf(contactMethod) : -1;
        setHighlightedMethodIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setIsMethodDropdownOpen(false);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedMethodIndex((prev) => (prev < contactMethods.length - 1 ? prev + 1 : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedMethodIndex((prev) => (prev > 0 ? prev - 1 : contactMethods.length - 1));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (highlightedMethodIndex >= 0 && highlightedMethodIndex < contactMethods.length) {
        selectContactMethod(contactMethods[highlightedMethodIndex]);
      }
    } else if (event.key === 'Tab') {
      setIsMethodDropdownOpen(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    const cleanName = name.trim();
    const cleanContact = contact.trim();
    const cleanComment = comment.trim();
    const nextErrors: FieldErrors = {};
    if (items.length === 0) nextErrors.cart = t.validationCart;
    if (!cleanName) nextErrors.name = t.validationName;
    if (!contactMethod) nextErrors.method = t.validationContactMethod;
    if (!cleanContact) nextErrors.contact = t.validationContact;
    else if (contactMethod === 'Email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact)) {
      nextErrors.contact = t.validationEmail;
    }
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length > 0 || !contactMethod) return;

    const payload: Record<string, string | boolean> = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Афиget' — New order — ${formatVND(totalPrice)}`,
      from_name: "Афиget' Bakery",
      customer_name: cleanName,
      contact_method: contactMethod,
      contact: cleanContact,
      language,
      product_total: formatVND(totalPrice),
      order_summary: orderSummary(items, language, cleanName, contactMethod, cleanContact, cleanComment, totalPrice),
      comment: cleanComment,
      botcheck: '',
    };
    if (contactMethod === 'Email') payload.email = cleanContact;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || `Web3Forms returned ${response.status}`);
      }
      setSubmittedTotal(totalPrice);
      setIsSuccess(true);
      clearCart();
    } catch {
      setSubmitError(t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    if (isSuccess) {
      setIsSuccess(false);
      setName('');
      setContactMethod('');
      setContact('');
      setComment('');
      setErrors({});
      setSubmitError(null);
    }
    onClose();
  };

  const methodLabels: Record<ContactMethod, string> = {
    Telegram: t.methodTelegram, Zalo: t.methodZalo, WhatsApp: t.methodWhatsApp,
    Phone: t.methodPhone, Email: t.methodEmail, Other: t.methodOther,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-warm-dark/60">
      <div role="dialog" aria-modal="true" aria-labelledby="order-dialog-title" className="relative w-full max-w-lg bg-cream-50 rounded-2xl shadow-2xl border border-warm-border overflow-hidden max-h-[94vh] sm:max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-warm-border/60 bg-cream-100/50">
          <div>
            <h2 id="order-dialog-title" className="font-serif text-2xl font-bold text-warm-dark">
              {isSuccess ? t.successTitle : t.checkoutTitle}
            </h2>
            {!isSuccess && <p className="text-xs text-warm-muted mt-1">{t.checkoutSubtitle}</p>}
          </div>
          <button type="button" onClick={handleClose} disabled={isSubmitting}
            aria-label={language === 'ru' ? 'Закрыть' : 'Close'}
            className="w-9 h-9 flex shrink-0 items-center justify-center rounded-full bg-cream-200/80 text-warm-muted hover:text-warm-dark disabled:opacity-50">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-5 flex flex-col items-center">
              <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mb-4 text-caramel-700">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <p className="text-sm text-warm-muted leading-relaxed max-w-sm mb-5">{t.successMessage}</p>
              <p className="w-full bg-cream-100 p-4 rounded-xl mb-6 text-sm font-semibold text-warm-dark">
                {t.orderSummary}: {formatVND(submittedTotal)}
              </p>
              <button type="button" onClick={handleClose}
                className="w-full py-3.5 bg-warm-chocolate hover:bg-warm-espresso text-cream-50 font-semibold rounded-xl">
                {t.backToMenu}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <section aria-label={t.yourOrder} className="rounded-xl border border-warm-border bg-cream-25 p-4">
                <h3 className="font-serif text-xl font-bold text-warm-dark mb-3">{t.yourOrder}</h3>
                {items.length > 0 ? (
                  <div className="divide-y divide-warm-border/55">
                    {items.map(({ product, amount }) => (
                      <div key={product.id} className="flex justify-between gap-4 py-2.5 text-sm">
                        <div className="min-w-0">
                          <p className="font-semibold text-warm-dark">{product.name[language]}</p>
                          <p className="text-xs text-warm-muted">{formatAmount(amount, product.unit, language)}</p>
                        </div>
                        <span className="font-semibold text-warm-dark whitespace-nowrap">
                          {formatVND(calculateProductPrice(product.price, amount, product.saleType, product.unit))}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-warm-muted">{t.cartEmpty}</p>}
                <div className="flex justify-between gap-3 border-t border-warm-border pt-3 mt-1 text-sm font-bold text-warm-dark">
                  <span>{t.orderSummary}</span><span>{formatVND(totalPrice)}</span>
                </div>
                <p className="text-xs text-warm-muted leading-relaxed mt-3">{t.deliveryNotice}</p>
                {errors.cart && <p role="alert" className="text-xs text-terracotta-700 mt-2">{errors.cart}</p>}
              </section>

              <div>
                <label htmlFor="order-name" className="block text-xs font-semibold text-warm-dark mb-1.5">{t.nameLabel} *</label>
                <input id="order-name" value={name} maxLength={120} autoComplete="name"
                  onChange={(event) => { setName(event.target.value); setErrors((current) => ({ ...current, name: undefined })); }}
                  placeholder={t.namePlaceholder} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'order-name-error' : undefined}
                  className="w-full px-4 py-3 rounded-xl bg-cream-25 border border-warm-border focus:outline-none focus:ring-2 focus:ring-caramel-500 text-sm text-warm-dark" />
                {errors.name && <p id="order-name-error" className="text-xs text-terracotta-700 mt-1">{errors.name}</p>}
              </div>

              <div ref={dropdownRef} className="relative">
                <label id="order-method-label" htmlFor="order-method-btn" className="block text-xs font-semibold text-warm-dark mb-1.5">{t.contactMethodLabel} *</label>
                <button
                  type="button"
                  id="order-method-btn"
                  aria-haspopup="listbox"
                  aria-expanded={isMethodDropdownOpen}
                  aria-labelledby="order-method-label order-method-btn"
                  aria-invalid={!!errors.method}
                  aria-describedby={errors.method ? 'order-method-error' : undefined}
                  disabled={isSubmitting}
                  onClick={() => {
                    const willOpen = !isMethodDropdownOpen;
                    setIsMethodDropdownOpen(willOpen);
                    if (willOpen) {
                      const currentIndex = contactMethod ? contactMethods.indexOf(contactMethod) : -1;
                      setHighlightedMethodIndex(currentIndex >= 0 ? currentIndex : 0);
                    }
                  }}
                  onKeyDown={handleDropdownKeyDown}
                  className="w-full px-4 py-3 rounded-xl bg-cream-25 border border-warm-border focus:outline-none focus:ring-2 focus:ring-caramel-500 text-sm text-left flex items-center justify-between gap-2 text-warm-dark disabled:opacity-60"
                >
                  <span className={contactMethod ? 'text-warm-dark' : 'text-warm-muted'}>
                    {contactMethod ? methodLabels[contactMethod] : t.contactMethodPlaceholder}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-warm-muted transition-transform duration-200 shrink-0 ${isMethodDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMethodDropdownOpen && (
                  <ul
                    ref={listboxRef}
                    role="listbox"
                    aria-labelledby="order-method-label"
                    className="absolute left-0 right-0 z-30 mt-1.5 py-1.5 bg-cream-50 border border-warm-border rounded-xl shadow-lg max-h-60 overflow-y-auto focus:outline-none"
                  >
                    {contactMethods.map((method, index) => {
                      const isSelected = contactMethod === method;
                      const isHighlighted = highlightedMethodIndex === index;
                      return (
                        <li
                          key={method}
                          role="option"
                          aria-selected={isSelected}
                          onMouseEnter={() => setHighlightedMethodIndex(index)}
                          onClick={() => selectContactMethod(method)}
                          className={`px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-cream-200/80 font-semibold text-warm-dark'
                              : isHighlighted
                              ? 'bg-cream-100 text-warm-dark'
                              : 'text-warm-dark hover:bg-cream-100'
                          }`}
                        >
                          <span>{methodLabels[method]}</span>
                          {isSelected && <Check className="w-4 h-4 text-caramel-700 shrink-0" />}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {errors.method && <p id="order-method-error" className="text-xs text-terracotta-700 mt-1">{errors.method}</p>}
              </div>

              <div>
                <label htmlFor="order-contact" className="block text-xs font-semibold text-warm-dark mb-1.5">{t.contactLabel} *</label>
                <input id="order-contact" value={contact} maxLength={120}
                  type={contactMethod === 'Email' ? 'email' : 'text'}
                  autoComplete={contactMethod === 'Email' ? 'email' : 'off'}
                  onChange={(event) => { setContact(event.target.value); setErrors((current) => ({ ...current, contact: undefined })); }}
                  placeholder={t.contactPlaceholder} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? 'order-contact-error' : undefined}
                  className="w-full px-4 py-3 rounded-xl bg-cream-25 border border-warm-border focus:outline-none focus:ring-2 focus:ring-caramel-500 text-sm text-warm-dark" />
                {errors.contact && <p id="order-contact-error" className="text-xs text-terracotta-700 mt-1">{errors.contact}</p>}
              </div>

              <div>
                <label htmlFor="order-comment" className="block text-xs font-semibold text-warm-dark mb-1.5">{t.commentLabel}</label>
                <textarea id="order-comment" rows={2} value={comment} maxLength={1000}
                  onChange={(event) => setComment(event.target.value)} placeholder={t.commentPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-cream-25 border border-warm-border focus:outline-none focus:ring-2 focus:ring-caramel-500 text-sm text-warm-dark resize-y" />
              </div>

              {submitError && <div role="alert" className="p-3 rounded-xl bg-cream-100 border border-terracotta-500/30 text-terracotta-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /><span>{submitError}</span>
              </div>}

              <button type="submit" disabled={isSubmitting}
                className="w-full min-h-12 px-4 bg-warm-chocolate hover:bg-warm-espresso text-cream-50 font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-60">
                <Send className="w-4 h-4" /><span>{isSubmitting ? t.submitting : t.placeOrderButton}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
