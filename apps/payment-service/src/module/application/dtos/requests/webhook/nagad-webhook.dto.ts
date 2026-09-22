import { z } from 'zod';

export const NagadWebhookSchema = z.object({
  paymentRefId: z.string().min(1),
  orderId: z.string().min(1),
  amount: z.string().min(1),
  status: z.string().min(1),
  signature: z.string().min(1),
}).passthrough();

export type NagadWebhookDTO = z.infer<typeof NagadWebhookSchema>;
