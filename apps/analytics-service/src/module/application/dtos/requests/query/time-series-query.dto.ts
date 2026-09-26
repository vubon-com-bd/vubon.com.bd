import { z } from 'zod';

const VALID_INTERVALS = [
  'minute', 'five_minutes', 'fifteen_minutes', 'thirty_minutes',
  'hour', 'six_hours', 'twelve_hours', 'day', 'week', 'month', 'quarter', 'year',
] as const;

export const TimeSeriesQuerySchema = z
  .object({
    metricName: z.string().min(1).max(100),
    interval: z.enum(VALID_INTERVALS),
    fromDate: z.string().datetime(),
    toDate: z.string().datetime(),
    dimensions: z.array(z.string().min(1).max(50)).max(5).optional(),
    fillGaps: z.boolean().optional().default(true),
  })
  .strict()
  .refine(
    (d) => new Date(d.toDate).getTime() >= new Date(d.fromDate).getTime(),
    'toDate must be >= fromDate',
  );

export type TimeSeriesQueryDTO = z.infer<typeof TimeSeriesQuerySchema>;
