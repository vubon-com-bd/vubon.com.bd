import { z } from 'zod';
import { DriverSchema } from '@vubon/shared-schemas/logistics';

export type DriverResponseDTO = z.infer<typeof DriverSchema>;
