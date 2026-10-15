/**
 * Select Item Request DTO
 * @module cart-service/application/dtos/requests/item
 *
 * Selection toggle for checkout items (checkbox).
 */
import { z } from 'zod';

export const SelectItemRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    itemIds: z.array(z.string().uuid()).min(1).max(100),
    selected: z.boolean().default(true),
  })
  .strict();

export type SelectItemRequestDTO = z.infer<typeof SelectItemRequestSchema>;
