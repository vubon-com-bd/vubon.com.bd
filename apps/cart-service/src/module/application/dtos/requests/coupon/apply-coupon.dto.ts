/**
 * Apply Coupon Request DTO
 * @module cart-service/application/dtos/requests/coupon
 */
import { z } from 'zod';

export const ApplyCouponRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    code: z.string().trim().toUpperCase().min(4).max(32),
    idempotencyKey: z.string().min(16).max(128).optional(),
  })
  .strict();

export type ApplyCouponRequestDTO = z.infer<typeof ApplyCouponRequestSchema>;
