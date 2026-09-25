import type { Category, Product } from '../types';

export const categories: Category[] = [
  { id: 'cakes', name: { ru: 'Торты', en: 'Cakes' }, sortOrder: 1 },
  { id: 'desserts', name: { ru: 'Десерты', en: 'Desserts' }, sortOrder: 2 },
  { id: 'breakfast', name: { ru: 'Завтраки', en: 'Breakfast' }, sortOrder: 3 },
  { id: 'dumplings', name: { ru: 'Вареники & Пельмени', en: 'Dumplings' }, sortOrder: 4 },
  { id: 'hot-dishes', name: { ru: 'Горячие блюда', en: 'Hot dishes' }, sortOrder: 5 },
];

// Edit this list to update the public menu. Images live in public/products/.
// These are placeholder prices in integer VND; confirm them before launch.
// Weight products in this sample are priced per 100 g.
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
      image: 'napoleon.jpg',
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
    {
      id: 'medovik-honey-cake',
      categoryId: 'cakes',
      name: {
        ru: 'Медовик домашний',
        en: 'Classic Honey Cake',
      },
      description: {
        ru: 'Ароматные медовые коржи с нежным сметанно-сливочным кремом. Тает во рту.',
        en: 'Fragrant natural honey layers paired with whipped sour cream filling. Soft and moist.',
      },
      image: 'medovik.jpg',
      badge: 'Classic',
      saleType: 'weight',
      price: 42000,
      unit: '100g',
      minimumAmount: 500,
      amountStep: 100,
      status: 'available',
      preparationTime: {
        ru: 'Под заказ · 24 часа',
        en: 'Pre-order · 24 hours',
      },
      sortOrder: 2,
    },
    {
      id: 'cheesecake-classic',
      categoryId: 'cakes',
      name: {
        ru: 'Чизкейк классический Нью-Йорк',
        en: 'Classic New York Cheesecake',
      },
      description: {
        ru: 'Шелковистая сливочная текстура из натурального крем-чиза на рассыпчатой песочной основе.',
        en: 'Silky smooth baked cream cheese cheesecake on a buttery shortbread crust.',
      },
      image: 'cheesecake.jpg',
      badge: 'Natural',
      saleType: 'weight',
      price: 52000,
      unit: '100g',
      minimumAmount: 500,
      amountStep: 100,
      status: 'available',
      sortOrder: 3,
    },

    // Desserts
    {
      id: 'chocolate-brownie',
      categoryId: 'desserts',
      name: {
        ru: 'Шоколадный брауни с фундуком',
        en: 'Chocolate Hazelnut Brownie',
      },
      description: {
        ru: 'Насыщенный десерт из темного бельгийского шоколада с хрустящими орехами и тягучей серединкой.',
        en: 'Rich dark Belgian chocolate fudge brownie with roasted hazelnuts and gooey center.',
      },
      image: 'dessert-placeholder.svg',
      badge: 'Bestseller',
      saleType: 'quantity',
      price: 45000, // 45,000 VND / piece
      unit: 'piece',
      minimumAmount: 2,
      amountStep: 1,
      status: 'available',
      sortOrder: 4,
    },
    {
      id: 'homemade-yogurt',
      categoryId: 'desserts',
      name: {
        ru: 'Домашний греческий йогурт',
        en: 'Homemade Greek Yogurt',
      },
      description: {
        ru: 'Густой натуральный йогурт без консервантов и сахара. Подается с ягодным конфитюром.',
        en: 'Thick, creamy all-natural yogurt without sugar or additives. Comes with berry compote.',
      },
      image: 'yogurt-placeholder.svg',
      saleType: 'quantity',
      price: 40000,
      unit: 'portion',
      minimumAmount: 1,
      amountStep: 1,
      status: 'available',
      sortOrder: 5,
    },

    // Breakfast
    {
      id: 'syrniki-classic',
      categoryId: 'breakfast',
      name: {
        ru: 'Сырники классические',
        en: 'Classic Syrniki (Cottage Cheese Pancakes)',
      },
      description: {
        ru: 'Нежные сырники из фермерского творога с золотистой корочкой и ароматом бурбонской ванили.',
        en: 'Fluffy pan-fried farmers cheese pancakes with a hint of natural Bourbon vanilla.',
      },
      image: 'breakfast-placeholder.svg',
      badge: 'Bestseller',
      saleType: 'quantity',
      price: 30000, // 30,000 VND / piece
      unit: 'piece',
      minimumAmount: 2,
      amountStep: 1,
      status: 'available',
      sortOrder: 6,
    },
    {
      id: 'syrniki-raisins',
      categoryId: 'breakfast',
      name: {
        ru: 'Сырники с изюмом',
        en: 'Syrniki with Golden Raisins',
      },
      description: {
        ru: 'Сладкие сырники из отборного творога с сочным светлым изюмом.',
        en: 'Traditional cottage cheese cakes packed with juicy sun-dried golden raisins.',
      },
      image: 'breakfast-placeholder.svg',
      saleType: 'quantity',
      price: 32000,
      unit: 'piece',
      minimumAmount: 2,
      amountStep: 1,
      status: 'available',
      sortOrder: 7,
    },
    {
      id: 'crepes-cottage-cheese',
      categoryId: 'breakfast',
      name: {
        ru: 'Блинчики с творогом',
        en: 'Crepes with Sweet Cottage Cheese',
      },
      description: {
        ru: 'Тонкие ажурные домашние блины со сладкой ванильно-творожной начинкой.',
        en: 'Delicate homemade crepes wrapped around sweet vanilla cottage cheese filling.',
      },
      image: 'breakfast-placeholder.svg',
      badge: 'Classic',
      saleType: 'quantity',
      price: 28000,
      unit: 'piece',
      minimumAmount: 2,
      amountStep: 1,
      status: 'available',
      sortOrder: 8,
    },
    {
      id: 'draniki-potato',
      categoryId: 'breakfast',
      name: {
        ru: 'Драники картофельные',
        en: 'Crispy Potato Pancakes (Draniki)',
      },
      description: {
        ru: 'Хрустящие картофельные оладьи с золотистой корочкой. Рекомендуем со сметаной.',
        en: 'Crispy golden grated potato pancakes seasoned and fried to perfection.',
      },
      image: 'breakfast-placeholder.svg',
      saleType: 'quantity',
      price: 25000,
      unit: 'piece',
      minimumAmount: 3,
      amountStep: 1,
      status: 'available',
      sortOrder: 9,
    },

    // Dumplings
    {
      id: 'varenyky-potato',
      categoryId: 'dumplings',
      name: {
        ru: 'Вареники с картошкой и луком',
        en: 'Varenyky with Potato & Fried Onion',
      },
      description: {
        ru: 'Тонкое эластичное тесто с нежным картофельным пюре и карамелизированным луком (замороженные).',
        en: 'Handmade dumplings filled with seasoned mashed potatoes and caramelized onions (frozen).',
      },
      image: 'dumplings-placeholder.svg',
      badge: 'Bestseller',
      saleType: 'weight',
      price: 22000, // 22,000 VND / 100g
      unit: '100g',
      minimumAmount: 500,
      amountStep: 100,
      status: 'available',
      sortOrder: 10,
    },
    {
      id: 'varenyky-cherry',
      categoryId: 'dumplings',
      name: {
        ru: 'Вареники с вишней',
        en: 'Sweet Cherry Varenyky',
      },
      description: {
        ru: 'Сочная цельная вишня в тонком домашнем тесте. Идеальный летний десерт (замороженные).',
        en: 'Juicy whole tart cherries folded in thin delicate pastry dough (frozen).',
      },
      image: 'dumplings-placeholder.svg',
      badge: 'Seasonal',
      saleType: 'weight',
      price: 28000,
      unit: '100g',
      minimumAmount: 500,
      amountStep: 100,
      status: 'available',
      sortOrder: 11,
    },
    {
      id: 'pelmeni-homemade',
      categoryId: 'dumplings',
      name: {
        ru: 'Домашние пельмени (свинина-говядина)',
        en: 'Homemade Meat Pelmeni (Pork & Beef)',
      },
      description: {
        ru: 'Классические ручные пельмени с сочной начинкой из свинины и говядины с душистым перцем (замороженные).',
        en: 'Traditional hand-pinched dumplings with juicy seasoned pork and beef filling (frozen).',
      },
      image: 'dumplings-placeholder.svg',
      badge: 'Classic',
      saleType: 'weight',
      price: 29000,
      unit: '100g',
      minimumAmount: 500,
      amountStep: 100,
      status: 'available',
      sortOrder: 12,
    },

    // Hot dishes
    {
      id: 'cabbage-rolls',
      categoryId: 'hot-dishes',
      name: {
        ru: 'Голубцы домашние в томатном соусе',
        en: 'Homemade Cabbage Rolls in Tomato Sauce',
      },
      description: {
        ru: 'Нежные капустные листья с начинкой из сочного фарша и риса, томленые в густом томатно-сметанном соусе.',
        en: 'Savory minced meat and rice wrapped in tender cabbage leaves, braised in tomato sour-cream sauce.',
      },
      image: 'savory-placeholder.svg',
      badge: 'Bestseller',
      saleType: 'quantity',
      price: 45000,
      unit: 'piece',
      minimumAmount: 2,
      amountStep: 1,
      status: 'available',
      sortOrder: 13,
    },
    {
      id: 'borscht-ukrainian',
      categoryId: 'hot-dishes',
      name: {
        ru: 'Борщ украинский с говядиной',
        en: 'Traditional Ukrainian Borscht with Beef',
      },
      description: {
        ru: 'Наваристый свекольный суп на говяжьем бульоне со свежими овощами, чесноком и зеленью. Подается с порцией сметаны.',
        en: 'Rich beetroot and beef soup with slow-cooked root vegetables, garlic and fresh herbs.',
      },
      image: 'hot-placeholder.svg',
      badge: 'Classic',
      saleType: 'quantity',
      price: 95000,
      unit: 'portion',
      minimumAmount: 1,
      amountStep: 1,
      status: 'available',
      sortOrder: 14,
    },
    {
      id: 'cutlets-homemade',
      categoryId: 'hot-dishes',
      name: {
        ru: 'Котлеты домашние сочные',
        en: 'Homemade Juicy Meat Cutlets',
      },
      description: {
        ru: 'Пышные подрумяненные котлетки из рубленого мяса с луком и специями. Идеальны к пюре или рису.',
        en: 'Juicy golden pan-fried meat patties seasoned with onions, garlic and classic herbs.',
      },
      image: 'savory-placeholder.svg',
      saleType: 'quantity',
      price: 38000,
      unit: 'piece',
      minimumAmount: 2,
      amountStep: 1,
      status: 'preorder',
      preparationTime: {
        ru: 'Под заказ · 24 часа',
        en: 'Pre-order · 24 hours',
      },
      sortOrder: 15,
    },
];
