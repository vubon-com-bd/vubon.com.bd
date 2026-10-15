/**
 * Update Cart Request DTO
 * @module cart-service/application/dtos/requests/cart
 */
import { z } from 'zod';

export const UpdateCartRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    notes: z.string().max(500).optional(),
  })
  .strict()
  .refine((d) => d.notes !== undefined, {
    message: 'At least notes must be provided',
  });

export type UpdateCartRequestDTO = z.infer<typeof UpdateCartRequestSchema>;
