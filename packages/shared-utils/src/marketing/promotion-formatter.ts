export const formatPromotionPrice = (amount: number, currency = 'BDT'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const formatPromotionPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export interface PromotionFormatData {
  name: string;
  status: string;
  discountType: string;
  discountValue: number;
}

export const formatPromotionSummary = (promotion: PromotionFormatData): string => {
  const discount =
    promotion.discountType === 'percentage'
      ? formatPromotionPercentage(promotion.discountValue)
      : formatPromotionPrice(promotion.discountValue);
  return `${promotion.name} | ${promotion.status} | Discount: ${discount}`;
};

export const formatPromotionStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const formatPromotionDiscount = (promotion: PromotionFormatData): string => {
  if (promotion.discountType === 'percentage') {
    return formatPromotionPercentage(promotion.discountValue);
  }
  return formatPromotionPrice(promotion.discountValue);
};
