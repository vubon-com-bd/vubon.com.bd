import { z } from 'zod';

export const QualifyLeadRequestSchema = z.object({
  leadId: z.string().uuid(),
});

export type QualifyLeadRequestDTO = z.infer<typeof QualifyLeadRequestSchema>;
