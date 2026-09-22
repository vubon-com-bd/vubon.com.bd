import { z } from 'zod';

export const RejectRefundRequestSchema = z.object({
  refundId: z.string().uuid(),
  reason: z.string().min(1).max(500),
}).strict();

export type RejectRefundRequestDTO = z.infer<typeof RejectRefundRequestSchema>;
