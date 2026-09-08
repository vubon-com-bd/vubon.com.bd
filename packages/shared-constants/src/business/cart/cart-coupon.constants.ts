import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { DISCOUNT } from '../../common/discount.constants';
import { USER_ROLES } from '../../user/user-role.constants';
import { COUPON } from './coupon.constants';

export const CART_COUPON = {
  STATUS: {
    ...COMMON_STATUS,
    APPLIED: 'applied',
    REMOVED: 'removed',
    EXPIRED: 'expired',
    INVALID: 'invalid',
    USED: 'used',
  },
  DISCOUNT: { ...DISCOUNT },
  USER_ROLES: { ...USER_ROLES },
  COUPON: { ...COUPON },
  MAX_COUPONS_PER_CART: 10,
  COUPON_VALIDITY_DAYS: 30,
} as const;
