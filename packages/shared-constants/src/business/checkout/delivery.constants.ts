import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ORDER_STATUS } from './order-status.constants';
import { SHIPPING } from '../cart/shipping.constants';
import { DELIVERY_METHOD } from './delivery-method.constants';
import { USER_ADDRESS } from '../../user/user-address.constants';

export const DELIVERY = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    DELIVERY_ATTEMPTED: 'delivery_attempted',
    RETURNED: 'returned',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  TYPES: {
    ...COMMON_TYPES,
    STANDARD: 'standard',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    INTERNATIONAL: 'international',
  },
  ORDER_STATUS: { ...ORDER_STATUS },
  SHIPPING: { ...SHIPPING },
  DELIVERY_METHOD: { ...DELIVERY_METHOD },
  USER_ADDRESS: { ...USER_ADDRESS },
  DELIVERY_ATTEMPTS_MAX: 3,
  DELIVERY_WINDOW_HOURS: 12,
  SIGNATURE_REQUIRED: true,
  AGE_RESTRICTED: false,
} as const;
