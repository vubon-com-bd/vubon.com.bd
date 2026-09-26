import { z } from 'zod';

export const CancelRecurringRequestSchema = z.object({
  recurringId: z.string().uuid(),
  reason: z.string().max(500).optional(),
}).strict();

export type CancelRecurringRequestDTO = z.infer<typeof CancelRecurringRequestSchema>;
