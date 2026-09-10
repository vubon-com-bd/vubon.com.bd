import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ANALYTICS_QUERY } from '@vubon/shared-constants/src/platform/analytics/analytics-query.constants';

const analyticsQueryTypeKeys = Object.keys(ANALYTICS_QUERY.TYPES) as [string, ...string[]];
const analyticsQueryOperationKeys = Object.keys(ANALYTICS_QUERY.QUERY_OPERATIONS) as [
  string,
  ...string[],
];
const analyticsQueryGranularityKeys = Object.keys(ANALYTICS_QUERY.TIME_GRANULARITY) as [
  string,
  ...string[],
];

export const AnalyticsQuerySchema = BaseSchema.extend({
  queryId: z.string().uuid(),
  analyticsId: z.string().uuid(),
  type: z.enum(analyticsQueryTypeKeys),
  metric: z.enum(analyticsQueryOperationKeys),
  dimensions: z.array(z.string()),
  granularity: z.enum(analyticsQueryGranularityKeys),
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
