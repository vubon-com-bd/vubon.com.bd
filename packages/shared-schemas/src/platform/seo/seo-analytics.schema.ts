import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_ANALYTICS } from '@vubon/shared-constants/src/platform/seo/seo-analytics.constants';
import { SEOKeywordSchema } from './seo-keyword.schema';
import { SEORankingSchema } from './seo-ranking.schema';
import { SEOScoreSchema } from './seo-score.schema';

const analyticsTypeKeys = Object.keys(SEO_ANALYTICS.TYPES) as [string, ...string[]];
const analyticsMetricKeys = Object.keys(SEO_ANALYTICS.METRICS) as [string, ...string[]];
const analyticsGranularityKeys = Object.keys(SEO_ANALYTICS.ANALYTICS_GRANULARITY) as [
  string,
  ...string[],
];

export const SEOAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(analyticsTypeKeys),
  metric: z.enum(analyticsMetricKeys),
  value: z.number(),
  keyword: SEOKeywordSchema,
  ranking: SEORankingSchema,
  score: SEOScoreSchema,
  period: z.enum(analyticsGranularityKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
