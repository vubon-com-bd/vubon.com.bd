import { z } from 'zod';

export const PickupReturnRequestSchema = z.object({
  returnShipmentId: z.string().uuid(),
  courierId: z.string().uuid().optional(),
});

export type PickupReturnRequestDTO = z.infer<typeof PickupReturnRequestSchema>;
