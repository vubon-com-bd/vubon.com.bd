import { z } from 'zod';

export const ReverseTransactionRequestSchema = z.object({
  transactionId: z.string().uuid(),
  reason: z.string().max(500).optional(),
}).strict();

export type ReverseTransactionRequestDTO = z.infer<typeof ReverseTransactionRequestSchema>;
