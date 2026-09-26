import { z } from 'zod';
import { InsurancePublicSchema } from '@vubon/shared-schemas/logistics';
export type InsuranceResponseDTO = z.infer<typeof InsurancePublicSchema>;
