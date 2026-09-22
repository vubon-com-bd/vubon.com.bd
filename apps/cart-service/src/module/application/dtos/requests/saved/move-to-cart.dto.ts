import { z } from 'zod';

export const MoveToCartRequestSchema = z.object({
  savedItemId: z.string().uuid(),
  cartId: z.string().uuid(),
}).strict();

export type MoveToCartRequestDTO = z.infer<typeof MoveToCartRequestSchema>;
