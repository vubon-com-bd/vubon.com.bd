import { z } from 'zod';

export const UpdateWebhookSchema = z.object({
  webhookId: z.string().uuid(),
  url: z.string().url().optional(),
  secret: z.string().min(16).max(256).optional(),
  events: z.array(z.string().min(1).max(100)).min(1).max(50).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export type UpdateWebhookRequestDTO = z.infer<typeof UpdateWebhookSchema>;
