import { z } from 'zod';

export const DeliverShipmentRequestSchema = z.object({
  shipmentId: z.string().uuid(),
  deliveredAt: z.string().datetime().optional(),
  signature: z.string().optional(),
  photoUrl: z.string().url().optional(),
});

export type DeliverShipmentRequestDTO = z.infer<typeof DeliverShipmentRequestSchema>;
