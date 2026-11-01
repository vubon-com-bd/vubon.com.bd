/**
 * Move To Saved Request DTO
 * @module cart-service/application/dtos/requests/item
 */
import { z } from 'zod';

export const MoveToSavedRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    itemId: z.string().uuid(),
    note: z.string().max(500).optional(),
  })
  .strict();

export type MoveToSavedRequestDTO = z.infer<typeof MoveToSavedRequestSchema>;
