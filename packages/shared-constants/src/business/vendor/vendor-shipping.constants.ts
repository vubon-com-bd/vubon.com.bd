import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SHIPPING_METHODS } from '../../common/shipping-methods.constants';
import { SHIPPING } from '../cart/shipping.constants';
import { VENDOR_ADDRESS } from './vendor-address.constants';

export const VENDOR_SHIPPING = {
  TYPES: {
    ...COMMON_TYPES,
    ...SHIPPING_METHODS,
    ...SHIPPING.TYPES,
  },
  SHIPPING_METHODS: { ...SHIPPING_METHODS },
  SHIPPING: { ...SHIPPING },
  VENDOR_ADDRESS: { ...VENDOR_ADDRESS },
  SHIPPING_ZONES: ['domestic', 'international', 'local', 'regional'],
  SHIPPING_WEIGHTS: {
    LIGHT: '0-1kg',
    MEDIUM: '1-5kg',
    HEAVY: '5-20kg',
    BULKY: '20kg+',
  },
  FREE_SHIPPING_THRESHOLD: 500,
  DEFAULT_SHIPPING_CHARGE: 50,
  MAX_SHIPPING_METHODS: 10,
} as const;
