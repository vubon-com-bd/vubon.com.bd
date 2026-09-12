import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';
import { PRODUCT_STATUS } from '../product/product-status.constants';
import { CART_STATUS } from '../cart/cart-status.constants';

export const FLASH_SALE = {
  STATUS: {
    ...STATUS,
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ENDED: 'ended',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
  },
  TYPES: {
    ...TYPES,
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    CUSTOM: 'custom',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'flash_sale:view',
    CREATE: 'flash_sale:create',
    UPDATE: 'flash_sale:update',
    DELETE: 'flash_sale:delete',
    MANAGE: 'flash_sale:manage',
    PARTICIPATE: 'flash_sale:participate',
  },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  CART_STATUS: { ...CART_STATUS },
  MAX_PRODUCTS_PER_SALE: 100,
  MIN_PRODUCTS_PER_SALE: 1,
  DURATION_MINUTES: 60,
  MIN_DISCOUNT_PERCENTAGE: 5,
  MAX_DISCOUNT_PERCENTAGE: 90,
} as const;
