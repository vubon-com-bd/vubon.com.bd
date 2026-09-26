import { z } from 'zod';
import {
  ANALYTICS_AGGREGATION,
  ANALYTICS_INTERVAL,
} from '@vubon/shared-constants/platform/analytics';

export const AggregateMetricSchema = z
  .object({
    metricNames: z
      .array(z.string().min(1).max(100))
      .min(1)
      .max(20, 'Max 20 metrics per aggregation'),
    aggregation: z.enum(
      Object.values(ANALYTICS_AGGREGATION) as [string, ...string[]],
    ),
    interval: z
      .enum(Object.values(ANALYTICS_INTERVAL) as [string, ...string[]])
      .optional(),
    groupBy: z.array(z.string().min(1).max(50)).max(10).optional(),
    fromDate: z.string().datetime(),
    toDate: z.string().datetime(),
    limit: z.number().int().positive().max(10_000).optional().default(1000),
  })
  .strict()
  .refine(
    (d) => new Date(d.toDate).getTime() >= new Date(d.fromDate).getTime(),
    'toDate must be >= fromDate',
  )
  .refine(
    (d) => {
      const rangeDays =
        (new Date(d.toDate).getTime() - new Date(d.fromDate).getTime()) /
        (24 * 60 * 60 * 1000);
      return rangeDays <= 365 * 5;
    },
    'Date range cannot exceed 5 years',
  );

export type AggregateMetricDTO = z.infer<typeof AggregateMetricSchema>;

/**
 * Business logic: resolves granularity if not specified based on range.
 */
export function resolveGranularity(dto: AggregateMetricDTO): string {
  if (dto.interval) return dto.interval;
  const rangeDays =
    (new Date(dto.toDate).getTime() - new Date(dto.fromDate).getTime()) /
    (24 * 60 * 60 * 1000);
  if (rangeDays <= 1) return ANALYTICS_INTERVAL.HOUR;
  if (rangeDays <= 30) return ANALYTICS_INTERVAL.DAY;
  if (rangeDays <= 180) return ANALYTICS_INTERVAL.WEEK;
  return ANALYTICS_INTERVAL.MONTH;
}
