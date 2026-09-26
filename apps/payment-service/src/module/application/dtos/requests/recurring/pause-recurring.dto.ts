import { z } from 'zod';

export const PauseRecurringRequestSchema = z.object({
  recurringId: z.string().uuid(),
  reason: z.string().max(500).optional(),
}).strict();

export type PauseRecurringRequestDTO = z.infer<typeof PauseRecurringRequestSchema>;
