import { z } from 'zod';

export const FcmWebhookSchema = z.object({
  messageId: z.string(),
  deviceToken: z.string(),
  status: z.enum(['delivered', 'failed', 'invalid']),
  error: z.string().optional(),
});

export type FcmWebhookRequestDTO = z.infer<typeof FcmWebhookSchema>;
