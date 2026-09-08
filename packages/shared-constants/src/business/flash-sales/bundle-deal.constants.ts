import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PRODUCT_STATUS } from '../product/product-status.constants';
import { DEAL_STATUS } from './deal-status.constants';

export const BUNDLE_DEAL = {
  STATUS: {
    ...COMMON_STATUS,
    ...DEAL_STATUS,
    ACTIVE: 'active',
    SOLD_OUT: 'sold_out',
  },
  TYPES: {
    ...COMMON_TYPES,
    FIXED: 'fixed',
    CUSTOMIZABLE: 'customizable',
    MIXED: 'mixed',
  },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  DEAL_STATUS: { ...DEAL_STATUS },
  MAX_ITEMS_PER_BUNDLE: 20,
  MIN_ITEMS_PER_BUNDLE: 2,
  MAX_BUNDLES_PER_DEAL: 50,
  DISCOUNT_PERCENTAGE_MIN: 10,
  DISCOUNT_PERCENTAGE_MAX: 70,
} as const;
