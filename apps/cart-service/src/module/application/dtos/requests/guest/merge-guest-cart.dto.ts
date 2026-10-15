/**
 * Merge Guest Cart Request DTO
 * @module cart-service/application/dtos/requests/guest
 */
import { z } from 'zod';

export const MergeGuestCartRequestSchema = z
  .object({
    guestToken: z.string().min(16).max(128),
    userId: z.string().uuid(),
    strategy: z
      .enum(['sum_quantity', 'max_quantity', 'keep_latest', 'keep_existing', 'replace'])
      .optional()
      .default('sum_quantity'),
    idempotencyKey: z.string().min(16).max(128).optional(),
  })
  .strict();

export type MergeGuestCartRequestDTO = z.infer<typeof MergeGuestCartRequestSchema>;
