import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PRODUCT_STATUS } from '../product/product-status.constants';
import { VARIANT } from '../product/variant.constants';

export const CART_ITEM = {
  STATUS: {
    ...COMMON_STATUS,
    SELECTED: 'selected',
    UNSELECTED: 'unselected',
    OUT_OF_STOCK: 'out_of_stock',
    PRICE_CHANGED: 'price_changed',
    REMOVED: 'removed',
  },
  TYPES: {
    ...COMMON_TYPES,
    REGULAR: 'regular',
    BUNDLE: 'bundle',
    GIFT: 'gift',
    SAMPLE: 'sample',
    PREORDER: 'preorder',
  },
  PRODUCT_STATUS: { ...PRODUCT_STATUS },
  VARIANT: { ...VARIANT },
  MAX_QUANTITY: 99,
  MIN_QUANTITY: 1,
} as const;
