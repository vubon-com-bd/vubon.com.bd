/**
 * Clear Cart Request DTO
 * @module cart-service/application/dtos/requests/cart
 */
import { z } from 'zod';

export const ClearCartRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    reason: z.string().max(200).optional(),
  })
  .strict();

export type ClearCartRequestDTO = z.infer<typeof ClearCartRequestSchema>;
