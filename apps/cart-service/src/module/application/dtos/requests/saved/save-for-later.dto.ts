import { z } from 'zod';

export const SaveForLaterRequestSchema = z.object({
  cartId: z.string().uuid(),
  itemId: z.string().uuid(),
  userId: z.string().uuid(),
}).strict();

export type SaveForLaterRequestDTO = z.infer<typeof SaveForLaterRequestSchema>;
