/**
 * Validate Coupon Request DTO
 * @module cart-service/application/dtos/requests/coupon
 *
 * Dry-run — does NOT apply, just validates.
 */
import { z } from 'zod';

export const ValidateCouponRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    code: z.string().trim().toUpperCase().min(4).max(32),
  })
  .strict();

export type ValidateCouponRequestDTO = z.infer<typeof ValidateCouponRequestSchema>;
