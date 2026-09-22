import { z } from 'zod';

export const MergeGuestCartRequestSchema = z.object({
  guestToken: z.string().min(16).max(128),
  userId: z.string().uuid(),
  strategy: z.enum(['merge', 'keep_source', 'keep_target', 'max_quantity']).optional(),
}).strict();

export type MergeGuestCartRequestDTO = z.infer<typeof MergeGuestCartRequestSchema>;
