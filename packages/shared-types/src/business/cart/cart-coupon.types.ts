/**
 * Cart Coupon Types
 * কার্ট কুপন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { COUPON_TYPES } from '@vubon/shared-constants';

export interface CartCoupon extends BaseEntity {
  cartId: string;
  couponId: string;
  code: string;
  type: (typeof COUPON_TYPES)[keyof typeof COUPON_TYPES];
  discountType: 'percentage' | 'fixed' | 'buy_x_get_y';
  value: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  description?: string;
  expiresAt?: Date;
  isApplied: boolean;
  savings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartCouponCreateInput {
  code: string;
  type: (typeof COUPON_TYPES)[keyof typeof COUPON_TYPES];
  discountType: 'percentage' | 'fixed' | 'buy_x_get_y';
  value: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  description?: string;
  expiresAt?: Date;
}

export interface CartCouponValidation {
  valid: boolean;
  code: string;
  message?: string;
  savings?: number;
  errors?: string[];
}

export interface CartCouponResponse {
  cartCoupon: CartCoupon;
}
