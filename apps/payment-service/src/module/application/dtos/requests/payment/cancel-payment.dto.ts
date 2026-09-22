import { z } from 'zod';

export const CancelPaymentRequestSchema = z.object({
  paymentId: z.string().uuid(),
  reason: z.string().max(500).optional(),
}).strict();

export type CancelPaymentRequestDTO = z.infer<typeof CancelPaymentRequestSchema>;
