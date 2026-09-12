import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { METRICS } from '@vubon/shared-constants/src/common/types.constants';

const metricsKeys = Object.keys(METRICS) as [string, ...string[]];

export const VendorAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  vendorId: z.string().uuid(),
  metric: z.enum(metricsKeys),
  value: z.number(),
  period: z.enum(['hourly', 'daily', 'weekly', 'monthly', 'yearly']),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

export const VendorAnalyticsSummarySchema = z.object({
  totalVisits: z.number(),
  uniqueVisitors: z.number(),
  pageViews: z.number(),
  bounceRate: z.number(),
  averageSessionDuration: z.number(),
  conversionRate: z.number(),
  averageOrderValue: z.number(),
  totalRevenue: z.number(),
  totalOrders: z.number(),
  totalCommission: z.number(),
});
