import { z } from 'zod';
import {
  ShipmentCreateInputSchema,
  ShipmentListFilterSchema,
} from '@vubon/shared-schemas/logistics';

export type CreateShipmentRequestDTO = z.infer<typeof ShipmentCreateInputSchema>;
export type ShipmentListFilterDTO = z.infer<typeof ShipmentListFilterSchema>;

export const UpdateShipmentRequestSchema = ShipmentCreateInputSchema.partial();
export type UpdateShipmentRequestDTO = z.infer<typeof UpdateShipmentRequestSchema>;
