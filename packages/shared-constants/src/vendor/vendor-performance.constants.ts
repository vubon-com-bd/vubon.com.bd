/**
 * Vendor Performance Constants
 * Configuration for vendor performance metrics
 */

export const VENDOR_PERFORMANCE = {
  // Performance Metrics
  METRICS: {
    ORDER_FULFILLMENT: 'order_fulfillment',
    ON_TIME_DELIVERY: 'on_time_delivery',
    PRODUCT_QUALITY: 'product_quality',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',
    RESPONSE_TIME: 'response_time',
    RESOLUTION_TIME: 'resolution_time',
    RETURN_RATE: 'return_rate',
    CANCELLATION_RATE: 'cancellation_rate',
    REVENUE: 'revenue',
    GROWTH: 'growth',
  } as const,

  // Performance Statuses
  STATUS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Performance Periods
  PERIODS: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Performance Scores
  SCORES: {
    EXCELLENT: 90,
    GOOD: 75,
    AVERAGE: 60,
    POOR: 40,
    CRITICAL: 20,
  } as const,

  // Performance Colors (for UI)
  COLORS: {
    EXCELLENT: '#green-500',
    GOOD: '#blue-500',
    AVERAGE: '#yellow-500',
    POOR: '#orange-500',
    CRITICAL: '#red-500',
  } as const,

  // Performance Icons (for UI)
  ICONS: {
    EXCELLENT: '⭐',
    GOOD: '👍',
    AVERAGE: '📊',
    POOR: '👎',
    CRITICAL: '🚨',
  } as const,

  // Performance Weightage
  WEIGHTAGE: {
    ORDER_FULFILLMENT: 25,
    ON_TIME_DELIVERY: 20,
    PRODUCT_QUALITY: 20,
    CUSTOMER_SATISFACTION: 15,
    RESPONSE_TIME: 10,
    RESOLUTION_TIME: 10,
  } as const,
} as const;

// Performance Metrics
export type VendorPerformanceMetric =
  (typeof VENDOR_PERFORMANCE.METRICS)[keyof typeof VENDOR_PERFORMANCE.METRICS];

// Performance Statuses
export type VendorPerformanceStatus =
  (typeof VENDOR_PERFORMANCE.STATUS)[keyof typeof VENDOR_PERFORMANCE.STATUS];

// Performance Periods
export type VendorPerformancePeriod =
  (typeof VENDOR_PERFORMANCE.PERIODS)[keyof typeof VENDOR_PERFORMANCE.PERIODS];

// Performance Scores
export type VendorPerformanceScore =
  (typeof VENDOR_PERFORMANCE.SCORES)[keyof typeof VENDOR_PERFORMANCE.SCORES];

// Performance Colors
export type VendorPerformanceColor =
  (typeof VENDOR_PERFORMANCE.COLORS)[keyof typeof VENDOR_PERFORMANCE.COLORS];

// Performance Icons
export type VendorPerformanceIcon =
  (typeof VENDOR_PERFORMANCE.ICONS)[keyof typeof VENDOR_PERFORMANCE.ICONS];

// Utility Functions
export function vendorPerformanceGetMetricLabel(metric: VendorPerformanceMetric): string {
  const labels: Record<VendorPerformanceMetric, string> = {
    [VENDOR_PERFORMANCE.METRICS.ORDER_FULFILLMENT]: 'Order Fulfillment',
    [VENDOR_PERFORMANCE.METRICS.ON_TIME_DELIVERY]: 'On-Time Delivery',
    [VENDOR_PERFORMANCE.METRICS.PRODUCT_QUALITY]: 'Product Quality',
    [VENDOR_PERFORMANCE.METRICS.CUSTOMER_SATISFACTION]: 'Customer Satisfaction',
    [VENDOR_PERFORMANCE.METRICS.RESPONSE_TIME]: 'Response Time',
    [VENDOR_PERFORMANCE.METRICS.RESOLUTION_TIME]: 'Resolution Time',
    [VENDOR_PERFORMANCE.METRICS.RETURN_RATE]: 'Return Rate',
    [VENDOR_PERFORMANCE.METRICS.CANCELLATION_RATE]: 'Cancellation Rate',
    [VENDOR_PERFORMANCE.METRICS.REVENUE]: 'Revenue',
    [VENDOR_PERFORMANCE.METRICS.GROWTH]: 'Growth',
  };
  return labels[metric] || 'Unknown';
}

export function vendorPerformanceGetStatusLabel(status: VendorPerformanceStatus): string {
  const labels: Record<VendorPerformanceStatus, string> = {
    [VENDOR_PERFORMANCE.STATUS.EXCELLENT]: 'Excellent',
    [VENDOR_PERFORMANCE.STATUS.GOOD]: 'Good',
    [VENDOR_PERFORMANCE.STATUS.AVERAGE]: 'Average',
    [VENDOR_PERFORMANCE.STATUS.POOR]: 'Poor',
    [VENDOR_PERFORMANCE.STATUS.CRITICAL]: 'Critical',
  };
  return labels[status] || 'Unknown';
}

export function vendorPerformanceGetColor(status: VendorPerformanceStatus): VendorPerformanceColor {
  const colors: Record<VendorPerformanceStatus, VendorPerformanceColor> = {
    [VENDOR_PERFORMANCE.STATUS.EXCELLENT]: VENDOR_PERFORMANCE.COLORS.EXCELLENT,
    [VENDOR_PERFORMANCE.STATUS.GOOD]: VENDOR_PERFORMANCE.COLORS.GOOD,
    [VENDOR_PERFORMANCE.STATUS.AVERAGE]: VENDOR_PERFORMANCE.COLORS.AVERAGE,
    [VENDOR_PERFORMANCE.STATUS.POOR]: VENDOR_PERFORMANCE.COLORS.POOR,
    [VENDOR_PERFORMANCE.STATUS.CRITICAL]: VENDOR_PERFORMANCE.COLORS.CRITICAL,
  };
  return colors[status] || '#gray-400';
}

export function vendorPerformanceGetStatusFromScore(score: number): VendorPerformanceStatus {
  if (score >= VENDOR_PERFORMANCE.SCORES.EXCELLENT) return VENDOR_PERFORMANCE.STATUS.EXCELLENT;
  if (score >= VENDOR_PERFORMANCE.SCORES.GOOD) return VENDOR_PERFORMANCE.STATUS.GOOD;
  if (score >= VENDOR_PERFORMANCE.SCORES.AVERAGE) return VENDOR_PERFORMANCE.STATUS.AVERAGE;
  if (score >= VENDOR_PERFORMANCE.SCORES.POOR) return VENDOR_PERFORMANCE.STATUS.POOR;
  return VENDOR_PERFORMANCE.STATUS.CRITICAL;
}

export function vendorPerformanceGetPeriodLabel(period: VendorPerformancePeriod): string {
  const labels: Record<VendorPerformancePeriod, string> = {
    [VENDOR_PERFORMANCE.PERIODS.DAILY]: 'Daily',
    [VENDOR_PERFORMANCE.PERIODS.WEEKLY]: 'Weekly',
    [VENDOR_PERFORMANCE.PERIODS.MONTHLY]: 'Monthly',
    [VENDOR_PERFORMANCE.PERIODS.QUARTERLY]: 'Quarterly',
    [VENDOR_PERFORMANCE.PERIODS.YEARLY]: 'Yearly',
  };
  return labels[period] || 'Unknown';
}

export function vendorPerformanceGetMetricWeight(metric: VendorPerformanceMetric): number {
  const weights: Record<VendorPerformanceMetric, number> = {
    [VENDOR_PERFORMANCE.METRICS.ORDER_FULFILLMENT]: VENDOR_PERFORMANCE.WEIGHTAGE.ORDER_FULFILLMENT,
    [VENDOR_PERFORMANCE.METRICS.ON_TIME_DELIVERY]: VENDOR_PERFORMANCE.WEIGHTAGE.ON_TIME_DELIVERY,
    [VENDOR_PERFORMANCE.METRICS.PRODUCT_QUALITY]: VENDOR_PERFORMANCE.WEIGHTAGE.PRODUCT_QUALITY,
    [VENDOR_PERFORMANCE.METRICS.CUSTOMER_SATISFACTION]:
      VENDOR_PERFORMANCE.WEIGHTAGE.CUSTOMER_SATISFACTION,
    [VENDOR_PERFORMANCE.METRICS.RESPONSE_TIME]: VENDOR_PERFORMANCE.WEIGHTAGE.RESPONSE_TIME,
    [VENDOR_PERFORMANCE.METRICS.RESOLUTION_TIME]: VENDOR_PERFORMANCE.WEIGHTAGE.RESOLUTION_TIME,
    [VENDOR_PERFORMANCE.METRICS.RETURN_RATE]: 0,
    [VENDOR_PERFORMANCE.METRICS.CANCELLATION_RATE]: 0,
    [VENDOR_PERFORMANCE.METRICS.REVENUE]: 0,
    [VENDOR_PERFORMANCE.METRICS.GROWTH]: 0,
  };
  return weights[metric] || 0;
}

export function vendorPerformanceIsGood(status: VendorPerformanceStatus): boolean {
  return (
    status === VENDOR_PERFORMANCE.STATUS.EXCELLENT || status === VENDOR_PERFORMANCE.STATUS.GOOD
  );
}

export function vendorPerformanceIsPoor(status: VendorPerformanceStatus): boolean {
  return status === VENDOR_PERFORMANCE.STATUS.POOR || status === VENDOR_PERFORMANCE.STATUS.CRITICAL;
}
