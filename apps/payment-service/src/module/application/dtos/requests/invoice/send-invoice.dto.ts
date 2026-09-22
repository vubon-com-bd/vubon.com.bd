import { z } from 'zod';

export const SendInvoiceRequestSchema = z.object({
  invoiceId: z.string().uuid(),
  toEmail: z.string().email().optional(),
}).strict();

export type SendInvoiceRequestDTO = z.infer<typeof SendInvoiceRequestSchema>;
