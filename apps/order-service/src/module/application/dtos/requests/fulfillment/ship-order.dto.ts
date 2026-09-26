import { z } from 'zod';

export const ShipOrderRequestSchema = z.object({
  fulfillmentId: z.string().min(1),
  trackingNumber: z.string().min(6).max(32).optional(),
  carrier: z.string().max(100).optional(),
});

export type ShipOrderRequestDTO = z.infer<typeof ShipOrderRequestSchema>;
