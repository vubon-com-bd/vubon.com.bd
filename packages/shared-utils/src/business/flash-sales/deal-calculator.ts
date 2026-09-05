/**
 * Deal Calculator
 * ডিল ক্যালকুলেটর
 */

import type { Deal } from '@vubon/shared-types';

export interface DealCalculation {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  discountPercentage: number;
  savings: number;
}

export const calculateDealPrice = (originalPrice: number, deal: Deal): DealCalculation => {
  const discountType = deal.discountType;
  const value = deal.value;
  let discountAmount = 0;

  switch (discountType) {
    case 'percentage':
      discountAmount = (originalPrice * value) / 100;
      if (deal.maxDiscount && discountAmount > deal.maxDiscount) {
        discountAmount = deal.maxDiscount;
      }
      break;
    case 'fixed':
      discountAmount = value;
      break;
    case 'bundle':
      // Bundle discount is handled at bundle level
      discountAmount = 0;
      break;
    case 'buy_x_get_y':
      // BOGO discount is handled at cart level
      discountAmount = 0;
      break;
  }

  const finalPrice = originalPrice - discountAmount;
  const discountPercentage = originalPrice > 0 ? (discountAmount / originalPrice) * 100 : 0;

  return {
    originalPrice: Math.round(originalPrice * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    discountPercentage: Math.round(discountPercentage * 100) / 100,
    savings: Math.round(discountAmount * 100) / 100,
  };
};

export const calculateBulkDealPrice = (
  unitPrice: number,
  quantity: number,
  deal: Deal
): DealCalculation => {
  const totalOriginalPrice = unitPrice * quantity;
  const dealCalculation = calculateDealPrice(totalOriginalPrice, deal);

  return {
    ...dealCalculation,
    originalPrice: Math.round(totalOriginalPrice * 100) / 100,
  };
};

export const calculateDealSavings = (
  price: number,
  deal: Deal
): {
  savings: number;
  savingsPercentage: number;
} => {
  const calculation = calculateDealPrice(price, deal);

  return {
    savings: calculation.savings,
    savingsPercentage: calculation.discountPercentage,
  };
};
