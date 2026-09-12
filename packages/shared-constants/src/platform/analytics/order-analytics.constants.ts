import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ORDER_STATUS } from '../../business/checkout/order-status.constants';

export const ORDER_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    FULFILLMENT: 'fulfillment',
    RETURN: 'return',
    CANCELLATION: 'cancellation',
    COMPLETION: 'completion',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  METRICS: {
    TOTAL_ORDERS: 'total_orders',
    COMPLETED_ORDERS: 'completed_orders',
    PENDING_ORDERS: 'pending_orders',
    PROCESSING_ORDERS: 'processing_orders',
    SHIPPED_ORDERS: 'shipped_orders',
    CANCELLED_ORDERS: 'cancelled_orders',
    RETURNED_ORDERS: 'returned_orders',
    AVERAGE_FULFILLMENT_TIME: 'average_fulfillment_time',
  },
  FULFILLMENT_TIMES: {
    PROCESSING: 'processing_time',
    SHIPPING: 'shipping_time',
    DELIVERY: 'delivery_time',
  },
} as const;
