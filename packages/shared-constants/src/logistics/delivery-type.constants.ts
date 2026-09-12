import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { DELIVERY_METHOD } from '../business/checkout/delivery-method.constants';

export const DELIVERY_TYPE = {
  ...COMMON_TYPES,
  ...DELIVERY_METHOD.TYPES,
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  NEXT_DAY: 'next_day',
  SCHEDULED: 'scheduled',
  INSTANT: 'instant',
  ECONOMY: 'economy',
  PRIORITY: 'priority',
} as const;
