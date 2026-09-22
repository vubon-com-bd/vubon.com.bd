import { z } from 'zod';

export const RetryPaymentRequestSchema = z.object({
  paymentId: z.string().uuid(),
  idempotencyKey: z.string().min(8).max(128).optional(),
}).strict();

export type RetryPaymentRequestDTO = z.infer<typeof RetryPaymentRequestSchema>;
