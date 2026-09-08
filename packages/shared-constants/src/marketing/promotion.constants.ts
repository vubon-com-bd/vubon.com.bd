import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { PROMOTION_TYPE } from './promotion-type.constants';
import { PROMOTION_STATUS } from './promotion-status.constants';
import { PROMOTION_DISCOUNT_TYPE } from './promotion-discount-type.constants';
import { PRODUCT_STATUS } from '../business/product/product-status.constants';

export const PROMOTION = {
  STATUS: {
    ...STATUS,
    ...PROMOTION_STATUS,
    DRAFT: 'draft',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'promotion:view',
    CREATE: 'promotion:create',
    UPDATE: 'promotion:update',
    DELETE: 'promotion:delete',
    APPLY: 'promotion:apply',
  },
  PROMOTION_TYPE: { ...PROMOTION_TYPE },
  PROMOTION_STATUS: { ...PROMOTION_STATUS },
  PROMOTION_DISCOUNT_TYPE: { ...PROMOTION_DISCOUNT_TYPE },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  MAX_DISCOUNT_PERCENTAGE: 90,
  MIN_DISCOUNT_PERCENTAGE: 5,
  MAX_USAGE_PER_USER: 10,
  MAX_USAGE_TOTAL: 10000,
} as const;
