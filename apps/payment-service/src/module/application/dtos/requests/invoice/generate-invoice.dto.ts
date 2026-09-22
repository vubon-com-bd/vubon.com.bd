import { z } from 'zod';

export const GenerateInvoiceRequestSchema = z.object({
  userId: z.string().uuid().optional(),
  orderId: z.string().uuid().optional(),
  subscriptionId: z.string().uuid().optional(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  taxAmount: z.number().nonnegative().optional(),
  dueAt: z.string().datetime().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export type GenerateInvoiceRequestDTO = z.infer<typeof GenerateInvoiceRequestSchema>;
