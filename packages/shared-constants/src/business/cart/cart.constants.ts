import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { PRODUCT_STATUS } from '../product/product-status.constants';

export const CART = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    CHECKED_OUT: 'checked_out',
    ABANDONED: 'abandoned',
    RECOVERED: 'recovered',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'cart:view',
    CREATE: 'cart:create',
    UPDATE: 'cart:update',
    DELETE: 'cart:delete',
    MANAGE: 'cart:manage',
  },
  USER_STATUS: { ...USER_STATUS },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  MAX_ITEMS: 100,
  MIN_ORDER_AMOUNT: 0,
  MAX_ORDER_AMOUNT: 999999,
} as const;
