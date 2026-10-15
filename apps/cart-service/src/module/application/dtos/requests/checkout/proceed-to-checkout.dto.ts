/**
 * Proceed To Checkout Request DTO
 * @module cart-service/application/dtos/requests/checkout
 */
import { z } from 'zod';

export const ProceedToCheckoutRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    addressId: z.string().uuid().optional(),
    shippingMethod: z
      .enum(['standard', 'express', 'same_day', 'pickup', 'international'])
      .optional(),
    notes: z.string().max(500).optional(),
    idempotencyKey: z.string().min(16).max(128).optional(),
  })
  .strict();

export type ProceedToCheckoutRequestDTO = z.infer<typeof ProceedToCheckoutRequestSchema>;
