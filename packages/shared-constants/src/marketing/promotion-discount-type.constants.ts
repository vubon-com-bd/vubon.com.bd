import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { DISCOUNT } from '../common/discount.constants';

export const PROMOTION_DISCOUNT_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    ...DISCOUNT,
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    TIERED: 'tiered',
    VOLUME: 'volume',
    BUNDLE: 'bundle',
  },
  DISCOUNT: { ...DISCOUNT },
} as const;
