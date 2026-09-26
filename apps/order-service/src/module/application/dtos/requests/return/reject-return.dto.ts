import { z } from 'zod';

export const RejectReturnRequestSchema = z.object({
  returnId: z.string().min(1),
  reason: z.string().min(1).max(500),
});

export type RejectReturnRequestDTO = z.infer<typeof RejectReturnRequestSchema>;
