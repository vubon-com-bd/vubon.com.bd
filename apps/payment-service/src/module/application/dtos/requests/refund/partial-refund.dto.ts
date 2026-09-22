import { z } from 'zod';

export const PartialRefundRequestSchema = z.object({
  paymentId: z.string().uuid(),
  amount: z.number().positive(),
  reason: z.string().max(500).optional(),
  idempotencyKey: z.string().min(8).max(128).optional(),
}).strict();

export type PartialRefundRequestDTO = z.infer<typeof PartialRefundRequestSchema>;
