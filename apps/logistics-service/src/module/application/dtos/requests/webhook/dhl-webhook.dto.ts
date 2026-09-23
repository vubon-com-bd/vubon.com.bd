import { z } from 'zod';

export const DhlWebhookSchema = z.object({
  shipmentTrackingNumber: z.string(),
  status: z.string(),
  timestamp: z.string(),
  signature: z.string().optional(),
});

export type DhlWebhookDTO = z.infer<typeof DhlWebhookSchema>;
