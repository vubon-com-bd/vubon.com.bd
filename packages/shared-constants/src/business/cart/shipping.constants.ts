import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { SHIPPING_METHODS } from '../../common/shipping-methods.constants';
import { USER_ADDRESS } from '../../user/user-address.constants';

export const SHIPPING = {
  TYPES: {
    ...COMMON_TYPES,
    STANDARD: 'standard',
    EXPRESS: 'express',
    OVERNIGHT: 'overnight',
    INTERNATIONAL: 'international',
  },
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    RETURNED: 'returned',
  },
  SHIPPING_METHODS: { ...SHIPPING_METHODS },
  USER_ADDRESS: { ...USER_ADDRESS },
  ESTIMATED_DELIVERY_DAYS: {
    STANDARD: 5,
    EXPRESS: 2,
    OVERNIGHT: 1,
    INTERNATIONAL: 10,
  },
} as const;
