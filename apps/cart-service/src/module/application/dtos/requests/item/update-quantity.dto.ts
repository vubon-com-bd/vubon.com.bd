import { z } from 'zod';

export const UpdateQuantityRequestSchema = z.object({
  cartId: z.string().uuid(),
  itemId: z.string().uuid(),
  quantity: z.number().int().positive().max(999),
}).strict();

export type UpdateQuantityRequestDTO = z.infer<typeof UpdateQuantityRequestSchema>;
