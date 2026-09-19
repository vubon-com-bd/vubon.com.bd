/**
 * Flash Sale Coupon Schema
 * @module shared-schemas/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sale-coupon.constants থেকে।
 */

import { z } from 'zod';
import { FLASH_SALE_COUPON_TYPE, FLASH_SALE_COUPON } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { MoneySchema } from '../../common/primitives/money.schema';

export const FlashSaleCouponTypeSchema = z.enum(
  Object.values(FLASH_SALE_COUPON_TYPE) as [string, ...string[]]
);

export const FlashSaleCouponSchema = z.object({
  id: UuidSchema,
  flashSaleId: UuidSchema,
  couponId: UuidSchema.optional(),
  code: z.string().min(4).max(32),
  type: FlashSaleCouponTypeSchema,
  discountValue: z.number().positive(),
  maxDiscountAmount: MoneySchema.optional(),
  minOrderAmount: MoneySchema.optional(),
  maxUses: z.number().int().positive().max(FLASH_SALE_COUPON.MAX_USES_PER_COUPON),
  usedCount: z.number().int().nonnegative(),
  maxUsesPerUser: z.number().int().positive().max(100),
  isStackable: z.boolean(),
  isActive: z.boolean(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  createdAt: z.string().datetime(),
});

export type FlashSaleCouponTypeSchemaType = z.infer<typeof FlashSaleCouponTypeSchema>;
export type FlashSaleCouponSchemaType = z.infer<typeof FlashSaleCouponSchema>;
