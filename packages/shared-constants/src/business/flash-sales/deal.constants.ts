import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';
import { PRODUCT_STATUS } from '../product/product-status.constants';

export const DEAL = {
  STATUS: {
    ...STATUS,
    DRAFT: 'draft',
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
  },
  TYPES: {
    ...TYPES,
    PRODUCT: 'product',
    BUNDLE: 'bundle',
    CATEGORY: 'category',
    BRAND: 'brand',
    CUSTOM: 'custom',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'deal:view',
    CREATE: 'deal:create',
    UPDATE: 'deal:update',
    DELETE: 'deal:delete',
    MANAGE: 'deal:manage',
  },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  MAX_DEALS_PER_SALE: 50,
  MIN_DISCOUNT: 5,
  MAX_DISCOUNT: 95,
} as const;
