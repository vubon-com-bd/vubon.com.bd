/**
 * Coupon Schema
 * @module shared-schemas/business/cart
 *
 * Values আসে shared-constants/business/coupon.constants থেকে।
 */

import { z } from 'zod';
import { COUPON_STATUS, COUPON_LIMIT } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema } from '../../common/primitives/money.schema';
import { CouponTypeSchema } from './coupon-type.schema';
import { CouponDiscountTypeSchema, CouponAppliesToSchema } from './coupon-discount-type.schema';

export const CouponStatusSchema = z.enum(Object.values(COUPON_STATUS) as [string, ...string[]]);

export const CouponSchema = z.object({
  id: UuidSchema,
  code: z.string().trim().min(COUPON_LIMIT.CODE_MIN_LENGTH).max(COUPON_LIMIT.CODE_MAX_LENGTH),
  name: z.string().min(1).max(150),
  description: z.string().max(1000).optional(),
  type: CouponTypeSchema,
  discountType: CouponDiscountTypeSchema,
  appliesTo: CouponAppliesToSchema,
  status: CouponStatusSchema,
  discountValue: z.number().positive(),
  maxDiscountAmount: MoneySchema.optional(),
  minOrderAmount: MoneySchema.optional(),
  maxUses: z.number().int().positive().max(COUPON_LIMIT.MAX_USES),
  usedCount: z.number().int().nonnegative(),
  maxUsesPerUser: z.number().int().positive(),
  applicableIds: z.array(UuidSchema).max(1000).optional(),
  excludedIds: z.array(UuidSchema).max(1000).optional(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  isStackable: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CouponPublicSchema = CouponSchema.pick({
  id: true,
  code: true,
  name: true,
  type: true,
  discountType: true,
  discountValue: true,
  maxDiscountAmount: true,
  minOrderAmount: true,
  endAt: true,
});

export const CouponUsageSchema = z.object({
  couponId: UuidSchema,
  userId: UuidSchema,
  orderId: UuidSchema,
  discountAmount: MoneySchema,
  usedAt: z.string().datetime(),
});

export type CouponStatusSchemaType = z.infer<typeof CouponStatusSchema>;
export type CouponSchemaType = z.infer<typeof CouponSchema>;
export type CouponPublicSchemaType = z.infer<typeof CouponPublicSchema>;
export type CouponUsageSchemaType = z.infer<typeof CouponUsageSchema>;
