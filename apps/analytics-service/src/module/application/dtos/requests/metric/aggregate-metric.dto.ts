/**
 * Aggregate Metric Request DTO
 * @module analytics-service/application/dtos/requests/metric
 */
import { z } from 'zod';
import {
  AnalyticsMetricNameSchema,
  AnalyticsAggregationSchema,
  AnalyticsPeriodValueSchema,
} from '@vubon/shared-schemas/platform/analytics';

export const AggregateMetricSchema = z.object({
  metric: AnalyticsMetricNameSchema,
  aggregation: AnalyticsAggregationSchema,
  period: AnalyticsPeriodValueSchema,
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  dimensions: z.array(z.string().min(1).max(50)).max(10).optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
});

export type AggregateMetricDto = z.input<typeof AggregateMetricSchema>;
