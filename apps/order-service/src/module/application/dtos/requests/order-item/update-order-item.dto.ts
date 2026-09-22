import { z } from 'zod';

export const UpdateOrderItemRequestSchema = z.object({
  itemId: z.string().min(1),
  quantity: z.number().int().min(1).max(9999).optional(),
  price: z.number().nonnegative().optional(),
});

export type UpdateOrderItemRequestDTO = z.infer<typeof UpdateOrderItemRequestSchema>;
