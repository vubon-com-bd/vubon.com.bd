import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_STATUS } from '../../user/user-status.constants';

export const SAVED_FOR_LATER = {
  STATUS: {
    ...COMMON_STATUS,
    SAVED: 'saved',
    MOVED_TO_CART: 'moved_to_cart',
    PURCHASED: 'purchased',
    EXPIRED: 'expired',
  },
  TYPES: {
    ...COMMON_TYPES,
    PRODUCT: 'product',
    BUNDLE: 'bundle',
    COMBO: 'combo',
  },
  USER_STATUS: { ...USER_STATUS },
  MAX_SAVED_ITEMS: 200,
  SAVE_DURATION_DAYS: 30,
} as const;
