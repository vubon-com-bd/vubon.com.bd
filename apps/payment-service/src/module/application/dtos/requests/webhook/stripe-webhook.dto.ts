import { z } from 'zod';

export const StripeWebhookSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  data: z.object({
    object: z.record(z.string(), z.unknown()),
  }),
  signature: z.string().min(1),
}).passthrough();

export type StripeWebhookDTO = z.infer<typeof StripeWebhookSchema>;
