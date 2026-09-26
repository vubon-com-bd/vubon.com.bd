import { z } from 'zod';

const VALID_PERIODS = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'] as const;

export const CreateCohortSchema = z
  .object({
    name: z.string().min(2).max(150),
    period: z.enum(VALID_PERIODS),
    fromDate: z.string().datetime(),
    toDate: z.string().datetime(),
    userIds: z.array(z.string().min(1).max(128)).min(1).max(100_000),
  })
  .strict()
  .refine(
    (d) => new Date(d.toDate).getTime() >= new Date(d.fromDate).getTime(),
    'toDate must be >= fromDate',
  );

export type CreateCohortDTO = z.infer<typeof CreateCohortSchema>;
