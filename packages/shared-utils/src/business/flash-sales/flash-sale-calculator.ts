/**
 * Flash Sale Calculator
 * ফ্ল্যাশ সেল ক্যালকুলেটর
 */

import type { FlashSale, FlashSaleInventory, FlashSalePrice } from '@vubon/shared-types';
import type { Product } from '@vubon/shared-types';

export interface FlashSaleCalculation {
  totalProducts: number;
  totalInventory: number;
  totalSold: number;
  totalRevenue: number;
  sellThroughRate: number;
  averageDiscount: number;
  totalSavings: number;
}

export interface ProductFlashSalePrice {
  productId: string;
  originalPrice: number;
  flashPrice: number;
  discount: number;
  discountPercentage: number;
  savings: number;
}

export const calculateFlashSalePrice = (
  product: Product,
  flashSale: FlashSale,
  flashPrice: FlashSalePrice
): ProductFlashSalePrice => {
  const originalPrice = product.price;
  const discount = flashPrice.discount || 0;
  const discountPercentage = flashPrice.discountPercentage || 0;
  const flashPriceAmount = flashPrice.flashPrice || originalPrice - discount;

  return {
    productId: product.id,
    originalPrice: Math.round(originalPrice * 100) / 100,
    flashPrice: Math.round(flashPriceAmount * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    discountPercentage: Math.round(discountPercentage * 100) / 100,
    savings: Math.round((originalPrice - flashPriceAmount) * 100) / 100,
  };
};

export const calculateFlashSaleStats = (
  flashSale: FlashSale,
  inventories: FlashSaleInventory[],
  prices: FlashSalePrice[]
): FlashSaleCalculation => {
  const totalProducts = flashSale.totalProducts || 0;
  const totalInventory = inventories.reduce((sum, inv) => sum + inv.quantity, 0);
  const totalSold = inventories.reduce((sum, inv) => sum + inv.sold, 0);
  const totalRevenue = flashSale.totalRevenue || 0;

  const totalDiscounts = prices.reduce((sum, price) => sum + price.discount, 0);
  const averageDiscount = prices.length > 0 ? totalDiscounts / prices.length : 0;

  const sellThroughRate = totalInventory > 0 ? (totalSold / totalInventory) * 100 : 0;

  return {
    totalProducts,
    totalInventory,
    totalSold,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    sellThroughRate: Math.round(sellThroughRate * 100) / 100,
    averageDiscount: Math.round(averageDiscount * 100) / 100,
    totalSavings: Math.round(totalDiscounts * 100) / 100,
  };
};

export const calculateTimeRemaining = (
  endDate: Date
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
} => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isExpired: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isExpired: false,
  };
};

export const calculateFlashSaleProgress = (
  startDate: Date,
  endDate: Date
): {
  progress: number;
  elapsed: number;
  remaining: number;
  total: number;
} => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  const remaining = end.getTime() - now.getTime();

  const progress = total > 0 ? (elapsed / total) * 100 : 0;

  return {
    progress: Math.round(Math.min(100, progress) * 100) / 100,
    elapsed: Math.round(elapsed / 1000),
    remaining: Math.round(Math.max(0, remaining) / 1000),
    total: Math.round(total / 1000),
  };
};
