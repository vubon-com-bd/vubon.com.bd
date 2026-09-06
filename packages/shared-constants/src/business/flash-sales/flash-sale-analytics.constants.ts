/**
 * Flash Sale Analytics Constants (EXTENDS common/types)
 * @module shared-constants/business/flash-sales/flash-sale-analytics.constants
 */

import { TYPES } from '../../common/types.constants';

export const FLASH_SALE_ANALYTICS = {
  // Base types from common
  ...TYPES,

  // Analytics specific
  ANALYTICS_CACHE_TTL: 3600,
  MAX_HISTORY_ENTRIES: 1000,
  RETENTION_DAYS: 90,

  // Analytics metric
  FLASH_SALE_ANALYTICS_METRIC: {
    VIEWS: 'views',
    CLICKS: 'clicks',
    PARTICIPANTS: 'participants',
    PURCHASES: 'purchases',
    REVENUE: 'revenue',
    CONVERSION_RATE: 'conversion_rate',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    CART_ABANDONMENT: 'cart_abandonment',
    SOLD_OUT_TIME: 'sold_out_time',
    DISCOUNT_USAGE: 'discount_usage',
  } as const,

  // Analytics period
  FLASH_SALE_ANALYTICS_PERIOD: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    CUSTOM: 'custom',
  } as const,

  // Analytics comparison
  FLASH_SALE_ANALYTICS_COMPARISON: {
    PREVIOUS: 'previous',
    SAME_PERIOD: 'same_period',
    YEAR_OVER_YEAR: 'year_over_year',
    CUSTOM: 'custom',
  } as const,
} as const;

export type FlashSaleAnalyticsMetric =
  (typeof FLASH_SALE_ANALYTICS.FLASH_SALE_ANALYTICS_METRIC)[keyof typeof FLASH_SALE_ANALYTICS.FLASH_SALE_ANALYTICS_METRIC];
export type FlashSaleAnalyticsPeriod =
  (typeof FLASH_SALE_ANALYTICS.FLASH_SALE_ANALYTICS_PERIOD)[keyof typeof FLASH_SALE_ANALYTICS.FLASH_SALE_ANALYTICS_PERIOD];
export type FlashSaleAnalyticsComparison =
  (typeof FLASH_SALE_ANALYTICS.FLASH_SALE_ANALYTICS_COMPARISON)[keyof typeof FLASH_SALE_ANALYTICS.FLASH_SALE_ANALYTICS_COMPARISON];
