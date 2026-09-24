import { z } from 'zod';

export const TwilioWebhookSchema = z.object({
  MessageSid: z.string(),
  MessageStatus: z.enum([
    'queued', 'sent', 'delivered', 'undelivered', 'failed',
  ]),
  To: z.string(),
  From: z.string(),
  ErrorCode: z.string().optional(),
});

export type TwilioWebhookRequestDTO = z.infer<typeof TwilioWebhookSchema>;
