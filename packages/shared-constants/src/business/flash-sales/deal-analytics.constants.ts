/**
 * Deal Analytics Constants (EXTENDS common/types + common/currency)
 * @module shared-constants/business/flash-sales/deal-analytics.constants
 */

import { TYPES } from '../../common/types.constants';
import { CURRENCY } from '../../common/currency.constants';
import { TAX } from '../../common/tax.constants';
import { DISCOUNT } from '../../common/discount.constants';

export const DEAL_ANALYTICS = {
  // Base types from common
  ...TYPES,

  // Currency from common
  CURRENCY: CURRENCY,

  // Tax from common
  TAX: TAX,

  // Discount from common
  DISCOUNT: DISCOUNT,

  // Analytics specific
  ANALYTICS_CACHE_TTL: 3600,
  MAX_HISTORY_ENTRIES: 1000,
  RETENTION_DAYS: 365,

  // Analytics metric
  DEAL_ANALYTICS_METRIC: {
    VIEWS: 'views',
    CLICKS: 'clicks',
    CONVERSIONS: 'conversions',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    ROI: 'roi',
    PARTICIPANTS: 'participants',
    SALES_VELOCITY: 'sales_velocity',
    STOCK_LEFT: 'stock_left',
    SOLD_OUT_TIME: 'sold_out_time',
    CART_ABANDONMENT: 'cart_abandonment',
    DISCOUNT_USAGE: 'discount_usage',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',
    REPEAT_PURCHASE: 'repeat_purchase',
  } as const,

  // Analytics period
  DEAL_ANALYTICS_PERIOD: {
    REAL_TIME: 'real_time',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    DURING_DEAL: 'during_deal',
    POST_DEAL: 'post_deal',
    PRE_DEAL: 'pre_deal',
  } as const,

  // Analytics comparison
  DEAL_ANALYTICS_COMPARISON: {
    PREVIOUS_DEAL: 'previous_deal',
    SAME_PERIOD: 'same_period',
    YEAR_OVER_YEAR: 'year_over_year',
    CATEGORY_AVERAGE: 'category_average',
    STORE_AVERAGE: 'store_average',
    INDUSTRY_AVERAGE: 'industry_average',
    TARGET_VS_ACTUAL: 'target_vs_actual',
  } as const,
} as const;

export type DealAnalyticsMetric =
  (typeof DEAL_ANALYTICS.DEAL_ANALYTICS_METRIC)[keyof typeof DEAL_ANALYTICS.DEAL_ANALYTICS_METRIC];
export type DealAnalyticsPeriod =
  (typeof DEAL_ANALYTICS.DEAL_ANALYTICS_PERIOD)[keyof typeof DEAL_ANALYTICS.DEAL_ANALYTICS_PERIOD];
export type DealAnalyticsComparison =
  (typeof DEAL_ANALYTICS.DEAL_ANALYTICS_COMPARISON)[keyof typeof DEAL_ANALYTICS.DEAL_ANALYTICS_COMPARISON];
