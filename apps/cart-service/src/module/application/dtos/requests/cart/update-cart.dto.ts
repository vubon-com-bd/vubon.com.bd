import { z } from 'zod';

export const UpdateCartRequestSchema = z.object({
  cartId: z.string().uuid(),
  currency: z.string().length(3).optional(),
}).strict();

export type UpdateCartRequestDTO = z.infer<typeof UpdateCartRequestSchema>;
