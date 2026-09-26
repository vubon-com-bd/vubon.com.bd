import { z } from 'zod';

export const RecurringFrequencySchema = z.enum([
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'quarterly',
  'semiannually',
  'yearly',
]);

export const CreateRecurringRequestSchema = z.object({
  paymentId: z.string().uuid(),
  frequency: RecurringFrequencySchema,
  amount: z.number().positive(),
  currency: z.string().length(3),
  nextRunAt: z.string().datetime(),
  maxCycles: z.number().int().positive().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export type CreateRecurringRequestDTO = z.infer<typeof CreateRecurringRequestSchema>;
