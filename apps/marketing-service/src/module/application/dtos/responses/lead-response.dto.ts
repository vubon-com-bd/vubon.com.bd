import { z } from 'zod';
import {
  LeadSchema,
  LeadPublicSchema,
  LeadSummarySchema,
} from '@vubon/shared-schemas/marketing';

export type LeadResponseDTO = z.infer<typeof LeadSchema>;
export type LeadPublicResponseDTO = z.infer<typeof LeadPublicSchema>;
export type LeadSummaryResponseDTO = z.infer<typeof LeadSummarySchema>;
