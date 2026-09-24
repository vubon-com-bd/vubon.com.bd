import { z } from 'zod';

export const CloseTicketRequestSchema = z.object({
  ticketId: z.string().uuid(),
  reason: z.string().max(500).optional(),
});

export type CloseTicketRequestDTO = z.infer<typeof CloseTicketRequestSchema>;
