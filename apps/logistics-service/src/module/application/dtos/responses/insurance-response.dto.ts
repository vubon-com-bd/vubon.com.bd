import { z } from 'zod';
import { InsuranceSchema } from '@vubon/shared-schemas/logistics';

export type InsuranceResponseDTO = z.infer<typeof InsuranceSchema>;
