import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { DISCOUNT } from '../../common/discount.constants';

export const DEAL_DISCOUNT_TYPE = {
  ...COMMON_TYPES,
  ...DISCOUNT,
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount',
  BUY_X_GET_Y: 'buy_x_get_y',
  TIERED: 'tiered',
  VOLUME: 'volume',
  BUNDLE: 'bundle',
  FLASH: 'flash',
  EARLY_BIRD: 'early_bird',
  LAST_MINUTE: 'last_minute',
  VIP: 'vip',
} as const;
