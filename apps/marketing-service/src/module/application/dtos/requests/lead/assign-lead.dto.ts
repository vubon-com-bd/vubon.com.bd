import { z } from 'zod';

export const AssignLeadRequestSchema = z.object({
  leadId: z.string().uuid(),
  assigneeId: z.string().uuid(),
});

export type AssignLeadRequestDTO = z.infer<typeof AssignLeadRequestSchema>;
