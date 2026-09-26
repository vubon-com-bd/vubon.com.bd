import { z } from 'zod';

export const RejectCancelRequestSchema = z.object({
  cancelId: z.string().min(1),
  reason: z.string().min(1).max(500),
});

export type RejectCancelRequestDTO = z.infer<typeof RejectCancelRequestSchema>;
