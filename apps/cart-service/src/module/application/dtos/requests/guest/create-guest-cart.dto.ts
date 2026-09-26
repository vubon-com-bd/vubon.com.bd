import { z } from 'zod';

export const CreateGuestCartRequestSchema = z.object({
  currency: z.string().length(3),
  ttlHours: z.number().int().positive().max(720).optional(),
}).strict();

export type CreateGuestCartRequestDTO = z.infer<typeof CreateGuestCartRequestSchema>;
