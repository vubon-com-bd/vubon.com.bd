/**
 * Flash Sale Coupon Schema
 * ফ্ল্যাশ সেল কুপন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { FLASH_SALE_COUPON } from '@vubon/shared-constants';

export const FlashSaleCouponSchema = BaseSchema.extend({
  flashSaleId: z.string().uuid(),
  couponId: z.string().uuid(),
  code: z.string().min(1, 'Coupon code is required').max(50),
  type: z.enum([
    FLASH_SALE_COUPON.TYPES.DISCOUNT,
    FLASH_SALE_COUPON.TYPES.FREE_SHIPPING,
    FLASH_SALE_COUPON.TYPES.BUY_GET,
    FLASH_SALE_COUPON.TYPES.BUNDLE,
    FLASH_SALE_COUPON.TYPES.FLASH,
  ]),
  discountType: z.enum([
    FLASH_SALE_COUPON.DISCOUNT_TYPES.PERCENTAGE,
    FLASH_SALE_COUPON.DISCOUNT_TYPES.FIXED,
    FLASH_SALE_COUPON.DISCOUNT_TYPES.BUY_X_GET_Y,
  ]),
  value: z.number().min(0, 'Coupon value must be greater than or equal to 0'),
  maxDiscount: z.number().min(0).optional(),
  minOrderAmount: z.number().min(0).optional(),
  description: z.string().optional(),
  status: z.enum([
    FLASH_SALE_COUPON.STATUS.ACTIVE,
    FLASH_SALE_COUPON.STATUS.INACTIVE,
    FLASH_SALE_COUPON.STATUS.USED,
    FLASH_SALE_COUPON.STATUS.EXPIRED,
    FLASH_SALE_COUPON.STATUS.CANCELLED,
    FLASH_SALE_COUPON.STATUS.PENDING,
    FLASH_SALE_COUPON.STATUS.DELETED,
  ]),
  usageLimit: z.number().int().min(0).default(100),
  usedCount: z.number().int().min(0).default(0),
  perUserLimit: z.number().int().min(0).default(1),
  usedPerUser: z.number().int().min(0).default(0),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const FlashSaleCouponCreateSchema = FlashSaleCouponSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  usedCount: true,
  usedPerUser: true,
});

export const FlashSaleCouponUpdateSchema = FlashSaleCouponCreateSchema.partial();

export const FlashSaleCouponValidationSchema = z.object({
  code: z.string().min(1),
  flashSaleId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  subtotal: z.number().min(0).optional(),
});

export type FlashSaleCoupon = z.infer<typeof FlashSaleCouponSchema>;
export type FlashSaleCouponCreate = z.infer<typeof FlashSaleCouponCreateSchema>;
export type FlashSaleCouponUpdate = z.infer<typeof FlashSaleCouponUpdateSchema>;
export type FlashSaleCouponValidation = z.infer<typeof FlashSaleCouponValidationSchema>;
