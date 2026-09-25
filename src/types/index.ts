export type SaleType = 'weight' | 'quantity';

export type ProductUnit = '100g' | 'kg' | 'piece' | 'portion';

export type ProductStatus = 'available' | 'preorder' | 'unavailable';

export type ProductBadge = 'Bestseller' | 'New' | 'Natural' | 'Classic' | 'Seasonal';

export interface Product {
  id: string;
  categoryId: string;
  name: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  image: string; // File name inside public/products/
  badge?: ProductBadge;
  saleType: SaleType;
  price: number; // Integer VND
  unit: ProductUnit;
  minimumAmount: number; // in grams (e.g., 500) or pieces (e.g., 2)
  amountStep: number; // in grams (e.g., 100) or pieces (e.g., 1)
  status: ProductStatus;
  preparationTime?: {
    ru: string;
    en: string;
  };
  sortOrder: number;
}

export interface Category {
  id: string;
  name: {
    ru: string;
    en: string;
  };
  sortOrder: number;
}

export interface CartItem {
  product: Product;
  amount: number; // selected weight in grams or quantity in pieces
}
