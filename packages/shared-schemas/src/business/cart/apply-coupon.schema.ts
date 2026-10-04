/**
 * Apply Coupon Request Schema
 * @module shared-schemas/business/cart/requests
 */

import { z } from 'zod';

export const ApplyCouponRequestSchema = z
  .object({
    code: z.string().trim().toUpperCase().min(4).max(32),
  })
  .strict();

export const RemoveCouponRequestSchema = z
  .object({
    couponId: z.string().min(1),
  })
  .strict();

export type ApplyCouponRequestSchemaType = z.infer<typeof ApplyCouponRequestSchema>;
export type RemoveCouponRequestSchemaType = z.infer<typeof RemoveCouponRequestSchema>;
