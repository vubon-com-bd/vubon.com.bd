import { z } from 'zod';

export const UpdateItemRequestSchema = z.object({
  cartId: z.string().uuid(),
  itemId: z.string().uuid(),
  quantity: z.number().int().positive().max(999),
  note: z.string().max(500).optional(),
}).strict();

export type UpdateItemRequestDTO = z.infer<typeof UpdateItemRequestSchema>;
