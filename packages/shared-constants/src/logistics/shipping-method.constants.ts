import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { SHIPPING_METHODS as COMMON_SHIPPING_METHODS } from '../common/shipping-methods.constants';
import { VENDOR_SHIPPING } from '../business/vendor/vendor-shipping.constants';

export const SHIPPING_METHOD = {
  TYPES: {
    ...COMMON_TYPES,
    ...COMMON_SHIPPING_METHODS,
    ...VENDOR_SHIPPING.TYPES,
    ECONOMY: 'economy',
    STANDARD: 'standard',
    EXPRESS: 'express',
    PRIORITY: 'priority',
    OVERNIGHT: 'overnight',
    SAME_DAY: 'same_day',
    INTERNATIONAL: 'international',
  },
  COMMON_SHIPPING_METHODS: { ...COMMON_SHIPPING_METHODS },
  VENDOR_SHIPPING: { ...VENDOR_SHIPPING },
  SHIPPING_CARRIERS: {
    SA_PARIBAHAN: 'sa_paribahan',
    SUNDARBAN: 'sundarban',
    REDX: 'redx',
    PATHAO: 'pathao',
    E_COURIER: 'e_courier',
    DHL: 'dhl',
    FEDEX: 'fedex',
    UPS: 'ups',
  },
  ESTIMATED_DAYS: {
    ECONOMY: 5,
    STANDARD: 3,
    EXPRESS: 2,
    PRIORITY: 1,
    OVERNIGHT: 1,
    SAME_DAY: 0.5,
    INTERNATIONAL: 10,
  },
} as const;
