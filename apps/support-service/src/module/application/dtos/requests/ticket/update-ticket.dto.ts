import { z } from 'zod';

export const UpdateTicketRequestSchema = z.object({
  subject: z.string().min(3).max(200).optional(),
  description: z.string().max(5000).optional(),
  priority: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateTicketRequestDTO = z.infer<typeof UpdateTicketRequestSchema>;
