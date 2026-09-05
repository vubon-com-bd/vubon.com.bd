/**
 * Price Calculator
 * মূল্য ক্যালকুলেটর
 */

import { CURRENCY } from '@vubon/shared-constants';
import type { PriceData } from '@vubon/shared-types';

export interface PriceCalculationResult {
  basePrice: number;
  taxAmount: number;
  discountAmount: number;
  finalPrice: number;
  currency: string;
  savings?: number;
  savingsPercentage?: number;
}

export interface PriceComparisonResult {
  original: PriceCalculationResult;
  compared: PriceCalculationResult;
  difference: number;
  percentageDifference: number;
  isCheaper: boolean;
}

export const calculateProductPrice = (
  price: PriceData,
  discountPercentage: number = 0,
  taxRate: number = 0
): PriceCalculationResult => {
  const basePrice = price.amount;
  const discountAmount = (basePrice * discountPercentage) / 100;
  const discountedPrice = basePrice - discountAmount;
  const taxAmount = (discountedPrice * taxRate) / 100;
  const finalPrice = discountedPrice + taxAmount;

  // CURRENCY ব্যবহার করে ডিফল্ট কারেন্সি সেট করা
  const currency = price.currency || CURRENCY.BDT;

  return {
    basePrice,
    taxAmount,
    discountAmount,
    finalPrice: Math.round(finalPrice * 100) / 100,
    currency,
    savings: discountAmount,
    savingsPercentage: discountPercentage,
  };
};

export const calculatePriceWithCompare = (
  price: PriceData,
  comparePrice?: number,
  taxRate: number = 0
): PriceCalculationResult => {
  const basePrice = price.amount;
  const compareAmount = comparePrice || price.compareAmount || basePrice;
  const taxAmount = (basePrice * taxRate) / 100;
  const finalPrice = basePrice + taxAmount;
  const savings = compareAmount - basePrice;
  const savingsPercentage = compareAmount > 0 ? (savings / compareAmount) * 100 : 0;

  // CURRENCY ব্যবহার করে ডিফল্ট কারেন্সি সেট করা
  const currency = price.currency || CURRENCY.BDT;

  return {
    basePrice,
    taxAmount,
    discountAmount: savings > 0 ? savings : 0,
    finalPrice: Math.round(finalPrice * 100) / 100,
    currency,
    savings: savings > 0 ? savings : 0,
    savingsPercentage: savings > 0 ? Math.round(savingsPercentage * 100) / 100 : 0,
  };
};

export const compareProductPrices = (
  price1: PriceData,
  price2: PriceData,
  taxRate: number = 0
): PriceComparisonResult => {
  const result1 = calculateProductPrice(price1, 0, taxRate);
  const result2 = calculateProductPrice(price2, 0, taxRate);
  const difference = result1.finalPrice - result2.finalPrice;
  const percentageDifference = result2.finalPrice > 0 ? (difference / result2.finalPrice) * 100 : 0;

  return {
    original: result1,
    compared: result2,
    difference: Math.round(difference * 100) / 100,
    percentageDifference: Math.round(percentageDifference * 100) / 100,
    isCheaper: difference < 0,
  };
};

export const calculateBulkProductPrice = (
  unitPrice: number,
  quantity: number,
  discountTiers: { minQty: number; discount: number }[],
  taxRate: number = 0
): PriceCalculationResult => {
  let applicableDiscount = 0;
  for (const tier of discountTiers) {
    if (quantity >= tier.minQty) {
      applicableDiscount = tier.discount;
    }
  }

  const totalPrice = unitPrice * quantity;
  const discountAmount = (totalPrice * applicableDiscount) / 100;
  const discountedPrice = totalPrice - discountAmount;
  const taxAmount = (discountedPrice * taxRate) / 100;
  const finalPrice = discountedPrice + taxAmount;

  // CURRENCY ব্যবহার করে ডিফল্ট কারেন্সি সেট করা
  const currency = CURRENCY.BDT;

  return {
    basePrice: unitPrice,
    taxAmount: Math.round(taxAmount * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    currency,
    savings: Math.round(discountAmount * 100) / 100,
    savingsPercentage: applicableDiscount,
  };
};
