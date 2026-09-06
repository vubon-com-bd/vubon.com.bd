/**
 * Product Price History Constants (EXTENDS common/types)
 * @module shared-constants/business/product/price-history.constants
 */

import { TYPES } from '../../common/types.constants';

export const PRODUCT_PRICE_HISTORY = {
  // Base types from common
  ...TYPES,

  // Price history specific
  MAX_HISTORY_ENTRIES: 1000,
  PRICE_HISTORY_RETENTION_DAYS: 365,
  PRICE_HISTORY_CACHE_TTL: 3600,

  // Change type
  PRODUCT_PRICE_CHANGE_TYPE: {
    INCREASE: 'increase',
    DECREASE: 'decrease',
    PROMOTION: 'promotion',
    SALE: 'sale',
    DISCOUNT: 'discount',
    FLASH_SALE: 'flash_sale',
    SEASONAL: 'seasonal',
    CLEARANCE: 'clearance',
    PERMANENT: 'permanent',
    TEMPORARY: 'temporary',
  } as const,

  // Change reason
  PRODUCT_PRICE_CHANGE_REASON: {
    COST_UPDATE: 'cost_update',
    MARKET_CHANGE: 'market_change',
    COMPETITOR: 'competitor',
    DEMAND_CHANGE: 'demand_change',
    SUPPLY_CHANGE: 'supply_change',
    SEASONAL: 'seasonal',
    PROMOTIONAL: 'promotional',
    DISCOUNT: 'discount',
    CLEARANCE: 'clearance',
    STRATEGIC: 'strategic',
    ERROR_CORRECTION: 'error_correction',
    CUSTOM: 'custom',
  } as const,

  // Price change status
  PRODUCT_PRICE_CHANGE_STATUS: {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    APPLIED: 'applied',
    REVERTED: 'reverted',
    CANCELLED: 'cancelled',
    SCHEDULED: 'scheduled',
    EXPIRED: 'expired',
  } as const,

  // Price tracking
  PRODUCT_PRICE_TRACKING: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    SCHEDULED: 'scheduled',
    REAL_TIME: 'real_time',
  } as const,

  // Price analysis
  PRODUCT_PRICE_ANALYSIS: {
    AVERAGE: 'average',
    MEDIAN: 'median',
    MIN: 'min',
    MAX: 'max',
    TREND: 'trend',
    VOLATILITY: 'volatility',
    COMPARISON: 'comparison',
  } as const,
} as const;

export type ProductPriceChangeType =
  (typeof PRODUCT_PRICE_HISTORY.PRODUCT_PRICE_CHANGE_TYPE)[keyof typeof PRODUCT_PRICE_HISTORY.PRODUCT_PRICE_CHANGE_TYPE];
export type ProductPriceChangeReason =
  (typeof PRODUCT_PRICE_HISTORY.PRODUCT_PRICE_CHANGE_REASON)[keyof typeof PRODUCT_PRICE_HISTORY.PRODUCT_PRICE_CHANGE_REASON];
export type ProductPriceChangeStatus =
  (typeof PRODUCT_PRICE_HISTORY.PRODUCT_PRICE_CHANGE_STATUS)[keyof typeof PRODUCT_PRICE_HISTORY.PRODUCT_PRICE_CHANGE_STATUS];
export type ProductPriceTracking =
  (typeof PRODUCT_PRICE_HISTORY.PRODUCT_PRICE_TRACKING)[keyof typeof PRODUCT_PRICE_HISTORY.PRODUCT_PRICE_TRACKING];
export type ProductPriceAnalysis =
  (typeof PRODUCT_PRICE_HISTORY.PRODUCT_PRICE_ANALYSIS)[keyof typeof PRODUCT_PRICE_HISTORY.PRODUCT_PRICE_ANALYSIS];
