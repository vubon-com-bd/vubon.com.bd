/**
 * Update Item Request DTO
 * @module cart-service/application/dtos/requests/item
 */
import { z } from 'zod';

export const UpdateItemRequestSchema = z
  .object({
    cartId: z.string().uuid(),
    itemId: z.string().uuid(),
    quantity: z.number().int().min(1).max(999).optional(),
    attributes: z.record(z.string(), z.string()).optional(),
    note: z.string().max(500).optional(),
  })
  .strict()
  .refine((d) => d.quantity !== undefined || d.attributes !== undefined || d.note !== undefined, {
    message: 'At least one field must be provided',
  });

export type UpdateItemRequestDTO = z.infer<typeof UpdateItemRequestSchema>;
