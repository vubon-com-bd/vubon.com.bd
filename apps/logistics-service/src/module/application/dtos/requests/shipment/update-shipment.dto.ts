import { z } from 'zod';
import { ShipmentCreateInputSchema } from '@vubon/shared-schemas/logistics';

export const UpdateShipmentRequestSchema = ShipmentCreateInputSchema.partial();
export type UpdateShipmentRequestDTO = z.infer<typeof UpdateShipmentRequestSchema>;
