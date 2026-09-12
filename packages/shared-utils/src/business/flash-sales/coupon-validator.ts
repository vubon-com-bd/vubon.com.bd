import { FLASH_SALE_COUPON } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-coupon.constants';

export interface FlashSaleCouponInput {
  code: string;
  status: string;
  discountValue: number;
}

export const validateFlashSaleCoupon = (
  coupon: Partial<FlashSaleCouponInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!coupon.code) errors.push('Coupon code is required');
  if (coupon.status && !Object.keys(FLASH_SALE_COUPON.STATUS).includes(coupon.status)) {
    errors.push('Invalid coupon status');
  }
  if (coupon.discountValue !== undefined && coupon.discountValue < 0) {
    errors.push('Discount value cannot be negative');
  }
  return { isValid: errors.length === 0, errors };
};
