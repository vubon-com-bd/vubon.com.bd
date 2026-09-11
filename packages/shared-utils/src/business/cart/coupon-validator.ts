import { COUPON } from '@vubon/shared-constants/src/business/cart/coupon.constants';

export interface CouponInput {
  code: string;
  status: string;
  type: string;
  discountValue: number;
  isActive: boolean;
  expiresAt: Date;
  usageCount: number;
  usageLimit: number;
}

export const validateCoupon = (
  coupon: Partial<CouponInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!coupon.code) errors.push('Coupon code is required');
  if (coupon.status && !Object.keys(COUPON.STATUS).includes(coupon.status)) {
    errors.push('Invalid coupon status');
  }
  if (coupon.type && !Object.keys(COUPON.TYPES).includes(coupon.type)) {
    errors.push('Invalid coupon type');
  }
  if (coupon.discountValue !== undefined && coupon.discountValue < 0) {
    errors.push('Discount value cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};

export const isCouponValid = (coupon: CouponInput): boolean => {
  return (
    coupon.isActive &&
    new Date(coupon.expiresAt) > new Date() &&
    coupon.usageCount < coupon.usageLimit
  );
};
