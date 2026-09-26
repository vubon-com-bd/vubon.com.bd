import { z } from 'zod';

export const RescheduleDeliveryRequestSchema = z.object({
  deliveryId: z.string().min(1),
  scheduledAt: z.string().datetime(),
});

export type RescheduleDeliveryRequestDTO = z.infer<typeof RescheduleDeliveryRequestSchema>;
