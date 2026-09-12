import { z } from 'zod';
import { COUPON } from '@vubon/shared-constants/src/business/cart/coupon.constants';

const couponTypeKeys = Object.keys(COUPON.TYPES) as [string, ...string[]];

export const CouponTypeSchema = z.object({
  type: z.enum(couponTypeKeys),
  category: z.literal('coupon'),
});

export const CouponTypeEnumSchema = z.enum(couponTypeKeys);
