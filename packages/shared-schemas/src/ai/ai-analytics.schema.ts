import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AI_ANALYTICS } from '@vubon/shared-constants/src/ai/ai-analytics.constants';

const aiAnalyticsTypeKeys = Object.keys(AI_ANALYTICS.TYPES) as [string, ...string[]];
const aiAnalyticsAlgorithmKeys = Object.keys(AI_ANALYTICS.ANALYTICS_ALGORITHMS) as [
  string,
  ...string[],
];
const aiAnalyticsMetricKeys = Object.keys(AI_ANALYTICS.METRICS) as [string, ...string[]];

export const AIAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  aiId: z.string().uuid(),
  type: z.enum(aiAnalyticsTypeKeys),
  algorithm: z.enum(aiAnalyticsAlgorithmKeys),
  metric: z.enum(aiAnalyticsMetricKeys),
  value: z.number(),
  confidence: z.number().min(0).max(1),
  period: z.enum(['hourly', 'daily', 'weekly', 'monthly', 'yearly']),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
