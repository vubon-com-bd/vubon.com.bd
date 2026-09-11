export interface CouponCalculationData {
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscountAmount?: { amount: number };
}

export const calculateCouponDiscountAmount = (amount: number, percentage: number): number => {
  return (amount * percentage) / 100;
};

export const calculateCouponDiscount = (
  coupon: CouponCalculationData,
  subtotal: number
): number => {
  if (coupon.discountType === 'percentage') {
    return calculateCouponDiscountAmount(subtotal, coupon.discountValue);
  }
  return coupon.discountValue;
};

export const calculateCouponValue = (coupon: CouponCalculationData, subtotal: number): number => {
  const discount = calculateCouponDiscount(coupon, subtotal);
  return Math.min(discount, coupon.maxDiscountAmount?.amount || discount);
};
