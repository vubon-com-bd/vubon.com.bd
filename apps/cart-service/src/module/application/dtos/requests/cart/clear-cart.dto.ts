import { z } from 'zod';

export const ClearCartRequestSchema = z.object({
  cartId: z.string().uuid(),
}).strict();

export type ClearCartRequestDTO = z.infer<typeof ClearCartRequestSchema>;
