import { z } from 'zod';

export const SslcommerzWebhookSchema = z.object({
  tran_id: z.string().min(1),
  val_id: z.string().min(1),
  amount: z.string().min(1),
  status: z.string().min(1),
  verify_sign: z.string().min(1),
}).passthrough();

export type SslcommerzWebhookDTO = z.infer<typeof SslcommerzWebhookSchema>;
