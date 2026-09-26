import { z } from 'zod';

export const RecurringPublicResponseSchema = z.object({
  id: z.string().uuid(),
  paymentId: z.string().uuid(),
  frequency: z.string(),
  status: z.string(),
  amount: z.number(),
  currency: z.string().length(3),
  nextRunAt: z.string().datetime(),
  lastRunAt: z.string().datetime().nullable().optional(),
  completedCycles: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
});

export type RecurringResponseDTO = z.infer<typeof RecurringPublicResponseSchema>;
