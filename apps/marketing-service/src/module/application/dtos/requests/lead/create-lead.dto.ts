import { z } from 'zod';
import { LeadCreateInputSchema } from '@vubon/shared-schemas/marketing';

export type CreateLeadRequestDTO = z.infer<typeof LeadCreateInputSchema>;
