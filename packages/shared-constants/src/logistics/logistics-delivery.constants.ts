import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { DELIVERY_METHOD } from '../business/checkout/delivery-method.constants';
import { ORDER_STATUS } from '../business/checkout/order-status.constants';
import { VENDOR_SHIPPING } from '../business/vendor/vendor-shipping.constants';

export const LOGISTICS_DELIVERY = {
  STATUS: {
    ...COMMON_STATUS,
    SCHEDULED: 'scheduled',
    ASSIGNED: 'assigned',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    DELIVERY_ATTEMPTED: 'delivery_attempted',
    RESCHEDULED: 'rescheduled',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
  },
  DELIVERY_METHOD: { ...DELIVERY_METHOD },
  ORDER_STATUS: { ...ORDER_STATUS },
  VENDOR_SHIPPING: { ...VENDOR_SHIPPING },
  DELIVERY_TYPES: {
    HOME: 'home',
    OFFICE: 'office',
    PICKUP_POINT: 'pickup_point',
    LOCKER: 'locker',
  },
  DELIVERY_WINDOWS: {
    MORNING: '9am-12pm',
    AFTERNOON: '12pm-5pm',
    EVENING: '5pm-9pm',
    ANYTIME: 'anytime',
  },
  MAX_ATTEMPTS: 3,
  DELIVERY_TIMEOUT_HOURS: 72,
} as const;
