import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEARCH_ANALYTICS } from '@vubon/shared-constants/src/platform/search/search-analytics.constants';

const analyticsTypeKeys = Object.keys(SEARCH_ANALYTICS.TYPES) as [string, ...string[]];
const analyticsMetricKeys = Object.keys(SEARCH_ANALYTICS.METRICS) as [string, ...string[]];
const analyticsGranularityKeys = Object.keys(SEARCH_ANALYTICS.ANALYTICS_GRANULARITY) as [
  string,
  ...string[],
];

export const SearchAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(analyticsTypeKeys),
  metric: z.enum(analyticsMetricKeys),
  value: z.number(),
  query: z.string().optional(),
  userId: z.string().uuid().optional(),
  sessionId: z.string().optional(),
  ipAddress: z.string().optional(),
  period: z.enum(analyticsGranularityKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

export const SearchAnalyticsSummarySchema = z.object({
  totalSearches: z.number().int().min(0),
  uniqueSearches: z.number().int().min(0),
  zeroResults: z.number().int().min(0),
  clickThroughRate: z.number().min(0).max(100),
  conversionRate: z.number().min(0).max(100),
  averageClickPosition: z.number().min(0),
  averageSearchTime: z.number().min(0),
  popularQueries: z.array(
    z.object({
      query: z.string(),
      count: z.number().int().min(0),
      resultCount: z.number().int().min(0),
      clickRate: z.number().min(0).max(100),
    })
  ),
  fallbackQueries: z.array(z.string()),
});
