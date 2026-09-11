export interface PromotionData {
  discountType: string;
  discountValue: number;
}

export const calculatePromotionDiscountRate = (amount: number, percentage: number): number => {
  return (amount * percentage) / 100;
};

export const calculatePromotionDiscount = (promotion: PromotionData, price: number): number => {
  if (promotion.discountType === 'percentage') {
    return calculatePromotionDiscountRate(price, promotion.discountValue);
  }
  return promotion.discountValue;
};

export const calculatePromotionPrice = (promotion: PromotionData, price: number): number => {
  return price - calculatePromotionDiscount(promotion, price);
};

export const calculatePromotionSavings = (promotion: PromotionData, price: number): number => {
  return calculatePromotionDiscount(promotion, price);
};
