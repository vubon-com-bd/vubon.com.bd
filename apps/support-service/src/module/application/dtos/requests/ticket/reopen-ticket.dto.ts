import { z } from 'zod';

export const ReopenTicketRequestSchema = z.object({
  ticketId: z.string().uuid(),
  reason: z.string().min(1).max(500),
});

export type ReopenTicketRequestDTO = z.infer<typeof ReopenTicketRequestSchema>;
