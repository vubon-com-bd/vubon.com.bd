import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { ORDER_STATUS } from './order-status.constants';

export const ORDER_TRACKING = {
  STATUS: {
    ...COMMON_STATUS,
    ...ORDER_STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    DELIVERY_ATTEMPTED: 'delivery_attempted',
    RETURNED: 'returned',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  TRACKING_NUMBER_PREFIX: 'TRK',
  TRACKING_NUMBER_LENGTH: 12,
  MAX_TRACKING_UPDATES: 50,
} as const;
