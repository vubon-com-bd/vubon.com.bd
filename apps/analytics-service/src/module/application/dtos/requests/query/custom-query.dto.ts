import { z } from 'zod';

const VALID_AGGREGATIONS = [
  'sum', 'avg', 'min', 'max', 'count', 'count_distinct',
  'median', 'stddev', 'variance',
] as const;

export const CustomQuerySchema = z
  .object({
    metrics: z
      .array(
        z.object({
          name: z.string().min(1).max(100),
          aggregation: z.enum(VALID_AGGREGATIONS),
        }),
      )
      .min(1)
      .max(50),
    dimensions: z.array(z.string().min(1).max(50)).max(10).optional(),
    fromDate: z.string().datetime(),
    toDate: z.string().datetime(),
    limit: z.number().int().positive().max(10_000).optional().default(1000),
  })
  .strict()
  .refine(
    (d) => new Date(d.toDate).getTime() >= new Date(d.fromDate).getTime(),
    'toDate must be >= fromDate',
  );

export type CustomQueryDTO = z.infer<typeof CustomQuerySchema>;
