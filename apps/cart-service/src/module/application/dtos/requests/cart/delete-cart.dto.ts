import { z } from 'zod';

export const DeleteCartRequestSchema = z.object({
  cartId: z.string().uuid(),
}).strict();

export type DeleteCartRequestDTO = z.infer<typeof DeleteCartRequestSchema>;
