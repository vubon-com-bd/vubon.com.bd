import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { RETENTION_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/retention-analytics.constants';

const retentionAnalyticsTypeKeys = Object.keys(RETENTION_ANALYTICS.TYPES) as [string, ...string[]];
const retentionAnalyticsMetricKeys = Object.keys(RETENTION_ANALYTICS.METRICS) as [
  string,
  ...string[],
];
const retentionAnalyticsPeriodKeys = Object.keys(RETENTION_ANALYTICS.RETENTION_PERIODS) as [
  string,
  ...string[],
];
const retentionAnalyticsChurnReasonKeys = Object.keys(RETENTION_ANALYTICS.CHURN_REASONS) as [
  string,
  ...string[],
];

export const RetentionAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(retentionAnalyticsTypeKeys),
  metric: z.enum(retentionAnalyticsMetricKeys),
  value: z.number(),
  period: z.enum(retentionAnalyticsPeriodKeys),
  reason: z.enum(retentionAnalyticsChurnReasonKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
