/**
 * Cart Merger Constants (EXTENDS common/status)
 * @module shared-constants/business/cart/cart-merger.constants
 */

import { STATUS } from '../../common/status.constants';

export const CART_MERGER = {
  // Base status from common
  STATUS: STATUS,

  // Merger specific
  MERGER_CACHE_TTL: 3600,
  MAX_MERGE_ATTEMPTS: 3,
  MERGE_TIMEOUT_SECONDS: 30,

  // Merger type
  CART_MERGER_TYPE: {
    GUEST_TO_USER: 'guest_to_user',
    SESSION_TO_SESSION: 'session_to_session',
    DEVICE_TO_DEVICE: 'device_to_device',
    MANUAL: 'manual',
    AUTO: 'auto',
  } as const,

  // Merger status
  CART_MERGER_STATUS: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PARTIAL: 'partial',
    CANCELLED: 'cancelled',
  } as const,

  // Merger strategy
  CART_MERGER_STRATEGY: {
    KEEP_SOURCE: 'keep_source',
    KEEP_TARGET: 'keep_target',
    MERGE_ALL: 'merge_all',
    MERGE_UNIQUE: 'merge_unique',
    MERGE_WITH_PRIORITY: 'merge_with_priority',
    CUSTOM: 'custom',
  } as const,

  // Merger conflict resolution
  CART_MERGER_CONFLICT: {
    OVERWRITE: 'overwrite',
    SKIP: 'skip',
    KEEP_BOTH: 'keep_both',
    ASK_USER: 'ask_user',
    AUTO_RESOLVE: 'auto_resolve',
  } as const,

  // Merger validation
  CART_MERGER_VALIDATION: {
    CHECK_DUPLICATES: true,
    CHECK_STOCK: true,
    CHECK_PRICE: true,
    CHECK_DISCOUNTS: true,
    CHECK_COUPONS: true,
    CHECK_SHIPPING: true,
    CHECK_TAX: true,
  } as const,
} as const;

export type CartMergerType =
  (typeof CART_MERGER.CART_MERGER_TYPE)[keyof typeof CART_MERGER.CART_MERGER_TYPE];
export type CartMergerStatus =
  (typeof CART_MERGER.CART_MERGER_STATUS)[keyof typeof CART_MERGER.CART_MERGER_STATUS];
export type CartMergerStrategy =
  (typeof CART_MERGER.CART_MERGER_STRATEGY)[keyof typeof CART_MERGER.CART_MERGER_STRATEGY];
export type CartMergerConflict =
  (typeof CART_MERGER.CART_MERGER_CONFLICT)[keyof typeof CART_MERGER.CART_MERGER_CONFLICT];

export const CART_MERGER_STATUS_LABELS: Record<CartMergerStatus, string> = {
  [CART_MERGER.CART_MERGER_STATUS.PENDING]: 'Pending',
  [CART_MERGER.CART_MERGER_STATUS.IN_PROGRESS]: 'In Progress',
  [CART_MERGER.CART_MERGER_STATUS.COMPLETED]: 'Completed',
  [CART_MERGER.CART_MERGER_STATUS.FAILED]: 'Failed',
  [CART_MERGER.CART_MERGER_STATUS.PARTIAL]: 'Partial',
  [CART_MERGER.CART_MERGER_STATUS.CANCELLED]: 'Cancelled',
};

export const CART_MERGER_STATUS_COLORS: Record<CartMergerStatus, string> = {
  [CART_MERGER.CART_MERGER_STATUS.PENDING]: '#eab308',
  [CART_MERGER.CART_MERGER_STATUS.IN_PROGRESS]: '#60a5fa',
  [CART_MERGER.CART_MERGER_STATUS.COMPLETED]: '#22c55e',
  [CART_MERGER.CART_MERGER_STATUS.FAILED]: '#ef4444',
  [CART_MERGER.CART_MERGER_STATUS.PARTIAL]: '#f59e0b',
  [CART_MERGER.CART_MERGER_STATUS.CANCELLED]: '#9ca3af',
};
