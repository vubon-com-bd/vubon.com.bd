import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { PRODUCT_STATUS } from '../product/product-status.constants';
import { VARIANT } from '../product/variant.constants';
import { DEAL_STATUS } from './deal-status.constants';
import { DEAL_DISCOUNT_TYPE } from './deal-discount-type.constants';

export const PRODUCT_DEAL = {
  STATUS: {
    ...COMMON_STATUS,
    ...DEAL_STATUS,
    ACTIVE: 'active',
    SOLD_OUT: 'sold_out',
    EXPIRED: 'expired',
  },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  VARIANT: { ...VARIANT },
  DEAL_STATUS: { ...DEAL_STATUS },
  DEAL_DISCOUNT_TYPE: { ...DEAL_DISCOUNT_TYPE },
  MAX_PRODUCTS_PER_DEAL: 10,
  MIN_PRODUCTS_PER_DEAL: 1,
  INVENTORY_LIMIT: 1000,
  PURCHASE_LIMIT_PER_USER: 5,
} as const;
