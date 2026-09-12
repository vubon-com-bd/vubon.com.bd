import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SHIPPING_METHODS } from '../../common/shipping-methods.constants';
import { SHIPPING } from '../cart/shipping.constants';

export const DELIVERY_METHOD = {
  TYPES: {
    ...COMMON_TYPES,
    ...SHIPPING_METHODS,
    ...SHIPPING.TYPES,
    HOME_DELIVERY: 'home_delivery',
    PICKUP_POINT: 'pickup_point',
    LOCKER: 'locker',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    STANDARD: 'standard',
  },
  SHIPPING_METHODS: { ...SHIPPING_METHODS },
  SHIPPING: { ...SHIPPING },
  DELIVERY_SLOTS: {
    MORNING: '9am-12pm',
    AFTERNOON: '12pm-5pm',
    EVENING: '5pm-9pm',
  },
} as const;
