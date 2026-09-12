import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { SHIPPING_METHODS } from '../common/shipping-methods.constants';

export const SHIPMENT_TYPE = {
  ...COMMON_TYPES,
  ...SHIPPING_METHODS,
  AIR: 'air',
  OCEAN: 'ocean',
  LAND: 'land',
  RAIL: 'rail',
  COURIER: 'courier',
  POSTAL: 'postal',
  FREIGHT: 'freight',
  EXPRESS: 'express',
  STANDARD: 'standard',
  OVERNIGHT: 'overnight',
  SAME_DAY: 'same_day',
  INTERNATIONAL: 'international',
  DOMESTIC: 'domestic',
} as const;
