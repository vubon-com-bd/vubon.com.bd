import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { DISCOUNT } from '../../common/discount.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';

export const COUPON = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    USED: 'used',
    CANCELLED: 'cancelled',
  },
  TYPES: {
    ...COMMON_TYPES,
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    FREE_SHIPPING: 'free_shipping',
    BUY_X_GET_Y: 'buy_x_get_y',
  },
  DISCOUNT: { ...DISCOUNT },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    CREATE: 'coupon:create',
    UPDATE: 'coupon:update',
    DELETE: 'coupon:delete',
    APPLY: 'coupon:apply',
  },
  MAX_USAGE_PER_USER: 1,
  MAX_USAGE_TOTAL: 1000,
  MIN_ORDER_AMOUNT: 100,
  COUPON_CODE_LENGTH: 8,
} as const;
