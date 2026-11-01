/**
 * Save For Later Request DTO
 * @module cart-service/application/dtos/requests/saved
 */
import { z } from 'zod';

export const SaveForLaterRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    itemId: z.string().uuid(),
    note: z.string().max(500).optional(),
  })
  .strict();

export type SaveForLaterRequestDTO = z.infer<typeof SaveForLaterRequestSchema>;
