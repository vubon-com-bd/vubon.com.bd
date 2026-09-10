import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { FINANCIAL_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/financial-analytics.constants';

const financialAnalyticsTypeKeys = Object.keys(FINANCIAL_ANALYTICS.TYPES) as [string, ...string[]];
const financialAnalyticsMetricKeys = Object.keys(FINANCIAL_ANALYTICS.METRICS) as [
  string,
  ...string[],
];
const financialAnalyticsRatioKeys = Object.keys(FINANCIAL_ANALYTICS.FINANCIAL_RATIOS) as [
  string,
  ...string[],
];

export const FinancialAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  type: z.enum(financialAnalyticsTypeKeys),
  metric: z.enum(financialAnalyticsMetricKeys),
  value: z.number(),
  amount: MoneySchema,
  ratio: z.enum(financialAnalyticsRatioKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
