import { z } from 'zod';

export const SaParibahanWebhookSchema = z.object({
  trackingNumber: z.string(),
  status: z.string(),
  timestamp: z.string().datetime(),
  signature: z.string().optional(),
});

export type SaParibahanWebhookDTO = z.infer<typeof SaParibahanWebhookSchema>;
