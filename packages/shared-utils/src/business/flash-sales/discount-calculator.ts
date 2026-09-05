/**
 * Flash Sale Discount Calculator
 * ফ্ল্যাশ সেল ডিসকাউন্ট ক্যালকুলেটর
 */

export interface FlashSaleDiscountCalculation {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  discountPercentage: number;
  savings: number;
}

export interface FlashSaleDiscountTier {
  minQuantity: number;
  discountPercentage: number;
  discountAmount?: number;
}

export const calculateFlashSaleDiscount = (
  price: number,
  discountPercentage: number,
  maxDiscount?: number
): FlashSaleDiscountCalculation => {
  let discountAmount = (price * discountPercentage) / 100;

  if (maxDiscount && discountAmount > maxDiscount) {
    discountAmount = maxDiscount;
  }

  const finalPrice = price - discountAmount;
  const actualDiscountPercentage = price > 0 ? (discountAmount / price) * 100 : 0;

  return {
    originalPrice: Math.round(price * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    discountPercentage: Math.round(actualDiscountPercentage * 100) / 100,
    savings: Math.round(discountAmount * 100) / 100,
  };
};

export const calculateFlashSaleTieredDiscount = (
  price: number,
  quantity: number,
  tiers: FlashSaleDiscountTier[]
): FlashSaleDiscountCalculation => {
  // Find applicable tier
  let applicableTier: FlashSaleDiscountTier | undefined;
  for (const tier of tiers) {
    if (quantity >= tier.minQuantity) {
      applicableTier = tier;
    }
  }

  if (!applicableTier) {
    return {
      originalPrice: Math.round(price * 100) / 100,
      discountAmount: 0,
      finalPrice: Math.round(price * 100) / 100,
      discountPercentage: 0,
      savings: 0,
    };
  }

  return calculateFlashSaleDiscount(price, applicableTier.discountPercentage);
};

export const calculateFlashSaleBulkDiscount = (
  unitPrice: number,
  quantity: number,
  tiers: FlashSaleDiscountTier[]
): FlashSaleDiscountCalculation => {
  const totalPrice = unitPrice * quantity;
  const result = calculateFlashSaleTieredDiscount(totalPrice, quantity, tiers);

  return {
    ...result,
    originalPrice: Math.round(totalPrice * 100) / 100,
  };
};

export const calculateFlashSalePercentageDiscount = (
  price: number,
  percentage: number
): FlashSaleDiscountCalculation => {
  return calculateFlashSaleDiscount(price, percentage);
};

export const calculateFlashSaleFixedDiscount = (
  price: number,
  amount: number
): FlashSaleDiscountCalculation => {
  const discountAmount = Math.min(amount, price);
  const finalPrice = price - discountAmount;
  const discountPercentage = price > 0 ? (discountAmount / price) * 100 : 0;

  return {
    originalPrice: Math.round(price * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    discountPercentage: Math.round(discountPercentage * 100) / 100,
    savings: Math.round(discountAmount * 100) / 100,
  };
};

export const calculateFlashSaleBuyXGetYDiscount = (
  price: number,
  quantity: number,
  buyQuantity: number,
  getQuantity: number
): FlashSaleDiscountCalculation => {
  const totalItems = buyQuantity + getQuantity;
  const freeItems = Math.floor(quantity / totalItems) * getQuantity;
  const paidItems = quantity - freeItems;
  const totalPrice = price * paidItems;
  const originalPrice = price * quantity;
  const discountAmount = originalPrice - totalPrice;

  return {
    originalPrice: Math.round(originalPrice * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    finalPrice: Math.round(totalPrice * 100) / 100,
    discountPercentage: originalPrice > 0 ? (discountAmount / originalPrice) * 100 : 0,
    savings: Math.round(discountAmount * 100) / 100,
  };
};
