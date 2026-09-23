import { z } from 'zod';

export const PathaoWebhookSchema = z.object({
  consignment_id: z.string(),
  delivery_status: z.string(),
  updated_at: z.string(),
  signature: z.string().optional(),
});

export type PathaoWebhookDTO = z.infer<typeof PathaoWebhookSchema>;
