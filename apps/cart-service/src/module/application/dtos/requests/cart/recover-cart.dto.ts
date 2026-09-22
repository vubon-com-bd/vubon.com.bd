import { z } from 'zod';

export const RecoverCartRequestSchema = z.object({
  abandonedId: z.string().uuid(),
  userId: z.string().uuid(),
}).strict();

export type RecoverCartRequestDTO = z.infer<typeof RecoverCartRequestSchema>;
