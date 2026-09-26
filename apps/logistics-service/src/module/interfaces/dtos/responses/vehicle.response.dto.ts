import { z } from 'zod';
import { VehiclePublicSchema } from '@vubon/shared-schemas/logistics';
export type VehicleResponseDTO = z.infer<typeof VehiclePublicSchema>;
