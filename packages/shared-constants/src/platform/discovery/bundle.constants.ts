import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PRODUCT_STATUS } from '../../business/product/product-status.constants';

export const BUNDLE = {
  TYPES: {
    ...COMMON_TYPES,
    FIXED: 'fixed',
    CUSTOMIZABLE: 'customizable',
    MIXED: 'mixed',
    SEASONAL: 'seasonal',
    PROMOTIONAL: 'promotional',
    CLEARANCE: 'clearance',
  },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  BUNDLE_DISCOUNT_RATES: {
    MIN: 0.05,
    MAX: 0.5,
    DEFAULT: 0.15,
  },
  MAX_ITEMS_PER_BUNDLE: 20,
  MIN_ITEMS_PER_BUNDLE: 2,
  BUNDLE_VALIDITY_DAYS: 30,
  MAX_BUNDLES_PER_PRODUCT: 5,
  BUNDLE_UPDATE_INTERVAL_DAYS: 7,
} as const;
