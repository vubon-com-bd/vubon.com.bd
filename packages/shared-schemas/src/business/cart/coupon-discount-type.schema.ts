/**
 * Coupon Discount Type Schema
 * @module shared-schemas/business/cart
 *
 * Values আসে shared-constants/business/coupon-discount-type.constants থেকে।
 */

import { z } from 'zod';
import { COUPON_DISCOUNT_TYPE, COUPON_APPLIES_TO } from '@vubon/shared-constants/business';

export const CouponDiscountTypeSchema = z.enum(
  Object.values(COUPON_DISCOUNT_TYPE) as [string, ...string[]]
);

export const CouponAppliesToSchema = z.enum(
  Object.values(COUPON_APPLIES_TO) as [string, ...string[]]
);

export type CouponDiscountTypeSchemaType = z.infer<typeof CouponDiscountTypeSchema>;
export type CouponAppliesToSchemaType = z.infer<typeof CouponAppliesToSchema>;
