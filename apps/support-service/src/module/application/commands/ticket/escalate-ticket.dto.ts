import { z } from 'zod';

export const EscalateTicketRequestSchema = z.object({
  ticketId: z.string().uuid(),
  reason: z.string().min(1).max(500),
  level: z.enum(['L1', 'L2', 'L3', 'L4']).optional(),
});

export type EscalateTicketRequestDTO = z.infer<typeof EscalateTicketRequestSchema>;
