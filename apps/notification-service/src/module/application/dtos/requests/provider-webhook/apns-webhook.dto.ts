import { z } from 'zod';

export const ApnsWebhookSchema = z.object({
  apnsId: z.string(),
  deviceToken: z.string(),
  status: z.enum(['delivered', 'failed', 'invalid']),
  reason: z.string().optional(),
});

export type ApnsWebhookRequestDTO = z.infer<typeof ApnsWebhookSchema>;
