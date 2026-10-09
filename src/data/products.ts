import type { Category, Product } from '../types';

export const categories: Category[] = [
  { id: 'cakes', name: { ru: 'Торты', en: 'Cakes' }, sortOrder: 1 },
  { id: 'desserts', name: { ru: 'Десерты', en: 'Desserts' }, sortOrder: 2 },
  { id: 'dairy', name: { ru: 'Молочные продукты', en: 'Dairy' }, sortOrder: 3 },
];

// Edit this list to update the public menu. Images live in public/products/.
// Prices are integer VND; weight products can be priced per 100 g or 1 kg.
export const products: Product[] = [
    // Cakes
    {
      id: 'napoleon-classic',
      categoryId: 'cakes',
      name: {
        ru: 'Наполеон классический',
        en: 'Classic Napoleon Cake',
      },
      description: {
        ru: 'Тончайшие хрустящие коржи из слоеного теста с нежным заварным кремом пломбир на натуральном сливочном масле.',
        en: 'Delicate flaky pastry layers filled with rich vanilla diplomat cream made with real butter.',
      },
      image: 'napoleon.webp',
      badge: 'Bestseller',
      saleType: 'weight',
      price: 45000, // 45,000 VND / 100g
      unit: '100g',
      minimumAmount: 500, // 500g minimum
      amountStep: 100, // 100g step
      status: 'available',
      preparationTime: {
        ru: 'Под заказ · 24 часа',
        en: 'Pre-order · 24 hours',
      },
      sortOrder: 1,
    },

    // Desserts
    {
      id: 'chocolate-brownie',
      categoryId: 'desserts',
      name: {
        ru: 'Шоколадный торт-брауни „Ещё один кусь“',
        en: 'Chocolate Brownie Cake “One More Bite”',
      },
      description: {
        ru: 'Насыщенный шоколадный брауни, приготовленный из шоколада с фермы неподалёку от реки Меконг. Сверху посыпан нежными миндальными лепестками.',
        en: 'Rich chocolate brownie made with chocolate sourced from a farm near the Mekong River, topped with delicate sliced almonds.',
      },
      image: 'brownie.webp',
      badge: 'Bestseller',
      saleType: 'weight',
      price: 47000, // 47,000 VND / 100g
      unit: '100g',
      minimumAmount: 500,
      amountStep: 100,
      status: 'available',
      sortOrder: 4,
    },

    // Dairy
    {
      id: 'homemade-yogurt',
      categoryId: 'dairy',
      name: {
        ru: 'Домашний йогурт',
        en: 'Homemade Yogurt',
      },
      description: {
        ru: 'Натуральный домашний йогурт из коровьего молока. Без сахара, ароматизаторов и лишних добавок. Нежный кисломолочный вкус.',
        en: 'Natural homemade yogurt made from cow\'s milk. No added sugar, artificial flavors, or unnecessary additives. Delicate, mildly tangy taste.',
      },
      ingredients: {
        ru: 'Коровье молоко, йогуртовая закваска',
        en: "Cow's milk, yogurt starter culture",
      },
      image: 'yogurt.webp',
      saleType: 'quantity',
      price: 40000,
      unit: 'container250ml',
      minimumAmount: 1,
      amountStep: 1,
      status: 'available',
      sortOrder: 5,
    },
    {
      id: 'homemade-tvorog',
      categoryId: 'dairy',
      name: {
        ru: 'Домашний творог',
        en: "Homemade Farmer's Cheese",
      },
      description: {
        ru: 'Натуральный домашний творог из коровьего молока. Нежный кисломолочный вкус, без лишних добавок. Готовим небольшими партиями.',
        en: "Homemade farmer's cheese made from cow's milk. Delicate, mildly tangy flavor, with no unnecessary additives. Prepared in small batches.",
      },
      ingredients: {
        ru: 'Коровье молоко, йогурт',
        en: "Cow's milk, yogurt",
      },
      image: 'tvorog.webp',
      saleType: 'weight',
      price: 350000, // VND / kg
      unit: 'kg',
      minimumAmount: 1000,
      amountStep: 500,
      status: 'available',
      sortOrder: 6,
    },
];
