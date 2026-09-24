import { z } from 'zod';

export const ResolveTicketRequestSchema = z.object({
  ticketId: z.string().uuid(),
  resolution: z.string().max(2000).optional(),
});

export type ResolveTicketRequestDTO = z.infer<typeof ResolveTicketRequestSchema>;
