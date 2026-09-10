import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { SALES_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/sales-analytics.constants';

const salesAnalyticsTypeKeys = Object.keys(SALES_ANALYTICS.TYPES) as [string, ...string[]];
const salesAnalyticsMetricKeys = Object.keys(SALES_ANALYTICS.METRICS) as [string, ...string[]];
const salesAnalyticsComparisonPeriodKeys = Object.keys(SALES_ANALYTICS.COMPARISON_PERIODS) as [
  string,
  ...string[],
];

export const SalesAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(salesAnalyticsTypeKeys),
  metric: z.enum(salesAnalyticsMetricKeys),
  value: z.number(),
  amount: MoneySchema,
  period: z.enum(salesAnalyticsComparisonPeriodKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
