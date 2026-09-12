import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { AnalyticsQuerySchema } from './analytics-query.schema';
import { AnalyticsResultSchema } from './analytics-result.schema';
import { AnalyticsFilterSchema } from './analytics-filter.schema';
import { AnalyticsGroupSchema } from './analytics-group.schema';
import { AnalyticsSortSchema } from './analytics-sort.schema';
import { AnalyticsPaginationSchema } from './analytics-pagination.schema';
import { ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/analytics.constants';

const analyticsTypeKeys = Object.keys(ANALYTICS.ANALYTICS_TYPES) as [string, ...string[]];
const analyticsStatusKeys = Object.keys(ANALYTICS.STATUS) as [string, ...string[]];

export const AnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(analyticsTypeKeys),
  queries: z.array(AnalyticsQuerySchema),
  results: z.array(AnalyticsResultSchema),
  filters: z.array(AnalyticsFilterSchema),
  groups: z.array(AnalyticsGroupSchema),
  sorts: z.array(AnalyticsSortSchema),
  pagination: AnalyticsPaginationSchema,
  status: z.enum(analyticsStatusKeys),
  isActive: z.boolean().default(true),
  metadata: z.object({
    timezone: z.string(),
    locale: z.string(),
    cacheKey: z.string().optional(),
    cacheTtl: z.number().int().min(1),
    queryTime: z.number().min(0),
    resultCount: z.number().int().min(0),
  }),
});
