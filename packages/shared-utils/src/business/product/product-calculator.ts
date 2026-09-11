import { calculateSubtotal } from '../../common/calculator/price-calculator';
import { calculateDiscountPrice } from '../../common/calculator/discount-calculator';

export const calculateProductDiscount = (price: number, discountPercentage: number): number => {
  return calculateDiscountPrice(price, discountPercentage);
};

export const calculateProductTotal = (products: { price: number; quantity: number }[]): number => {
  return calculateSubtotal(products);
};

export const calculateProductProfit = (sellingPrice: number, costPrice: number): number => {
  return sellingPrice - costPrice;
};
