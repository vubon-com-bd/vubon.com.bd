/**
 * Bundle Deal Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/bundle-deal.constants
 */

import { STATUS } from '../../common/status.constants';

export const BUNDLE_DEAL = {
  // Base status from common
  STATUS: STATUS,

  // Bundle deal specific
  MAX_BUNDLE_ITEMS: 10,
  MIN_BUNDLE_ITEMS: 2,
  BUNDLE_DEAL_CACHE_TTL: 3600,

  // Bundle deal status
  BUNDLE_DEAL_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ENDED: 'ended',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
  } as const,

  // Bundle deal type
  BUNDLE_DEAL_TYPE: {
    FIXED: 'fixed',
    MIXED: 'mixed',
    CUSTOMIZABLE: 'customizable',
    PREMIUM: 'premium',
    ECONOMY: 'economy',
  } as const,

  // Bundle deal discount
  BUNDLE_DEAL_DISCOUNT: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    TIERED: 'tiered',
    VOLUME: 'volume',
  } as const,

  // Bundle deal priority
  BUNDLE_DEAL_PRIORITY: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
  } as const,
} as const;

export type BundleDealStatus =
  (typeof BUNDLE_DEAL.BUNDLE_DEAL_STATUS)[keyof typeof BUNDLE_DEAL.BUNDLE_DEAL_STATUS];
export type BundleDealType =
  (typeof BUNDLE_DEAL.BUNDLE_DEAL_TYPE)[keyof typeof BUNDLE_DEAL.BUNDLE_DEAL_TYPE];
export type BundleDealDiscount =
  (typeof BUNDLE_DEAL.BUNDLE_DEAL_DISCOUNT)[keyof typeof BUNDLE_DEAL.BUNDLE_DEAL_DISCOUNT];
export type BundleDealPriority =
  (typeof BUNDLE_DEAL.BUNDLE_DEAL_PRIORITY)[keyof typeof BUNDLE_DEAL.BUNDLE_DEAL_PRIORITY];
