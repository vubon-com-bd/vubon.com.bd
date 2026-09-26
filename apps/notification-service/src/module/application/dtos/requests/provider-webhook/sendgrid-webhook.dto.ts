import { z } from 'zod';

export const SendGridWebhookSchema = z.array(
  z.object({
    email: z.string().email(),
    timestamp: z.number().int(),
    event: z.enum([
      'processed', 'dropped', 'delivered', 'deferred',
      'bounce', 'open', 'click', 'spamreport', 'unsubscribe',
    ]),
    sg_message_id: z.string().optional(),
    reason: z.string().optional(),
  }),
);

export type SendGridWebhookRequestDTO = z.infer<typeof SendGridWebhookSchema>;
