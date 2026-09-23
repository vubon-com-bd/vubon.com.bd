import { z } from 'zod';
import { ReturnShipmentSchema } from '@vubon/shared-schemas/logistics';

export type ReturnShipmentResponseDTO = z.infer<typeof ReturnShipmentSchema>;
