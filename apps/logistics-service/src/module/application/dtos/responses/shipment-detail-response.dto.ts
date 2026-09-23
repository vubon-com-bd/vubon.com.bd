import { z } from 'zod';
import {
  ShipmentSchema,
  ShipmentSummarySchema,
} from '@vubon/shared-schemas/logistics';

export const ShipmentDetailResponseSchema = ShipmentSchema.extend({
  tracking: z.unknown().optional(),
  delivery: z.unknown().optional(),
  items: z.array(ShipmentSummarySchema).optional(),
});

export type ShipmentDetailResponseDTO = z.infer<typeof ShipmentDetailResponseSchema>;
