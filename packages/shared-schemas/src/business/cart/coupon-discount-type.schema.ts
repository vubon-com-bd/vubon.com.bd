import { z } from 'zod';
import { DISCOUNT } from '@vubon/shared-constants/src/common/discount.constants';

const discountKeys = Object.keys(DISCOUNT) as [string, ...string[]];

export const CouponDiscountTypeSchema = z.object({
  type: z.enum(discountKeys),
  category: z.literal('coupon_discount'),
});

export const CouponDiscountTypeEnumSchema = z.enum(discountKeys);
