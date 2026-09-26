import { z } from 'zod';
import { LeadSummarySchema } from '@vubon/shared-schemas/marketing';

export type LeadScoreResponseDTO = z.infer<typeof LeadSummarySchema>;
