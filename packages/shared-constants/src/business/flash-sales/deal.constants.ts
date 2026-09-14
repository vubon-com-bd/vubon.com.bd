import { DEAL_STATUS } from './deal-status.constants';
import { DEAL_DISCOUNT_TYPE } from './deal-discount-type.constants';

export const DEAL_TYPE = {
  PRODUCT: 'product',
  BUNDLE: 'bundle',
  CATEGORY: 'category',
  BRAND: 'brand',
  CART: 'cart',
  ORDER: 'order',
} as const;

export const DEAL_LIMIT = {
  MAX_DISCOUNT_PERCENT: 90,
  MIN_DISCOUNT_PERCENT: 1,
  MAX_DISCOUNT_AMOUNT: 1000000,
  MIN_ORDER_AMOUNT: 0,
  MAX_QUANTITY_PER_USER: 10,
  MAX_TOTAL_QUANTITY: 100000,
} as const;

export const DEAL = {
  TYPE: DEAL_TYPE,
  STATUS: DEAL_STATUS,
  DISCOUNT_TYPE: DEAL_DISCOUNT_TYPE,
  LIMIT: DEAL_LIMIT,
} as const;

export type DealType = typeof DEAL;
