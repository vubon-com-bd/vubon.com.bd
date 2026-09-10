import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { PERFORMANCE_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/performance-analytics.constants';

const performanceAnalyticsTypeKeys = Object.keys(PERFORMANCE_ANALYTICS.TYPES) as [
  string,
  ...string[],
];
const performanceAnalyticsMetricKeys = Object.keys(PERFORMANCE_ANALYTICS.METRICS) as [
  string,
  ...string[],
];
const performanceAnalyticsThresholdKeys = Object.keys(
  PERFORMANCE_ANALYTICS.PERFORMANCE_THRESHOLDS
) as [string, ...string[]];

export const PerformanceAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(performanceAnalyticsTypeKeys),
  metric: z.enum(performanceAnalyticsMetricKeys),
  value: z.number(),
  threshold: z.enum(performanceAnalyticsThresholdKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
