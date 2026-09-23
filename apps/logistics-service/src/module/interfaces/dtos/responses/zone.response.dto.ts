import { z } from 'zod';
import { ZoneSchema } from '@vubon/shared-schemas/logistics';
export type ZoneResponseDTO = z.infer<typeof ZoneSchema>;
