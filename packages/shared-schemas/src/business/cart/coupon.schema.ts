/**
 * Coupon Schema
 * কুপন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { COUPON_TYPES } from '@vubon/shared-constants';

export const CouponSchema = BaseSchema.extend({
  code: z.string().min(1, 'Coupon code is required').max(50),
  type: z.enum(Object.values(COUPON_TYPES) as [string, ...string[]]),
  discountType: z.enum(['percentage', 'fixed', 'buy_x_get_y']),
  value: z.number().min(0, 'Discount value must be greater than or equal to 0'),
  maxDiscount: z.number().min(0).optional(),
  minOrderAmount: z.number().min(0).optional(),
  description: z.string().optional(),
  descriptionBangla: z.string().optional(),
  status: z.enum(['active', 'inactive', 'expired', 'used', 'pending', 'deleted']),
  usageLimit: z.number().int().min(0).default(100),
  usedCount: z.number().int().min(0).default(0),
  perUserLimit: z.number().int().min(0).default(1),
  usedPerUser: z.number().int().min(0).default(0),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const CouponCreateSchema = CouponSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  usedCount: true,
  usedPerUser: true,
});

export const CouponUpdateSchema = CouponCreateSchema.partial();

export const CouponValidationSchema = z.object({
  code: z.string().min(1),
  cartId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  subtotal: z.number().min(0).optional(),
});

export type Coupon = z.infer<typeof CouponSchema>;
export type CouponCreate = z.infer<typeof CouponCreateSchema>;
export type CouponUpdate = z.infer<typeof CouponUpdateSchema>;
export type CouponValidation = z.infer<typeof CouponValidationSchema>;
