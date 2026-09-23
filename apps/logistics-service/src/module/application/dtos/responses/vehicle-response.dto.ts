import { z } from 'zod';
import { VehicleSchema } from '@vubon/shared-schemas/logistics';

export type VehicleResponseDTO = z.infer<typeof VehicleSchema>;
