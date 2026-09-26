import { z } from 'zod';

export const GetAiUsageSchema = z.object({
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  groupBy: z.enum(['day', 'week', 'month']).default('day'),
});

export type GetAiUsageRequestDTO = z.infer<typeof GetAiUsageSchema>;
