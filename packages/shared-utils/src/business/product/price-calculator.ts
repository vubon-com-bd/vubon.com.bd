import { calculateDiscountPrice } from '../../common/calculator/discount-calculator';
import { calculateTotalWithTax } from '../../common/calculator/tax-calculator';

export const calculateProductPrice = (price: number, discount: number, tax: number): number => {
  const discountedPrice = calculateDiscountPrice(price, discount);
  return calculateTotalWithTax(discountedPrice, tax);
};

export const calculateSalePrice = (originalPrice: number, discountPercentage: number): number => {
  return calculateDiscountPrice(originalPrice, discountPercentage);
};

export const calculatePriceDifference = (price1: number, price2: number): number => {
  return ((price2 - price1) / price1) * 100;
};
