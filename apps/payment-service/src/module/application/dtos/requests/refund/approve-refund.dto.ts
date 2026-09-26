import { z } from 'zod';

export const ApproveRefundRequestSchema = z.object({
  refundId: z.string().uuid(),
  amount: z.number().positive().optional(),
  note: z.string().max(500).optional(),
}).strict();

export type ApproveRefundRequestDTO = z.infer<typeof ApproveRefundRequestSchema>;
