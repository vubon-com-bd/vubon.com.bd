import { z } from 'zod';

export const VoidInvoiceRequestSchema = z.object({
  invoiceId: z.string().uuid(),
  reason: z.string().max(500).optional(),
}).strict();

export type VoidInvoiceRequestDTO = z.infer<typeof VoidInvoiceRequestSchema>;
