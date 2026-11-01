/**
 * Remove Item Request DTO
 * @module cart-service/application/dtos/requests/item
 */
import { z } from 'zod';

export const RemoveItemRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    itemId: z.string().uuid(),
    reason: z.string().max(200).optional(),
  })
  .strict();

export type RemoveItemRequestDTO = z.infer<typeof RemoveItemRequestSchema>;
