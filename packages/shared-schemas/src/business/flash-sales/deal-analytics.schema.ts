import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { DEAL_ANALYTICS } from '@vubon/shared-constants/src/business/flash-sales/deal-analytics.constants';

const analyticsTypeKeys = Object.keys(DEAL_ANALYTICS.TYPES) as [string, ...string[]];
const analyticsMetricKeys = Object.keys(DEAL_ANALYTICS.METRICS) as [string, ...string[]];
const analyticsGranularityKeys = Object.keys(DEAL_ANALYTICS.ANALYTICS_GRANULARITY) as [
  string,
  ...string[],
];

export const DealAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  dealId: z.string().uuid(),
  type: z.enum(analyticsTypeKeys),
  metric: z.enum(analyticsMetricKeys),
  value: z.number(),
  period: z.enum(analyticsGranularityKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
