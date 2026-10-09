import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { calculateProductPrice } from '../utils/format';

const MAX_AMOUNT = 100_000;

export function useProductSelection(product: Product) {
  const { addToCart } = useCart();
  const [amount, setAmount] = useState(product.minimumAmount);

  useEffect(() => setAmount(product.minimumAmount), [product.id, product.minimumAmount, product.amountStep]);

  const canDecrease = amount > product.minimumAmount;
  const canIncrease = amount + product.amountStep <= MAX_AMOUNT;

  const decrease = () => setAmount((current) =>
    current - product.amountStep >= product.minimumAmount ? current - product.amountStep : current
  );
  const increase = () => setAmount((current) =>
    current + product.amountStep <= MAX_AMOUNT ? current + product.amountStep : current
  );
  const addSelectedToCart = () => {
    if (product.status !== 'unavailable') addToCart(product, amount);
  };

  return {
    amount,
    canDecrease,
    canIncrease,
    decrease,
    increase,
    currentPrice: calculateProductPrice(product.price, amount, product.saleType, product.unit),
    addSelectedToCart,
  };
}
