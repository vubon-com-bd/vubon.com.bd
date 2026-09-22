import { z } from 'zod';

export const RemoveItemRequestSchema = z.object({
  cartId: z.string().uuid(),
  itemId: z.string().uuid(),
}).strict();

export type RemoveItemRequestDTO = z.infer<typeof RemoveItemRequestSchema>;
