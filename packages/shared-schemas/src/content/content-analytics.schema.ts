import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { CONTENT_ANALYTICS } from '@vubon/shared-constants/src/content/content-analytics.constants';

const analyticsTypeKeys = Object.keys(CONTENT_ANALYTICS.TYPES) as [string, ...string[]];
const analyticsMetricKeys = Object.keys(CONTENT_ANALYTICS.METRICS) as [string, ...string[]];
const analyticsGranularityKeys = Object.keys(CONTENT_ANALYTICS.ANALYTICS_GRANULARITY) as [
  string,
  ...string[],
];

export const ContentAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  contentId: z.string().uuid(),
  type: z.enum(analyticsTypeKeys),
  metric: z.enum(analyticsMetricKeys),
  value: z.number(),
  period: z.enum(analyticsGranularityKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

export const ContentAnalyticsSummarySchema = z.object({
  totalViews: z.number().int().min(0),
  uniqueViews: z.number().int().min(0),
  averageReadTime: z.number().min(0),
  bounceRate: z.number().min(0).max(100),
  shareCount: z.number().int().min(0),
  commentCount: z.number().int().min(0),
  reactionCount: z.number().int().min(0),
  conversionRate: z.number().min(0).max(100),
});
