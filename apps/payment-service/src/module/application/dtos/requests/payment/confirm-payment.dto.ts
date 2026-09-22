import { z } from 'zod';

export const ConfirmPaymentRequestSchema = z.object({
  paymentId: z.string().uuid(),
  idempotencyKey: z.string().min(8).max(128).optional(),
}).strict();

export type ConfirmPaymentRequestDTO = z.infer<typeof ConfirmPaymentRequestSchema>;
