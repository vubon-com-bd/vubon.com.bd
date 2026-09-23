import { z } from 'zod';
import { ShipmentSchema } from '@vubon/shared-schemas/logistics';

export type ShipmentResponseDTO = z.infer<typeof ShipmentSchema>;
