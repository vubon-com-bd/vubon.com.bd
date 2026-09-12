import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { LOGISTICS_ANALYTICS } from '@vubon/shared-constants/src/logistics/logistics-analytics.constants';

const analyticsTypeKeys = Object.keys(LOGISTICS_ANALYTICS.TYPES) as [string, ...string[]];
const analyticsMetricKeys = Object.keys(LOGISTICS_ANALYTICS.METRICS) as [string, ...string[]];
const analyticsGranularityKeys = Object.keys(LOGISTICS_ANALYTICS.ANALYTICS_GRANULARITY) as [
  string,
  ...string[],
];

export const LogisticsAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  logisticsId: z.string().uuid(),
  type: z.enum(analyticsTypeKeys),
  metric: z.enum(analyticsMetricKeys),
  value: z.number(),
  period: z.enum(analyticsGranularityKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

export const LogisticsPerformanceSchema = z.object({
  totalShipments: z.number().int().min(0),
  onTimeDelivery: z.number().min(0).max(100),
  deliverySuccessRate: z.number().min(0).max(100),
  averageDeliveryTime: z.number().min(0),
  averageShippingCost: z.number().min(0),
  returnRate: z.number().min(0).max(100),
  damageRate: z.number().min(0).max(100),
  courierPerformance: z.record(z.number()),
});
