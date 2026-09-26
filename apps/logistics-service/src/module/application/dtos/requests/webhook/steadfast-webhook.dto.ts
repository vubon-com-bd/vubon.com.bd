import { z } from 'zod';

export const SteadfastWebhookSchema = z.object({
  tracking_code: z.string(),
  status: z.string(),
  updated_at: z.string(),
  signature: z.string().optional(),
});

export type SteadfastWebhookDTO = z.infer<typeof SteadfastWebhookSchema>;
