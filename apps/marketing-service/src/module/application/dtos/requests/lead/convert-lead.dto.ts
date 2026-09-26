import { z } from 'zod';

export const ConvertLeadRequestSchema = z.object({
  leadId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type ConvertLeadRequestDTO = z.infer<typeof ConvertLeadRequestSchema>;
