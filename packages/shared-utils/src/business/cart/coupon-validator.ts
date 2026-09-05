/**
 * Coupon Validator
 * কুপন ভ্যালিডেটর
 */

import { COUPON_TYPES } from '@vubon/shared-constants';
import { CouponSchema } from '@vubon/shared-schemas';
import type { CartCoupon } from '@vubon/shared-types';

export interface CouponValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: CartCoupon;
}

export interface CouponCodeValidation {
  valid: boolean;
  code: string;
  message?: string;
  coupon?: CartCoupon;
  savings?: number;
}

export const validateCoupon = (data: unknown): CouponValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid coupon data'] },
    };
  }

  const coupon = data as Record<string, unknown>;

  // Code validation
  if (!coupon.code || typeof coupon.code !== 'string' || coupon.code.length < 1) {
    errors.code = ['Coupon code is required'];
    valid = false;
  } else if (coupon.code.length > 50) {
    errors.code = ['Coupon code must be less than 50 characters'];
    valid = false;
  }

  // Type validation
  if (coupon.type) {
    const typeValues = Object.values(COUPON_TYPES);
    const typeStr = String(coupon.type);
    if (!typeValues.includes(typeStr as (typeof COUPON_TYPES)[keyof typeof COUPON_TYPES])) {
      errors.type = ['Invalid coupon type'];
      valid = false;
    }
  } else {
    errors.type = ['Coupon type is required'];
    valid = false;
  }

  // Discount type validation
  if (coupon.discountType) {
    const validDiscountTypes = ['percentage', 'fixed', 'buy_x_get_y'];
    if (!validDiscountTypes.includes(String(coupon.discountType))) {
      errors.discountType = ['Invalid discount type'];
      valid = false;
    }
  } else {
    errors.discountType = ['Discount type is required'];
    valid = false;
  }

  // Value validation
  if (coupon.value !== undefined) {
    if (typeof coupon.value !== 'number' || coupon.value < 0) {
      errors.value = ['Discount value must be a positive number'];
      valid = false;
    }
  } else {
    errors.value = ['Discount value is required'];
    valid = false;
  }

  // Cart ID validation
  if (!coupon.cartId || typeof coupon.cartId !== 'string') {
    errors.cartId = ['Cart ID is required'];
    valid = false;
  }

  // Coupon ID validation
  if (!coupon.couponId || typeof coupon.couponId !== 'string') {
    errors.couponId = ['Coupon ID is required'];
    valid = false;
  }

  try {
    const validatedData = CouponSchema.parse(data);
    // CartCoupon টাইপের সাথে ম্যাপ করা - BaseEntity এর deletedAt যোগ
    const cartCoupon: CartCoupon = {
      id: validatedData.id || '',
      cartId: (data as Record<string, unknown>).cartId as string,
      couponId: (data as Record<string, unknown>).couponId as string,
      code: validatedData.code,
      type: validatedData.type as (typeof COUPON_TYPES)[keyof typeof COUPON_TYPES],
      discountType: validatedData.discountType as 'percentage' | 'fixed' | 'buy_x_get_y',
      value: validatedData.value,
      maxDiscount: validatedData.maxDiscount,
      minOrderAmount: validatedData.minOrderAmount,
      description: validatedData.description,
      expiresAt: validatedData.endDate,
      isApplied: false,
      savings: 0,
      createdAt: validatedData.createdAt || new Date(),
      updatedAt: validatedData.updatedAt || new Date(),
      deletedAt: null, // BaseEntity থেকে required
    };
    return {
      valid: true,
      errors: {},
      data: cartCoupon,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateCouponCode = (code: string, coupons: CartCoupon[]): CouponCodeValidation => {
  const coupon = coupons.find((c) => c.code === code);

  if (!coupon) {
    return {
      valid: false,
      code,
      message: 'Invalid coupon code',
    };
  }

  // Check if already applied
  if (coupon.isApplied) {
    return {
      valid: false,
      code,
      message: 'Coupon already applied',
    };
  }

  // Check expiration
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return {
      valid: false,
      code,
      message: 'Coupon has expired',
    };
  }

  return {
    valid: true,
    code,
    coupon,
    savings: coupon.savings,
  };
};

export const validateCouponCreate = (data: unknown): CouponValidationResult => {
  return validateCoupon(data);
};

export const validateCouponUpdate = (data: unknown): CouponValidationResult => {
  return validateCoupon(data);
};
