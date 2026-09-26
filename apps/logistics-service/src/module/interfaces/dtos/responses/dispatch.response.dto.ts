import { z } from 'zod';
import { DispatchPublicSchema } from '@vubon/shared-schemas/logistics';
export type DispatchResponseDTO = z.infer<typeof DispatchPublicSchema>;
