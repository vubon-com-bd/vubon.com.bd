/**
 * Time Series Query Request DTO
 * @module analytics-service/application/dtos/requests/query
 */
import { z } from 'zod';
import { ANALYTICS_GRANULARITY } from '@vubon/shared-constants/platform/analytics';

const GranularityEnum = z.enum(
  Object.values(ANALYTICS_GRANULARITY) as [string, ...string[]]
);

export const TimeSeriesQuerySchema = z.object({
  metric: z.string().min(1).max(100),
  aggregation: z.enum(['sum', 'avg', 'min', 'max', 'count']).default('sum'),
  granularity: GranularityEnum,
  fromDate: z.string().datetime(),
  toDate: z.string().datetime(),
  dimensions: z.array(z.string().min(1).max(100)).max(5).optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  fillGaps: z.boolean().default(true),
  smooth: z.number().int().positive().max(30).optional(),
});

export type TimeSeriesQueryDto = z.input<typeof TimeSeriesQuerySchema>;
