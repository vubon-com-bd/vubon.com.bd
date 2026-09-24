import { z } from 'zod';

export const TestWebhookSchema = z.object({
  webhookId: z.string().uuid(),
  event: z.string().min(1).max(100),
  data: z.record(z.string(), z.unknown()).optional(),
});

export type TestWebhookRequestDTO = z.infer<typeof TestWebhookSchema>;
