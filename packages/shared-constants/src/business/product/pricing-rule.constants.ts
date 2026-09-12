import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { DISCOUNT } from '../../common/discount.constants';
import { TAX } from '../../common/tax.constants';

export const PRICING_RULE = {
  TYPES: {
    ...COMMON_TYPES,
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    BUY_X_GET_Y: 'buy_x_get_y',
    FREE_SHIPPING: 'free_shipping',
  },
  DISCOUNT: { ...DISCOUNT },
  TAX: { ...TAX },
  PRIORITY_LEVELS: {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  },
} as const;
