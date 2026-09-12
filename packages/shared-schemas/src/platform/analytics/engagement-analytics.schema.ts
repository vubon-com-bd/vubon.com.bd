import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ENGAGEMENT_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/engagement-analytics.constants';

const engagementAnalyticsTypeKeys = Object.keys(ENGAGEMENT_ANALYTICS.TYPES) as [
  string,
  ...string[],
];
const engagementAnalyticsMetricKeys = Object.keys(ENGAGEMENT_ANALYTICS.METRICS) as [
  string,
  ...string[],
];
const engagementAnalyticsScoreKeys = Object.keys(ENGAGEMENT_ANALYTICS.ENGAGEMENT_SCORES) as [
  string,
  ...string[],
];

export const EngagementAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(engagementAnalyticsTypeKeys),
  metric: z.enum(engagementAnalyticsMetricKeys),
  value: z.number(),
  score: z.enum(engagementAnalyticsScoreKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
