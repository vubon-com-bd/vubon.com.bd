/**
 * Create Cart Request DTO
 * @module cart-service/application/dtos/requests/cart
 */
import { z } from 'zod';

export const CreateCartRequestSchema = z
  .object({
    type: z.enum(['guest', 'user', 'wishlist', 'saved', 'subscription']).optional().default('user'),
    currency: z.string().length(3).optional().default('BDT'),
    sessionId: z.string().max(128).optional(),
    idempotencyKey: z.string().min(16).max(128).optional(),
    notes: z.string().max(500).optional(),
  })
  .strict();

export type CreateCartRequestDTO = z.infer<typeof CreateCartRequestSchema>;
