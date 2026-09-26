import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const ORDER_STATUS = {
  PENDING: COMMON_STATUS.PENDING,
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  PACKED: 'packed',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
  REFUNDED: 'refunded',
  FAILED: 'failed',
  ON_HOLD: 'on_hold',
} as const;

export const ORDER_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export type OrderStatusType = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];
export type OrderPriorityType = (typeof ORDER_PRIORITY)[keyof typeof ORDER_PRIORITY];
