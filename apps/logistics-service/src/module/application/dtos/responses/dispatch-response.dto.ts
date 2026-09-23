import { z } from 'zod';
import { DispatchSchema } from '@vubon/shared-schemas/logistics';

export type DispatchResponseDTO = z.infer<typeof DispatchSchema>;
