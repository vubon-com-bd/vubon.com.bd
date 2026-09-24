import { z } from 'zod';

export const AssignTicketRequestSchema = z.object({
  ticketId: z.string().uuid(),
  agentId: z.string().uuid(),
});

export type AssignTicketRequestDTO = z.infer<typeof AssignTicketRequestSchema>;
