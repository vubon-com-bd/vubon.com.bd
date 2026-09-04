/**
 * Flash Sale Coupon Types
 * ফ্ল্যাশ সেল কুপন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { FLASH_SALE_COUPON } from '@vubon/shared-constants';

export interface FlashSaleCoupon extends BaseEntity {
  flashSaleId: string;
  couponId: string;
  code: string;
  type: (typeof FLASH_SALE_COUPON.TYPES)[keyof typeof FLASH_SALE_COUPON.TYPES];
  discountType: (typeof FLASH_SALE_COUPON.DISCOUNT_TYPES)[keyof typeof FLASH_SALE_COUPON.DISCOUNT_TYPES];
  value: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  description?: string;
  status: (typeof FLASH_SALE_COUPON.STATUS)[keyof typeof FLASH_SALE_COUPON.STATUS];
  usageLimit: number;
  usedCount: number;
  perUserLimit: number;
  usedPerUser: number;
  startDate?: Date;
  endDate?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleCouponCreateInput {
  flashSaleId: string;
  couponId: string;
  code: string;
  type: (typeof FLASH_SALE_COUPON.TYPES)[keyof typeof FLASH_SALE_COUPON.TYPES];
  discountType: (typeof FLASH_SALE_COUPON.DISCOUNT_TYPES)[keyof typeof FLASH_SALE_COUPON.DISCOUNT_TYPES];
  value: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  description?: string;
  usageLimit?: number;
  perUserLimit?: number;
  startDate?: Date;
  endDate?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleCouponUpdateInput {
  status?: (typeof FLASH_SALE_COUPON.STATUS)[keyof typeof FLASH_SALE_COUPON.STATUS];
  usedCount?: number;
  usedPerUser?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleCouponResponse {
  flashSaleCoupon: FlashSaleCoupon;
}
