/**
 * Delete Cart Request DTO
 * @module cart-service/application/dtos/requests/cart
 */
import { z } from 'zod';

export const DeleteCartRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    hardDelete: z.boolean().optional().default(false),
    reason: z.string().max(200).optional(),
  })
  .strict();

export type DeleteCartRequestDTO = z.infer<typeof DeleteCartRequestSchema>;
