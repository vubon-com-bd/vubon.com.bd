/**
 * Flash Sale Coupon Validator
 * ফ্ল্যাশ সেল কুপন ভ্যালিডেটর
 */

import { FLASH_SALE_COUPON } from '@vubon/shared-constants';
import { FlashSaleCouponSchema } from '@vubon/shared-schemas';
import type { FlashSaleCoupon } from '@vubon/shared-types';

export interface FlashSaleCouponValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: FlashSaleCoupon;
}

export const validateFlashSaleCoupon = (data: unknown): FlashSaleCouponValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid coupon data'] },
    };
  }

  const coupon = data as Record<string, unknown>;

  // Flash sale ID validation
  if (!coupon.flashSaleId || typeof coupon.flashSaleId !== 'string') {
    errors.flashSaleId = ['Flash sale ID is required'];
    valid = false;
  }

  // Code validation
  if (!coupon.code || typeof coupon.code !== 'string' || coupon.code.length < 1) {
    errors.code = ['Coupon code is required'];
    valid = false;
  }

  // Type validation using FLASH_SALE_COUPON
  if (coupon.type) {
    const typeValues = Object.values(FLASH_SALE_COUPON.TYPES) as string[];
    if (!typeValues.includes(coupon.type as string)) {
      errors.type = ['Invalid coupon type'];
      valid = false;
    }
  } else {
    errors.type = ['Coupon type is required'];
    valid = false;
  }

  // Value validation
  if (coupon.value !== undefined) {
    if (typeof coupon.value !== 'number' || coupon.value < 0) {
      errors.value = ['Coupon value must be a positive number'];
      valid = false;
    }
  } else {
    errors.value = ['Coupon value is required'];
    valid = false;
  }

  // Status validation using FLASH_SALE_COUPON.STATUS
  if (coupon.status) {
    const statusValues = Object.values(FLASH_SALE_COUPON.STATUS) as string[];
    if (!statusValues.includes(coupon.status as string)) {
      errors.status = ['Invalid coupon status'];
      valid = false;
    }
  }

  // Discount type validation
  if (coupon.discountType) {
    const discountTypeValues = Object.values(FLASH_SALE_COUPON.DISCOUNT_TYPES) as string[];
    if (!discountTypeValues.includes(coupon.discountType as string)) {
      errors.discountType = ['Invalid discount type'];
      valid = false;
    }
  }

  try {
    const validatedData = FlashSaleCouponSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as FlashSaleCoupon,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateFlashSaleCouponCreate = (data: unknown): FlashSaleCouponValidationResult => {
  return validateFlashSaleCoupon(data);
};

export const validateFlashSaleCouponUpdate = (data: unknown): FlashSaleCouponValidationResult => {
  return validateFlashSaleCoupon(data);
};
