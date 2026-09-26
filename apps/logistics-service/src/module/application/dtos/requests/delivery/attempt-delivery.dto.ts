import { z } from 'zod';

export const AttemptDeliveryRequestSchema = z.object({
  deliveryId: z.string().uuid(),
  status: z.string().min(1),
  note: z.string().max(500).optional(),
});

export type AttemptDeliveryRequestDTO = z.infer<typeof AttemptDeliveryRequestSchema>;
