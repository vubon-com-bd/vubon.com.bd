import { z } from 'zod';

export const PickUpShipmentRequestSchema = z.object({
  shipmentId: z.string().uuid(),
  courierId: z.string().uuid(),
  pickedUpAt: z.string().datetime().optional(),
});

export type PickUpShipmentRequestDTO = z.infer<typeof PickUpShipmentRequestSchema>;
