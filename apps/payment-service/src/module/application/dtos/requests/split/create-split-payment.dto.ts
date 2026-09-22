import { z } from 'zod';

export const SplitShareSchema = z.object({
  recipientId: z.string().uuid(),
  percentage: z.number().positive().max(100),
});

export const CreateSplitPaymentRequestSchema = z.object({
  paymentId: z.string().uuid(),
  splitType: z.enum(['percentage', 'fixed', 'flat', 'tiered']),
  shares: z.array(SplitShareSchema).min(1).max(50),
  currency: z.string().length(3),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export type CreateSplitPaymentRequestDTO = z.infer<typeof CreateSplitPaymentRequestSchema>;
export type SplitShareDTO = z.infer<typeof SplitShareSchema>;
