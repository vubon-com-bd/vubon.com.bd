export interface FlashSaleCalculationData {
  soldCount: number;
  totalLimit: number;
  pricing: { flashPrice: { amount: number } };
}

export const calculateFlashSaleDiscount = (price: number, discountPercentage: number): number => {
  return (price * discountPercentage) / 100;
};

export const calculateFlashSalePrice = (price: number, discountPercentage: number): number => {
  return price - calculateFlashSaleDiscount(price, discountPercentage);
};

export const calculateFlashSaleRevenue = (sale: FlashSaleCalculationData): number => {
  return sale.soldCount * sale.pricing.flashPrice.amount;
};

export const calculateFlashSaleRemaining = (sale: FlashSaleCalculationData): number => {
  return sale.totalLimit - sale.soldCount;
};

export const calculateFlashSaleProgress = (sale: FlashSaleCalculationData): number => {
  if (sale.totalLimit === 0) return 0;
  return (sale.soldCount / sale.totalLimit) * 100;
};
