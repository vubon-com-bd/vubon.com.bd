export interface DealCalculationData {
  usedCount: number;
  totalLimit: number;
}

export const calculateDealDiscount = (price: number, discountValue: number): number => {
  return (price * discountValue) / 100;
};

export const calculateDealPrice = (price: number, discountValue: number): number => {
  return price - calculateDealDiscount(price, discountValue);
};

export const calculateDealSavings = (originalPrice: number, dealPrice: number): number => {
  return originalPrice - dealPrice;
};

export const calculateDealProgress = (deal: DealCalculationData): number => {
  if (deal.totalLimit === 0) return 0;
  return (deal.usedCount / deal.totalLimit) * 100;
};
