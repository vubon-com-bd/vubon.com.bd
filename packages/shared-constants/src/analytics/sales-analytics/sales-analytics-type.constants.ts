/**
 * Sales Analytics Type Constants
 * Types of sales analytics data and analysis
 */

export const SALES_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Performance Analysis
    PERFORMANCE: 'performance',
    SALES_PERFORMANCE: 'sales_performance',
    REVENUE_PERFORMANCE: 'revenue_performance',
    PROFIT_PERFORMANCE: 'profit_performance',

    // Comparative Analysis
    COMPARATIVE: 'comparative',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
    PERIOD_OVER_PERIOD: 'period_over_period',

    // Growth Analysis
    GROWTH: 'growth',
    TREND: 'trend',
    SEASONAL: 'seasonal',
    CYCLICAL: 'cyclical',

    // Channel Analysis
    CHANNEL: 'channel',
    ONLINE: 'online',
    OFFLINE: 'offline',
    MULTI_CHANNEL: 'multi_channel',
    CROSS_CHANNEL: 'cross_channel',

    // Regional Analysis
    REGIONAL: 'regional',
    NATIONAL: 'national',
    INTERNATIONAL: 'international',
    LOCAL: 'local',

    // Product Analysis
    PRODUCT: 'product',
    CATEGORY: 'category',
    BRAND: 'brand',
    SKU: 'sku',

    // Customer Analysis
    CUSTOMER: 'customer',
    SEGMENT: 'segment',
    COHORT: 'cohort',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    DEMAND: 'demand',
    PROJECTION: 'projection',
  } as const,

  // Data Types
  DATA_TYPES: {
    TRANSACTIONAL: 'transactional',
    ORDER_DATA: 'order_data',
    LINE_ITEM: 'line_item',
    PAYMENT_DATA: 'payment_data',

    CUSTOMER_DATA: 'customer_data',
    PRODUCT_DATA: 'product_data',

    CHANNEL_DATA: 'channel_data',
    REGIONAL_DATA: 'regional_data',

    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
  } as const,

  // Sales Channels
  CHANNELS: {
    // Online Channels
    WEBSITE: 'website',
    MOBILE_APP: 'mobile_app',
    SOCIAL_COMMERCE: 'social_commerce',
    MARKETPLACE: 'marketplace',
    EMAIL: 'email',

    // Offline Channels
    RETAIL_STORE: 'retail_store',
    POPUP_STORE: 'popup_store',
    TRADE_SHOW: 'trade_show',
    DIRECT_SALES: 'direct_sales',

    // Other Channels
    WHOLESALE: 'wholesale',
    DISTRIBUTOR: 'distributor',
    AFFILIATE: 'affiliate',
    REFERRAL: 'referral',
  } as const,

  // Order Status
  ORDER_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    CONFIRMED: 'confirmed',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
    REFUNDED: 'refunded',
    ON_HOLD: 'on_hold',
  } as const,

  // Payment Status
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    PARTIALLY_REFUNDED: 'partially_refunded',
    CHARGEBACK: 'chargeback',
    ON_HOLD: 'on_hold',
  } as const,

  // Sales Types
  SALES_TYPES: {
    RETAIL: 'retail',
    WHOLESALE: 'wholesale',
    B2B: 'b2b',
    B2C: 'b2c',
    D2C: 'd2c',
    SUBSCRIPTION: 'subscription',
    ONE_TIME: 'one_time',
    RECURRING: 'recurring',
  } as const,

  // Sales Performance Levels
  PERFORMANCE_LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    BELOW_AVERAGE: 'below_average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,

  // Sales Growth Rates
  GROWTH_RATES: {
    HIGH_GROWTH: 'high_growth',
    MODERATE_GROWTH: 'moderate_growth',
    LOW_GROWTH: 'low_growth',
    NO_GROWTH: 'no_growth',
    NEGATIVE_GROWTH: 'negative_growth',
  } as const,

  // Sales Periods
  PERIODS: {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    THIS_WEEK: 'this_week',
    LAST_WEEK: 'last_week',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    THIS_QUARTER: 'this_quarter',
    LAST_QUARTER: 'last_quarter',
    THIS_YEAR: 'this_year',
    LAST_YEAR: 'last_year',
    CUSTOM: 'custom',
  } as const,
} as const;

// Sales Analytics Analysis Types
export type SalesAnalyticsAnalysisType =
  (typeof SALES_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof SALES_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Sales Analytics Data Types
export type SalesAnalyticsDataType =
  (typeof SALES_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof SALES_ANALYTICS_TYPE.DATA_TYPES];

// Sales Analytics Channels
export type SalesAnalyticsChannel =
  (typeof SALES_ANALYTICS_TYPE.CHANNELS)[keyof typeof SALES_ANALYTICS_TYPE.CHANNELS];

// Sales Analytics Order Status
export type SalesAnalyticsOrderStatus =
  (typeof SALES_ANALYTICS_TYPE.ORDER_STATUS)[keyof typeof SALES_ANALYTICS_TYPE.ORDER_STATUS];

// Sales Analytics Payment Status
export type SalesAnalyticsPaymentStatus =
  (typeof SALES_ANALYTICS_TYPE.PAYMENT_STATUS)[keyof typeof SALES_ANALYTICS_TYPE.PAYMENT_STATUS];

// Sales Analytics Sales Types
export type SalesAnalyticsSalesType =
  (typeof SALES_ANALYTICS_TYPE.SALES_TYPES)[keyof typeof SALES_ANALYTICS_TYPE.SALES_TYPES];

// Sales Analytics Performance Levels
export type SalesAnalyticsPerformanceLevel =
  (typeof SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS)[keyof typeof SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS];

// Sales Analytics Growth Rates
export type SalesAnalyticsGrowthRate =
  (typeof SALES_ANALYTICS_TYPE.GROWTH_RATES)[keyof typeof SALES_ANALYTICS_TYPE.GROWTH_RATES];

// Sales Analytics Periods
export type SalesAnalyticsPeriod =
  (typeof SALES_ANALYTICS_TYPE.PERIODS)[keyof typeof SALES_ANALYTICS_TYPE.PERIODS];

// Sales Analytics Analysis Type Labels
export function getSalesAnalyticsAnalysisTypeLabel(type: SalesAnalyticsAnalysisType): string {
  const labels: Record<SalesAnalyticsAnalysisType, string> = {
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE]: 'Performance Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.SALES_PERFORMANCE]: 'Sales Performance',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_PERFORMANCE]: 'Revenue Performance',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_PERFORMANCE]: 'Profit Performance',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.WEEK_OVER_WEEK]: 'Week Over Week',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PERIOD_OVER_PERIOD]: 'Period Over Period',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.GROWTH]: 'Growth Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.SEASONAL]: 'Seasonal Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.CYCLICAL]: 'Cyclical Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.CHANNEL]: 'Channel Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.ONLINE]: 'Online Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.OFFLINE]: 'Offline Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.MULTI_CHANNEL]: 'Multi-Channel Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.CROSS_CHANNEL]: 'Cross-Channel Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.REGIONAL]: 'Regional Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.NATIONAL]: 'National Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.INTERNATIONAL]: 'International Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.LOCAL]: 'Local Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PRODUCT]: 'Product Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.CATEGORY]: 'Category Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.BRAND]: 'Brand Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.SKU]: 'SKU Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.CUSTOMER]: 'Customer Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.SEGMENT]: 'Segment Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.COHORT]: 'Cohort Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMAND]: 'Demand Analysis',
    [SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PROJECTION]: 'Projection',
  };
  return labels[type] || 'Unknown';
}

// Sales Analytics Data Type Labels
export function getSalesAnalyticsDataTypeLabel(type: SalesAnalyticsDataType): string {
  const labels: Record<SalesAnalyticsDataType, string> = {
    [SALES_ANALYTICS_TYPE.DATA_TYPES.TRANSACTIONAL]: 'Transactional',
    [SALES_ANALYTICS_TYPE.DATA_TYPES.ORDER_DATA]: 'Order Data',
    [SALES_ANALYTICS_TYPE.DATA_TYPES.LINE_ITEM]: 'Line Item',
    [SALES_ANALYTICS_TYPE.DATA_TYPES.PAYMENT_DATA]: 'Payment Data',
    [SALES_ANALYTICS_TYPE.DATA_TYPES.CUSTOMER_DATA]: 'Customer Data',
    [SALES_ANALYTICS_TYPE.DATA_TYPES.PRODUCT_DATA]: 'Product Data',
    [SALES_ANALYTICS_TYPE.DATA_TYPES.CHANNEL_DATA]: 'Channel Data',
    [SALES_ANALYTICS_TYPE.DATA_TYPES.REGIONAL_DATA]: 'Regional Data',
    [SALES_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [SALES_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [SALES_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
  };
  return labels[type] || 'Unknown';
}

// Sales Analytics Channel Labels
export function getSalesAnalyticsChannelLabel(channel: SalesAnalyticsChannel): string {
  const labels: Record<SalesAnalyticsChannel, string> = {
    [SALES_ANALYTICS_TYPE.CHANNELS.WEBSITE]: 'Website',
    [SALES_ANALYTICS_TYPE.CHANNELS.MOBILE_APP]: 'Mobile App',
    [SALES_ANALYTICS_TYPE.CHANNELS.SOCIAL_COMMERCE]: 'Social Commerce',
    [SALES_ANALYTICS_TYPE.CHANNELS.MARKETPLACE]: 'Marketplace',
    [SALES_ANALYTICS_TYPE.CHANNELS.EMAIL]: 'Email',
    [SALES_ANALYTICS_TYPE.CHANNELS.RETAIL_STORE]: 'Retail Store',
    [SALES_ANALYTICS_TYPE.CHANNELS.POPUP_STORE]: 'Popup Store',
    [SALES_ANALYTICS_TYPE.CHANNELS.TRADE_SHOW]: 'Trade Show',
    [SALES_ANALYTICS_TYPE.CHANNELS.DIRECT_SALES]: 'Direct Sales',
    [SALES_ANALYTICS_TYPE.CHANNELS.WHOLESALE]: 'Wholesale',
    [SALES_ANALYTICS_TYPE.CHANNELS.DISTRIBUTOR]: 'Distributor',
    [SALES_ANALYTICS_TYPE.CHANNELS.AFFILIATE]: 'Affiliate',
    [SALES_ANALYTICS_TYPE.CHANNELS.REFERRAL]: 'Referral',
  };
  return labels[channel] || 'Unknown';
}

// Sales Analytics Order Status Labels
export function getSalesAnalyticsOrderStatusLabel(status: SalesAnalyticsOrderStatus): string {
  const labels: Record<SalesAnalyticsOrderStatus, string> = {
    [SALES_ANALYTICS_TYPE.ORDER_STATUS.PENDING]: 'Pending',
    [SALES_ANALYTICS_TYPE.ORDER_STATUS.PROCESSING]: 'Processing',
    [SALES_ANALYTICS_TYPE.ORDER_STATUS.CONFIRMED]: 'Confirmed',
    [SALES_ANALYTICS_TYPE.ORDER_STATUS.SHIPPED]: 'Shipped',
    [SALES_ANALYTICS_TYPE.ORDER_STATUS.DELIVERED]: 'Delivered',
    [SALES_ANALYTICS_TYPE.ORDER_STATUS.COMPLETED]: 'Completed',
    [SALES_ANALYTICS_TYPE.ORDER_STATUS.CANCELLED]: 'Cancelled',
    [SALES_ANALYTICS_TYPE.ORDER_STATUS.RETURNED]: 'Returned',
    [SALES_ANALYTICS_TYPE.ORDER_STATUS.REFUNDED]: 'Refunded',
    [SALES_ANALYTICS_TYPE.ORDER_STATUS.ON_HOLD]: 'On Hold',
  };
  return labels[status] || 'Unknown';
}

// Sales Analytics Payment Status Labels
export function getSalesAnalyticsPaymentStatusLabel(status: SalesAnalyticsPaymentStatus): string {
  const labels: Record<SalesAnalyticsPaymentStatus, string> = {
    [SALES_ANALYTICS_TYPE.PAYMENT_STATUS.PENDING]: 'Pending',
    [SALES_ANALYTICS_TYPE.PAYMENT_STATUS.PROCESSING]: 'Processing',
    [SALES_ANALYTICS_TYPE.PAYMENT_STATUS.COMPLETED]: 'Completed',
    [SALES_ANALYTICS_TYPE.PAYMENT_STATUS.FAILED]: 'Failed',
    [SALES_ANALYTICS_TYPE.PAYMENT_STATUS.REFUNDED]: 'Refunded',
    [SALES_ANALYTICS_TYPE.PAYMENT_STATUS.PARTIALLY_REFUNDED]: 'Partially Refunded',
    [SALES_ANALYTICS_TYPE.PAYMENT_STATUS.CHARGEBACK]: 'Chargeback',
    [SALES_ANALYTICS_TYPE.PAYMENT_STATUS.ON_HOLD]: 'On Hold',
  };
  return labels[status] || 'Unknown';
}

// Sales Analytics Sales Type Labels
export function getSalesAnalyticsSalesTypeLabel(type: SalesAnalyticsSalesType): string {
  const labels: Record<SalesAnalyticsSalesType, string> = {
    [SALES_ANALYTICS_TYPE.SALES_TYPES.RETAIL]: 'Retail',
    [SALES_ANALYTICS_TYPE.SALES_TYPES.WHOLESALE]: 'Wholesale',
    [SALES_ANALYTICS_TYPE.SALES_TYPES.B2B]: 'B2B',
    [SALES_ANALYTICS_TYPE.SALES_TYPES.B2C]: 'B2C',
    [SALES_ANALYTICS_TYPE.SALES_TYPES.D2C]: 'D2C',
    [SALES_ANALYTICS_TYPE.SALES_TYPES.SUBSCRIPTION]: 'Subscription',
    [SALES_ANALYTICS_TYPE.SALES_TYPES.ONE_TIME]: 'One-time',
    [SALES_ANALYTICS_TYPE.SALES_TYPES.RECURRING]: 'Recurring',
  };
  return labels[type] || 'Unknown';
}

// Sales Analytics Performance Level Labels
export function getSalesAnalyticsPerformanceLevelLabel(
  level: SalesAnalyticsPerformanceLevel
): string {
  const labels: Record<SalesAnalyticsPerformanceLevel, string> = {
    [SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT]: 'Excellent',
    [SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD]: 'Good',
    [SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE]: 'Average',
    [SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE]: 'Below Average',
    [SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR]: 'Poor',
    [SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Sales Analytics Growth Rate Labels
export function getSalesAnalyticsGrowthRateLabel(rate: SalesAnalyticsGrowthRate): string {
  const labels: Record<SalesAnalyticsGrowthRate, string> = {
    [SALES_ANALYTICS_TYPE.GROWTH_RATES.HIGH_GROWTH]: 'High Growth',
    [SALES_ANALYTICS_TYPE.GROWTH_RATES.MODERATE_GROWTH]: 'Moderate Growth',
    [SALES_ANALYTICS_TYPE.GROWTH_RATES.LOW_GROWTH]: 'Low Growth',
    [SALES_ANALYTICS_TYPE.GROWTH_RATES.NO_GROWTH]: 'No Growth',
    [SALES_ANALYTICS_TYPE.GROWTH_RATES.NEGATIVE_GROWTH]: 'Negative Growth',
  };
  return labels[rate] || 'Unknown';
}

// Sales Analytics Period Labels
export function getSalesAnalyticsPeriodLabel(period: SalesAnalyticsPeriod): string {
  const labels: Record<SalesAnalyticsPeriod, string> = {
    [SALES_ANALYTICS_TYPE.PERIODS.TODAY]: 'Today',
    [SALES_ANALYTICS_TYPE.PERIODS.YESTERDAY]: 'Yesterday',
    [SALES_ANALYTICS_TYPE.PERIODS.THIS_WEEK]: 'This Week',
    [SALES_ANALYTICS_TYPE.PERIODS.LAST_WEEK]: 'Last Week',
    [SALES_ANALYTICS_TYPE.PERIODS.THIS_MONTH]: 'This Month',
    [SALES_ANALYTICS_TYPE.PERIODS.LAST_MONTH]: 'Last Month',
    [SALES_ANALYTICS_TYPE.PERIODS.THIS_QUARTER]: 'This Quarter',
    [SALES_ANALYTICS_TYPE.PERIODS.LAST_QUARTER]: 'Last Quarter',
    [SALES_ANALYTICS_TYPE.PERIODS.THIS_YEAR]: 'This Year',
    [SALES_ANALYTICS_TYPE.PERIODS.LAST_YEAR]: 'Last Year',
    [SALES_ANALYTICS_TYPE.PERIODS.CUSTOM]: 'Custom',
  };
  return labels[period] || 'Unknown';
}

// Check if analysis is performance analysis
export function isSalesAnalyticsPerformanceAnalysis(type: SalesAnalyticsAnalysisType): boolean {
  const performanceTypes: SalesAnalyticsAnalysisType[] = [
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PERFORMANCE,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.SALES_PERFORMANCE,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.REVENUE_PERFORMANCE,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFIT_PERFORMANCE,
  ];
  return performanceTypes.includes(type);
}

// Check if analysis is comparative
export function isSalesAnalyticsComparative(type: SalesAnalyticsAnalysisType): boolean {
  const comparativeTypes: SalesAnalyticsAnalysisType[] = [
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.WEEK_OVER_WEEK,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PERIOD_OVER_PERIOD,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isSalesAnalyticsPredictive(type: SalesAnalyticsAnalysisType): boolean {
  const predictiveTypes: SalesAnalyticsAnalysisType[] = [
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMAND,
    SALES_ANALYTICS_TYPE.ANALYSIS_TYPES.PROJECTION,
  ];
  return predictiveTypes.includes(type);
}

// Get performance level from score
export function getSalesAnalyticsPerformanceLevel(score: number): SalesAnalyticsPerformanceLevel {
  if (score >= 90) return SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT;
  if (score >= 70) return SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD;
  if (score >= 50) return SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE;
  if (score >= 30) return SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE;
  if (score >= 10) return SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR;
  return SALES_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL;
}

// Get growth rate from percentage
export function getSalesAnalyticsGrowthRate(growthPercentage: number): SalesAnalyticsGrowthRate {
  if (growthPercentage > 20) return SALES_ANALYTICS_TYPE.GROWTH_RATES.HIGH_GROWTH;
  if (growthPercentage > 10) return SALES_ANALYTICS_TYPE.GROWTH_RATES.MODERATE_GROWTH;
  if (growthPercentage > 5) return SALES_ANALYTICS_TYPE.GROWTH_RATES.LOW_GROWTH;
  if (growthPercentage > 0) return SALES_ANALYTICS_TYPE.GROWTH_RATES.NO_GROWTH;
  return SALES_ANALYTICS_TYPE.GROWTH_RATES.NEGATIVE_GROWTH;
}
