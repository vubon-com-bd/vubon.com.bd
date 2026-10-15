/**
 * Create Guest Cart Request DTO
 * @module cart-service/application/dtos/requests/guest
 */
import { z } from 'zod';

export const CreateGuestCartRequestSchema = z
  .object({
    currency: z.string().length(3).optional().default('BDT'),
    sessionId: z.string().max(128).optional(),
    ttlHours: z.number().int().min(1).max(720).optional(),
  })
  .strict();

export type CreateGuestCartRequestDTO = z.infer<typeof CreateGuestCartRequestSchema>;
