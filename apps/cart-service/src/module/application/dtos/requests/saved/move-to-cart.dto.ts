/**
 * Move To Cart Request DTO
 * @module cart-service/application/dtos/requests/saved
 */
import { z } from 'zod';

export const MoveToCartRequestSchema = z
  .object({
    savedItemId: z.string().uuid(),
    cartId: z.string().uuid(),
    quantity: z.number().int().min(1).max(999).optional().default(1),
  })
  .strict();

export type MoveToCartRequestDTO = z.infer<typeof MoveToCartRequestSchema>;
