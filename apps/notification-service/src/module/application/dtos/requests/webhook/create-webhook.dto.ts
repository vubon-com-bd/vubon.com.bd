import { z } from 'zod';

export const CreateWebhookSchema = z.object({
  type: z.enum(['http', 'slack', 'discord', 'telegram', 'teams']),
  url: z.string().url(),
  secret: z.string().min(16).max(256).optional(),
  events: z.array(z.string().min(1).max(100)).min(1).max(50),
});

export type CreateWebhookRequestDTO = z.infer<typeof CreateWebhookSchema>;
