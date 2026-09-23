import { z } from 'zod';
import { ReturnReasonSchema } from '@vubon/shared-schemas/logistics';
export type ReturnReasonResponseDTO = z.infer<typeof ReturnReasonSchema>;
