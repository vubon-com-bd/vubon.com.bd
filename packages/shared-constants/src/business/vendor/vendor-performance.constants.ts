/**
 * Vendor Performance Constants
 * ভেন্ডর পারফরম্যান্স সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const VENDOR_PERFORMANCE = {
  // Performance types (TYPES ব্যবহার করে)
  TYPES: {
    SALES: TYPES.BUNDLE || 'sales',
    ORDERS: 'orders',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    CONVERSION: 'conversion',
    CUSTOMER: 'customer',
    PRODUCTS: 'products',
    RATINGS: 'ratings',
    COMPLETION: 'completion',
  },

  // Performance metrics
  METRICS: {
    TOTAL_SALES: 'total_sales',
    TOTAL_ORDERS: 'total_orders',
    TOTAL_REVENUE: 'total_revenue',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    CONVERSION_RATE: 'conversion_rate',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',
    PRODUCT_RATING: 'product_rating',
    ORDER_COMPLETION: 'order_completion',
    SHIPPING_TIME: 'shipping_time',
    RESPONSE_TIME: 'response_time',
  },

  // Performance periods (TYPES ব্যবহার করে)
  PERIODS: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CUSTOM: TYPES.DEFAULT || 'custom',
  },

  // Rating values
  RATINGS: {
    MIN: 1,
    MAX: 5,
    DEFAULT: TYPES.DEFAULT || 0,
    EXCELLENT: 4.5,
    GOOD: 4.0,
    AVERAGE: 3.0,
    POOR: 2.0,
  },

  // Performance status (TYPES ব্যবহার করে)
  STATUS: {
    ACTIVE: TYPES.ACTIVE,
    INACTIVE: TYPES.INACTIVE,
    PENDING: TYPES.PENDING,
    COMPLETED: 'completed',
    FAILED: 'failed',
  },

  // Performance levels
  LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: TYPES.GOOD || 'good',
    AVERAGE: TYPES.AVERAGE || 'average',
    POOR: TYPES.POOR || 'poor',
    CRITICAL: 'critical',
  },
} as const;

export type VendorPerformanceType =
  (typeof VENDOR_PERFORMANCE.TYPES)[keyof typeof VENDOR_PERFORMANCE.TYPES];
export type VendorPerformanceMetric =
  (typeof VENDOR_PERFORMANCE.METRICS)[keyof typeof VENDOR_PERFORMANCE.METRICS];
export type VendorPerformancePeriod =
  (typeof VENDOR_PERFORMANCE.PERIODS)[keyof typeof VENDOR_PERFORMANCE.PERIODS];
export type VendorPerformanceStatus =
  (typeof VENDOR_PERFORMANCE.STATUS)[keyof typeof VENDOR_PERFORMANCE.STATUS];
export type VendorPerformanceLevel =
  (typeof VENDOR_PERFORMANCE.LEVELS)[keyof typeof VENDOR_PERFORMANCE.LEVELS];
