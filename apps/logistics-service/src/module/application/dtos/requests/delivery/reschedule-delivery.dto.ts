import { z } from 'zod';

export const RescheduleDeliveryRequestSchema = z.object({
  deliveryId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
  reason: z.string().max(500).optional(),
});

export type RescheduleDeliveryRequestDTO = z.infer<typeof RescheduleDeliveryRequestSchema>;
