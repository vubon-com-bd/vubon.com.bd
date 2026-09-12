import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { OrderSchema } from '../../business/checkout/order.schema';
import { ORDER_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/order-analytics.constants';

const orderAnalyticsTypeKeys = Object.keys(ORDER_ANALYTICS.TYPES) as [string, ...string[]];
const orderAnalyticsMetricKeys = Object.keys(ORDER_ANALYTICS.METRICS) as [string, ...string[]];
const orderAnalyticsFulfillmentTimeKeys = Object.keys(ORDER_ANALYTICS.FULFILLMENT_TIMES) as [
  string,
  ...string[],
];

export const OrderAnalyticsSchema = BaseSchema.extend({
  analyticsId: z.string().uuid(),
  orderId: z.string().uuid(),
  order: OrderSchema,
  type: z.enum(orderAnalyticsTypeKeys),
  metric: z.enum(orderAnalyticsMetricKeys),
  value: z.number(),
  fulfillmentTime: z.enum(orderAnalyticsFulfillmentTimeKeys),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
