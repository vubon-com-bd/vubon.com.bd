import { z } from 'zod';

export const AnalyzeSessionSchema = z
  .object({
    fromDate: z.string().datetime(),
    toDate: z.string().datetime(),
    userId: z.string().min(1).max(128).optional(),
  })
  .strict()
  .refine(
    (d) => new Date(d.toDate).getTime() >= new Date(d.fromDate).getTime(),
    'toDate must be >= fromDate',
  );

export type AnalyzeSessionDTO = z.infer<typeof AnalyzeSessionSchema>;
