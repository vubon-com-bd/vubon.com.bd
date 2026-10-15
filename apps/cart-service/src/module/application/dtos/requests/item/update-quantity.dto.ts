/**
 * Update Quantity Request DTO
 * @module cart-service/application/dtos/requests/item
 */
import { z } from 'zod';

export const UpdateQuantityRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    itemId: z.string().uuid(),
    quantity: z.number().int().min(1).max(999),
    idempotencyKey: z.string().min(16).max(128).optional(),
  })
  .strict();

export type UpdateQuantityRequestDTO = z.infer<typeof UpdateQuantityRequestSchema>;
