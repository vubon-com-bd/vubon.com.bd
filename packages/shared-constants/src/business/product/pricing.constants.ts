import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';

export const PRICING = {
  TYPES: {
    ...COMMON_TYPES,
    FIXED: 'fixed',
    TIERED: 'tiered',
    DYNAMIC: 'dynamic',
    PROMOTIONAL: 'promotional',
  },
  CURRENCY: { ...CURRENCY },
} as const;
