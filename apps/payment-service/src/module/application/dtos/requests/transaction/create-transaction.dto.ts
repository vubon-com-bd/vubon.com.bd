import { z } from 'zod';

export const CreateTransactionRequestSchema = z.object({
  paymentId: z.string().uuid(),
  type: z.string().min(1).max(50),
  amount: z.number().positive(),
  currency: z.string().length(3),
  gateway: z.string().max(50).optional(),
  reference: z.string().max(128).optional(),
  idempotencyKey: z.string().min(8).max(128).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export type CreateTransactionRequestDTO = z.infer<typeof CreateTransactionRequestSchema>;
