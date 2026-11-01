/**
 * Remove Coupon Request DTO
 * @module cart-service/application/dtos/requests/coupon
 */
import { z } from 'zod';

export const RemoveCouponRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    code: z.string().trim().toUpperCase().min(4).max(32),
  })
  .strict();

export type RemoveCouponRequestDTO = z.infer<typeof RemoveCouponRequestSchema>;
