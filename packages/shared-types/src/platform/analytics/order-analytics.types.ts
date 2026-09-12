import { BaseEntity } from '../../common/base.types';
import { Order } from '../../business/checkout/order.types';
import { ORDER_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/order-analytics.constants';

export interface OrderAnalytics extends BaseEntity {
  analyticsId: string;
  orderId: string;
  order: Order;
  type: keyof typeof ORDER_ANALYTICS.TYPES | string;
  metric: keyof typeof ORDER_ANALYTICS.METRICS | string;
  value: number;
  fulfillmentTime: keyof typeof ORDER_ANALYTICS.FULFILLMENT_TIMES | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
