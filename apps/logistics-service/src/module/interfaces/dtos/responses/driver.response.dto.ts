import { z } from 'zod';
import { DriverPublicSchema } from '@vubon/shared-schemas/logistics';
export type DriverResponseDTO = z.infer<typeof DriverPublicSchema>;
