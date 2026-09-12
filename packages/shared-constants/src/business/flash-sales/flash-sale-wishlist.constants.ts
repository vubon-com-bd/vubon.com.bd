import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { PRODUCT_STATUS } from '../product/product-status.constants';
import { FLASH_SALE_STATUS } from './flash-sale-status.constants';

export const FLASH_SALE_WISHLIST = {
  STATUS: {
    ...COMMON_STATUS,
    SAVED: 'saved',
    NOTIFIED: 'notified',
    PURCHASED: 'purchased',
    REMOVED: 'removed',
  },
  USER_STATUS: { ...USER_STATUS },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  FLASH_SALE_STATUS: { ...FLASH_SALE_STATUS },
  WISHLIST_TYPES: {
    INTERESTED: 'interested',
    FOLLOWING: 'following',
    NOTIFY_ME: 'notify_me',
  },
  MAX_WISHLIST_ITEMS: 50,
  AUTO_NOTIFY_HOURS: 2,
} as const;
