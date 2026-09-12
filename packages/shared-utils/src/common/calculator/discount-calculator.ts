/**
 * Discount Calculator — uses DISCOUNT constants.
 */
import { DISCOUNT } from '@vubon/shared-constants/src/common/discount.constants';

export const calculateDiscount = (price: number, discountPercentage: number): number => {
  if (!Number.isFinite(price) || price < 0) throw new Error('Price must be non-negative');
  if (
    discountPercentage < DISCOUNT.MIN.PERCENTAGE ||
    discountPercentage > DISCOUNT.MAX.PERCENTAGE
  ) {
    throw new Error(
      `Discount percentage must be between ${DISCOUNT.MIN.PERCENTAGE} and ${DISCOUNT.MAX.PERCENTAGE}`
    );
  }
  return (price * discountPercentage) / 100;
};

export const calculateDiscountPrice = (price: number, discountPercentage: number): number =>
  price - calculateDiscount(price, discountPercentage);

export const calculateFixedDiscount = (price: number, fixedAmount: number): number => {
  if (fixedAmount < 0) throw new Error('Fixed discount must be non-negative');
  return Math.max(0, price - fixedAmount);
};
