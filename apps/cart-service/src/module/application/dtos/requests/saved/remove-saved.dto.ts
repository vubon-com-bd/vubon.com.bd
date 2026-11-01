/**
 * Remove Saved Request DTO
 * @module cart-service/application/dtos/requests/saved
 */
import { z } from 'zod';

export const RemoveSavedRequestSchema = z
  .object({
    savedItemId: z.string().uuid(),
    reason: z.string().max(200).optional(),
  })
  .strict();

export type RemoveSavedRequestDTO = z.infer<typeof RemoveSavedRequestSchema>;
