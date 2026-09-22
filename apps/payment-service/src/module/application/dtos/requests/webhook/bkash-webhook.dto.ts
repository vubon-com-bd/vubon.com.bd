import { z } from 'zod';

export const BkashWebhookSchema = z.object({
  paymentID: z.string().min(1),
  trxID: z.string().min(1),
  amount: z.string().min(1),
  currency: z.string().length(3),
  intent: z.string().min(1),
  merchantInvoiceNumber: z.string().min(1),
  transactionStatus: z.string().min(1),
  signature: z.string().min(1),
}).passthrough();

export type BkashWebhookDTO = z.infer<typeof BkashWebhookSchema>;
