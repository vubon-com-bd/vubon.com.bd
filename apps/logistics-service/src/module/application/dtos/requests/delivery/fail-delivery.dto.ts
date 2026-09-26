import { z } from 'zod';

export const FailDeliveryRequestSchema = z.object({
  deliveryId: z.string().uuid(),
  reason: z.string().min(1).max(500),
});

export type FailDeliveryRequestDTO = z.infer<typeof FailDeliveryRequestSchema>;
