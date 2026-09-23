import { z } from 'zod';

export const CancelShipmentRequestSchema = z.object({
  shipmentId: z.string().uuid(),
  reason: z.string().min(1).max(500),
});

export type CancelShipmentRequestDTO = z.infer<typeof CancelShipmentRequestSchema>;
