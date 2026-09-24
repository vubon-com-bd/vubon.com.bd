import { z } from 'zod';

export const AnalyzeFunnelSchema = z
  .object({
    funnelId: z.string().min(1).max(128),
    fromDate: z.string().datetime(),
    toDate: z.string().datetime(),
  })
  .strict()
  .refine(
    (d) => new Date(d.toDate).getTime() >= new Date(d.fromDate).getTime(),
    'toDate must be >= fromDate',
  );

export type AnalyzeFunnelDTO = z.infer<typeof AnalyzeFunnelSchema>;
