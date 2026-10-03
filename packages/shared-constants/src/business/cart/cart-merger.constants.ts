/**
 * Cart Merger Constants
 * @module shared-constants/business/cart
 */
export const MERGE_STRATEGY = {
  SUM_QUANTITY: 'sum_quantity',
  MAX_QUANTITY: 'max_quantity',
  KEEP_LATEST: 'keep_latest',
  KEEP_EXISTING: 'keep_existing',
  REPLACE: 'replace',
} as const;

export const CART_MERGER = {
  STRATEGY: MERGE_STRATEGY,
  DEFAULT_STRATEGY: MERGE_STRATEGY.SUM_QUANTITY,
} as const;

export type MergeStrategyType = (typeof MERGE_STRATEGY)[keyof typeof MERGE_STRATEGY];
