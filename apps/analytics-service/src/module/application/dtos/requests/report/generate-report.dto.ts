import { z } from 'zod';

export const GenerateReportSchema = z
  .object({
    reportId: z.string().min(1).max(128),
    fromDate: z.string().datetime(),
    toDate: z.string().datetime(),
    filters: z.record(z.string(), z.unknown()).optional(),
  })
  .strict()
  .refine(
    (d) => new Date(d.toDate).getTime() >= new Date(d.fromDate).getTime(),
    'toDate must be >= fromDate',
  );

export type GenerateReportDTO = z.infer<typeof GenerateReportSchema>;
