import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { COUPON } from '../cart/coupon.constants';
import { DISCOUNT } from '../../common/discount.constants';
import { FLASH_SALE_STATUS } from './flash-sale-status.constants';

export const FLASH_SALE_COUPON = {
  STATUS: {
    ...COMMON_STATUS,
    ...COUPON.STATUS,
    FLASH_SALE_SPECIFIC: 'flash_sale_specific',
    TIME_LIMITED: 'time_limited',
    QUANTITY_LIMITED: 'quantity_limited',
  },
  COUPON: { ...COUPON },
  DISCOUNT: { ...DISCOUNT },
  FLASH_SALE_STATUS: { ...FLASH_SALE_STATUS },
  COUPON_TYPES: {
    ...COUPON.TYPES,
    FLASH_SPECIFIC: 'flash_specific',
    CROSS_SALE: 'cross_sale',
    UPSELL: 'upsell',
  },
  MAX_COUPONS_PER_SALE: 100,
  COUPON_VALIDITY_HOURS: 24,
} as const;
