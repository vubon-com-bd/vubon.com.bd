/**
 * Product Deal Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/product-deal.constants
 */

import { STATUS } from '../../common/status.constants';

export const PRODUCT_DEAL = {
  // Base status from common
  STATUS: STATUS,

  // Product deal specific
  MAX_PRODUCTS_PER_DEAL: 50,
  MIN_PRODUCTS_PER_DEAL: 1,
  PRODUCT_DEAL_CACHE_TTL: 3600,

  // Product deal status
  PRODUCT_DEAL_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ENDED: 'ended',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
  } as const,

  // Product deal type
  PRODUCT_DEAL_TYPE: {
    SINGLE: 'single',
    MULTIPLE: 'multiple',
    CATEGORY: 'category',
    BRAND: 'brand',
    CUSTOM: 'custom',
  } as const,

  // Product deal priority
  PRODUCT_DEAL_PRIORITY: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
  } as const,
} as const;

export type ProductDealStatus =
  (typeof PRODUCT_DEAL.PRODUCT_DEAL_STATUS)[keyof typeof PRODUCT_DEAL.PRODUCT_DEAL_STATUS];
export type ProductDealType =
  (typeof PRODUCT_DEAL.PRODUCT_DEAL_TYPE)[keyof typeof PRODUCT_DEAL.PRODUCT_DEAL_TYPE];
export type ProductDealPriority =
  (typeof PRODUCT_DEAL.PRODUCT_DEAL_PRIORITY)[keyof typeof PRODUCT_DEAL.PRODUCT_DEAL_PRIORITY];
