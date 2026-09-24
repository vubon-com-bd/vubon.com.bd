import { z } from 'zod';

export const RateTicketRequestSchema = z.object({
  ticketId: z.string().uuid(),
  score: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
});

export type RateTicketRequestDTO = z.infer<typeof RateTicketRequestSchema>;
