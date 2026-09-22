import { z } from 'zod';

export const MoveToSavedRequestSchema = z.object({
  cartId: z.string().uuid(),
  itemId: z.string().uuid(),
  userId: z.string().uuid(),
}).strict();

export type MoveToSavedRequestDTO = z.infer<typeof MoveToSavedRequestSchema>;
