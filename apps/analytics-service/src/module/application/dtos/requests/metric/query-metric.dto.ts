/**
 * Query Metric Request DTO
 * @module analytics-service/application/dtos/requests/metric
 */
import { z } from 'zod';
import {
  AnalyticsMetricNameSchema,
  AnalyticsPeriodValueSchema,
} from '@vubon/shared-schemas/platform/analytics';

export const QueryMetricSchema = z.object({
  metric: AnalyticsMetricNameSchema,
  period: AnalyticsPeriodValueSchema,
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  dimensions: z.array(z.string().min(1).max(50)).max(10).optional(),
});

export type QueryMetricDto = z.input<typeof QueryMetricSchema>;
