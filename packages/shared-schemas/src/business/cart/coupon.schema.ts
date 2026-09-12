import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { COUPON } from '@vubon/shared-constants/src/business/cart/coupon.constants';

const couponStatusKeys = Object.keys(COUPON.STATUS) as [string, ...string[]];
const couponTypeKeys = Object.keys(COUPON.TYPES) as [string, ...string[]];

export const CouponSchema = BaseSchema.extend({
  couponId: z.string().uuid(),
  code: z.string().min(3).max(50),
  status: z.enum(couponStatusKeys),
  type: z.enum(couponTypeKeys),
  discountType: z.enum(['percentage', 'fixed']),
  discountValue: z.number().min(0),
  maxDiscountAmount: MoneySchema.optional(),
  minOrderAmount: MoneySchema.optional(),
  usageLimit: z.number().int().min(1),
  usageCount: z.number().int().min(0).default(0),
  perUserLimit: z.number().int().min(1),
  perUserCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
