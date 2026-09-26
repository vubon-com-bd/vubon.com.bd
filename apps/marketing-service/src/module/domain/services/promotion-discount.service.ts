export class PromotionDiscountService {
  calculate(originalAmount: number, discountValue: number, discountType: string): number {
    if (discountType === 'percentage') {
      return originalAmount - (originalAmount * discountValue) / 100;
    }
    if (discountType === 'fixed_amount') {
      return Math.max(0, originalAmount - discountValue);
    }
    return originalAmount;
  }
}
