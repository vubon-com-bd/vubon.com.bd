import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const PROMOTION_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    BUY_X_GET_Y: 'buy_x_get_y',
    FREE_SHIPPING: 'free_shipping',
    GIFT_WITH_PURCHASE: 'gift_with_purchase',
    BUNDLE: 'bundle',
    COUPON: 'coupon',
    VOUCHER: 'voucher',
    FLASH_SALE: 'flash_sale',
    EARLY_BIRD: 'early_bird',
    LAST_MINUTE: 'last_minute',
    VIP: 'vip',
    CUSTOM: 'custom',
  },
} as const;
