import { z } from 'zod';

export const RedxWebhookSchema = z.object({
  tracking_id: z.string(),
  status: z.string(),
  updated_at: z.string(),
  signature: z.string().optional(),
});

export type RedxWebhookDTO = z.infer<typeof RedxWebhookSchema>;
