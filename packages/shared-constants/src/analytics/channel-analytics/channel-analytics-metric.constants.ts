/**
 * Channel Analytics Metric Constants
 * Metrics for measuring channel performance and effectiveness
 */

export const CHANNEL_ANALYTICS_METRIC = {
  // Channel Count Metrics
  COUNT_METRICS: {
    TOTAL_CHANNELS: 'total_channels',
    ACTIVE_CHANNELS: 'active_channels',
    INACTIVE_CHANNELS: 'inactive_channels',
    NEW_CHANNELS: 'new_channels',
    CHANNELS_BY_TYPE: 'channels_by_type',
    CHANNELS_BY_CATEGORY: 'channels_by_category',
  } as const,

  // Reach Metrics
  REACH_METRICS: {
    TOTAL_REACH: 'total_reach',
    UNIQUE_REACH: 'unique_reach',
    IMPRESSIONS: 'impressions',
    UNIQUE_IMPRESSIONS: 'unique_impressions',
    FREQUENCY: 'frequency',
    REACH_PER_CHANNEL: 'reach_per_channel',
    REACH_GROWTH: 'reach_growth',
  } as const,

  // Engagement Metrics
  ENGAGEMENT_METRICS: {
    ENGAGEMENT_RATE: 'engagement_rate',
    TOTAL_ENGAGEMENTS: 'total_engagements',
    CLICKS: 'clicks',
    CLICK_THROUGH_RATE: 'click_through_rate',
    BOUNCE_RATE: 'bounce_rate',
    EXIT_RATE: 'exit_rate',
    ENGAGEMENTS_PER_CHANNEL: 'engagements_per_channel',
    ENGAGEMENT_GROWTH: 'engagement_growth',
  } as const,

  // Conversion Metrics
  CONVERSION_METRICS: {
    CONVERSION_RATE: 'conversion_rate',
    TOTAL_CONVERSIONS: 'total_conversions',
    CONVERSION_VALUE: 'conversion_value',
    COST_PER_CONVERSION: 'cost_per_conversion',
    CONVERSION_PER_CHANNEL: 'conversion_per_channel',
    CONVERSION_GROWTH: 'conversion_growth',
  } as const,

  // Revenue Metrics
  REVENUE_METRICS: {
    TOTAL_REVENUE: 'total_revenue',
    REVENUE_PER_CHANNEL: 'revenue_per_channel',
    REVENUE_GROWTH: 'revenue_growth',
    REVENUE_PER_ENGAGEMENT: 'revenue_per_engagement',
    REVENUE_PER_CONVERSION: 'revenue_per_conversion',
  } as const,

  // Cost Metrics
  COST_METRICS: {
    TOTAL_COST: 'total_cost',
    COST_PER_CHANNEL: 'cost_per_channel',
    COST_PER_ENGAGEMENT: 'cost_per_engagement',
    COST_PER_IMPRESSION: 'cost_per_impression',
    COST_PER_CLICK: 'cost_per_click',
    COST_GROWTH: 'cost_growth',
  } as const,

  // Profit Metrics
  PROFIT_METRICS: {
    TOTAL_PROFIT: 'total_profit',
    PROFIT_PER_CHANNEL: 'profit_per_channel',
    PROFIT_MARGIN: 'profit_margin',
    PROFIT_GROWTH: 'profit_growth',
  } as const,

  // ROI Metrics
  ROI_METRICS: {
    ROI: 'roi',
    ROAS: 'roas',
    ROMI: 'romi',
    ROI_PER_CHANNEL: 'roi_per_channel',
    ROI_GROWTH: 'roi_growth',
  } as const,

  // Customer Metrics
  CUSTOMER_METRICS: {
    CUSTOMERS_ACQUIRED: 'customers_acquired',
    CUSTOMERS_RETAINED: 'customers_retained',
    CUSTOMERS_CHURNED: 'customers_churned',
    CUSTOMER_ACQUISITION_COST: 'customer_acquisition_cost',
    CUSTOMER_LIFETIME_VALUE: 'customer_lifetime_value',
    CUSTOMER_RETENTION_RATE: 'customer_retention_rate',
  } as const,

  // Satisfaction Metrics
  SATISFACTION_METRICS: {
    CSAT: 'csat',
    NPS: 'nps',
    CES: 'ces',
    SATISFACTION_RATE: 'satisfaction_rate',
    SATISFACTION_SCORE: 'satisfaction_score',
  } as const,

  // Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
    CHANNEL_COMPARISON: 'channel_comparison',
    CATEGORY_COMPARISON: 'category_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    COUNT: 'count',
    REACH: 'reach',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    REVENUE: 'revenue',
    COST: 'cost',
    PROFIT: 'profit',
    ROI: 'roi',
    CUSTOMER: 'customer',
    SATISFACTION: 'satisfaction',
    COMPARISON: 'comparison',
  } as const,

  // Metric Types
  TYPES: {
    ABSOLUTE: 'absolute',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATIO: 'ratio',
    RATE: 'rate',
    SCORE: 'score',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    RATING: 'rating',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Channel Analytics Count Metrics
export type ChannelAnalyticsCountMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.COUNT_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.COUNT_METRICS];

// Channel Analytics Reach Metrics
export type ChannelAnalyticsReachMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.REACH_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.REACH_METRICS];

// Channel Analytics Engagement Metrics
export type ChannelAnalyticsEngagementMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.ENGAGEMENT_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.ENGAGEMENT_METRICS];

// Channel Analytics Conversion Metrics
export type ChannelAnalyticsConversionMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.CONVERSION_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.CONVERSION_METRICS];

// Channel Analytics Revenue Metrics
export type ChannelAnalyticsRevenueMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.REVENUE_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.REVENUE_METRICS];

// Channel Analytics Cost Metrics
export type ChannelAnalyticsCostMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.COST_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.COST_METRICS];

// Channel Analytics Profit Metrics
export type ChannelAnalyticsProfitMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.PROFIT_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.PROFIT_METRICS];

// Channel Analytics ROI Metrics
export type ChannelAnalyticsROIMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.ROI_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.ROI_METRICS];

// Channel Analytics Customer Metrics
export type ChannelAnalyticsCustomerMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.CUSTOMER_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.CUSTOMER_METRICS];

// Channel Analytics Satisfaction Metrics
export type ChannelAnalyticsSatisfactionMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.SATISFACTION_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.SATISFACTION_METRICS];

// Channel Analytics Comparison Metrics
export type ChannelAnalyticsComparisonMetric =
  (typeof CHANNEL_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof CHANNEL_ANALYTICS_METRIC.COMPARISON_METRICS];

// Channel Analytics Metric Categories
export type ChannelAnalyticsMetricCategory =
  (typeof CHANNEL_ANALYTICS_METRIC.CATEGORIES)[keyof typeof CHANNEL_ANALYTICS_METRIC.CATEGORIES];

// Channel Analytics Metric Types
export type ChannelAnalyticsMetricType =
  (typeof CHANNEL_ANALYTICS_METRIC.TYPES)[keyof typeof CHANNEL_ANALYTICS_METRIC.TYPES];

// Channel Analytics Metric Formats
export type ChannelAnalyticsMetricFormat =
  (typeof CHANNEL_ANALYTICS_METRIC.FORMATS)[keyof typeof CHANNEL_ANALYTICS_METRIC.FORMATS];

// Channel Analytics Metric Priority
export type ChannelAnalyticsMetricPriority =
  (typeof CHANNEL_ANALYTICS_METRIC.PRIORITY)[keyof typeof CHANNEL_ANALYTICS_METRIC.PRIORITY];

// Channel Analytics Metric Labels
export function getChannelAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Count Metrics
    total_channels: 'Total Channels',
    active_channels: 'Active Channels',
    inactive_channels: 'Inactive Channels',
    new_channels: 'New Channels',
    channels_by_type: 'Channels by Type',
    channels_by_category: 'Channels by Category',

    // Reach Metrics
    total_reach: 'Total Reach',
    unique_reach: 'Unique Reach',
    impressions: 'Impressions',
    unique_impressions: 'Unique Impressions',
    frequency: 'Frequency',
    reach_per_channel: 'Reach per Channel',
    reach_growth: 'Reach Growth',

    // Engagement Metrics
    engagement_rate: 'Engagement Rate',
    total_engagements: 'Total Engagements',
    clicks: 'Clicks',
    click_through_rate: 'Click-through Rate',
    bounce_rate: 'Bounce Rate',
    exit_rate: 'Exit Rate',
    engagements_per_channel: 'Engagements per Channel',
    engagement_growth: 'Engagement Growth',

    // Conversion Metrics
    conversion_rate: 'Conversion Rate',
    total_conversions: 'Total Conversions',
    conversion_value: 'Conversion Value',
    cost_per_conversion: 'Cost per Conversion',
    conversion_per_channel: 'Conversion per Channel',
    conversion_growth: 'Conversion Growth',

    // Revenue Metrics
    total_revenue: 'Total Revenue',
    revenue_per_channel: 'Revenue per Channel',
    revenue_growth: 'Revenue Growth',
    revenue_per_engagement: 'Revenue per Engagement',
    revenue_per_conversion: 'Revenue per Conversion',

    // Cost Metrics
    total_cost: 'Total Cost',
    cost_per_channel: 'Cost per Channel',
    cost_per_engagement: 'Cost per Engagement',
    cost_per_impression: 'Cost per Impression',
    cost_per_click: 'Cost per Click',
    cost_growth: 'Cost Growth',

    // Profit Metrics
    total_profit: 'Total Profit',
    profit_per_channel: 'Profit per Channel',
    profit_margin: 'Profit Margin',
    profit_growth: 'Profit Growth',

    // ROI Metrics
    roi: 'ROI',
    roas: 'ROAS',
    romi: 'ROMI',
    roi_per_channel: 'ROI per Channel',
    roi_growth: 'ROI Growth',

    // Customer Metrics
    customers_acquired: 'Customers Acquired',
    customers_retained: 'Customers Retained',
    customers_churned: 'Customers Churned',
    customer_acquisition_cost: 'Customer Acquisition Cost',
    customer_lifetime_value: 'Customer Lifetime Value',
    customer_retention_rate: 'Customer Retention Rate',

    // Satisfaction Metrics
    csat: 'CSAT',
    nps: 'NPS',
    ces: 'CES',
    satisfaction_rate: 'Satisfaction Rate',
    satisfaction_score: 'Satisfaction Score',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    period_comparison: 'Period Comparison',
    channel_comparison: 'Channel Comparison',
    category_comparison: 'Category Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Channel Analytics Metric Category Labels
export function getChannelAnalyticsMetricCategoryLabel(
  category: ChannelAnalyticsMetricCategory
): string {
  const labels: Record<ChannelAnalyticsMetricCategory, string> = {
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.COUNT]: 'Count',
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.REACH]: 'Reach',
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.CONVERSION]: 'Conversion',
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.REVENUE]: 'Revenue',
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.COST]: 'Cost',
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.PROFIT]: 'Profit',
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.ROI]: 'ROI',
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.CUSTOMER]: 'Customer',
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.SATISFACTION]: 'Satisfaction',
    [CHANNEL_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Channel Analytics Metric Type Labels
export function getChannelAnalyticsMetricTypeLabel(type: ChannelAnalyticsMetricType): string {
  const labels: Record<ChannelAnalyticsMetricType, string> = {
    [CHANNEL_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [CHANNEL_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [CHANNEL_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [CHANNEL_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [CHANNEL_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [CHANNEL_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
  };
  return labels[type] || 'Unknown';
}

// Channel Analytics Metric Format Labels
export function getChannelAnalyticsMetricFormatLabel(format: ChannelAnalyticsMetricFormat): string {
  const labels: Record<ChannelAnalyticsMetricFormat, string> = {
    [CHANNEL_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [CHANNEL_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [CHANNEL_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [CHANNEL_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [CHANNEL_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Channel Analytics Metric Priority Labels
export function getChannelAnalyticsMetricPriorityLabel(
  priority: ChannelAnalyticsMetricPriority
): string {
  const labels: Record<ChannelAnalyticsMetricPriority, string> = {
    [CHANNEL_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [CHANNEL_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [CHANNEL_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [CHANNEL_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getChannelAnalyticsMetricCategory(metric: string): ChannelAnalyticsMetricCategory {
  const countMetrics = Object.values(CHANNEL_ANALYTICS_METRIC.COUNT_METRICS) as readonly string[];
  const reachMetrics = Object.values(CHANNEL_ANALYTICS_METRIC.REACH_METRICS) as readonly string[];
  const engagementMetrics = Object.values(
    CHANNEL_ANALYTICS_METRIC.ENGAGEMENT_METRICS
  ) as readonly string[];
  const conversionMetrics = Object.values(
    CHANNEL_ANALYTICS_METRIC.CONVERSION_METRICS
  ) as readonly string[];
  const revenueMetrics = Object.values(
    CHANNEL_ANALYTICS_METRIC.REVENUE_METRICS
  ) as readonly string[];
  const costMetrics = Object.values(CHANNEL_ANALYTICS_METRIC.COST_METRICS) as readonly string[];
  const profitMetrics = Object.values(CHANNEL_ANALYTICS_METRIC.PROFIT_METRICS) as readonly string[];
  const roiMetrics = Object.values(CHANNEL_ANALYTICS_METRIC.ROI_METRICS) as readonly string[];
  const customerMetrics = Object.values(
    CHANNEL_ANALYTICS_METRIC.CUSTOMER_METRICS
  ) as readonly string[];
  const satisfactionMetrics = Object.values(
    CHANNEL_ANALYTICS_METRIC.SATISFACTION_METRICS
  ) as readonly string[];
  const comparisonMetrics = Object.values(
    CHANNEL_ANALYTICS_METRIC.COMPARISON_METRICS
  ) as readonly string[];

  if (countMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.COUNT;
  if (reachMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.REACH;
  if (engagementMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT;
  if (conversionMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.CONVERSION;
  if (revenueMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.REVENUE;
  if (costMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.COST;
  if (profitMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.PROFIT;
  if (roiMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.ROI;
  if (customerMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.CUSTOMER;
  if (satisfactionMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.SATISFACTION;
  if (comparisonMetrics.includes(metric)) return CHANNEL_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return CHANNEL_ANALYTICS_METRIC.CATEGORIES.COUNT;
}

// Get metric type
export function getChannelAnalyticsMetricType(metric: string): ChannelAnalyticsMetricType {
  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'roi',
    'roas',
    'romi',
    'margin',
    'growth',
    'conversion',
    'engagement',
    'retention',
    'satisfaction',
  ];

  const averageMetrics: string[] = ['avg', 'average', 'mean'];

  const scoreMetrics: string[] = ['score', 'csat', 'nps', 'ces'];

  const lowerMetric = metric.toLowerCase();

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return CHANNEL_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am) => lowerMetric.includes(am))) {
    return CHANNEL_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm) => lowerMetric.includes(sm))) {
    return CHANNEL_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return CHANNEL_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getChannelAnalyticsMetricFormat(metric: string): ChannelAnalyticsMetricFormat {
  const currencyMetrics: string[] = [
    'revenue',
    'cost',
    'profit',
    'value',
    'price',
    'acquisition_cost',
    'lifetime_value',
  ];

  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'roi',
    'roas',
    'romi',
    'margin',
    'growth',
    'conversion',
    'engagement',
    'retention',
    'satisfaction',
  ];

  const ratingMetrics: string[] = ['score', 'csat', 'nps', 'ces'];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm) => lowerMetric.includes(cm))) {
    return CHANNEL_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (ratingMetrics.some((rm) => lowerMetric.includes(rm))) {
    return CHANNEL_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return CHANNEL_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return CHANNEL_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate engagement rate
export function calculateChannelAnalyticsEngagementRate(
  engagements: number,
  reach: number
): number {
  if (reach === 0) return 0;
  return (engagements / reach) * 100;
}

// Calculate click-through rate
export function calculateChannelAnalyticsCTR(clicks: number, impressions: number): number {
  if (impressions === 0) return 0;
  return (clicks / impressions) * 100;
}

// Calculate conversion rate
export function calculateChannelAnalyticsConversionRate(
  conversions: number,
  engagements: number
): number {
  if (engagements === 0) return 0;
  return (conversions / engagements) * 100;
}

// Calculate ROI
export function calculateChannelAnalyticsROI(revenue: number, cost: number): number {
  if (cost === 0) return 0;
  return ((revenue - cost) / cost) * 100;
}

// Calculate ROAS
export function calculateChannelAnalyticsROAS(revenue: number, adSpend: number): number {
  if (adSpend === 0) return 0;
  return revenue / adSpend;
}

// Calculate profit margin
export function calculateChannelAnalyticsProfitMargin(profit: number, revenue: number): number {
  if (revenue === 0) return 0;
  return (profit / revenue) * 100;
}

// Calculate customer acquisition cost
export function calculateChannelAnalyticsCAC(totalCost: number, newCustomers: number): number {
  if (newCustomers === 0) return 0;
  return totalCost / newCustomers;
}

// Calculate customer retention rate
export function calculateChannelAnalyticsRetentionRate(
  retainedCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (retainedCustomers / totalCustomers) * 100;
}

// Calculate CSAT
export function calculateChannelAnalyticsCSAT(
  satisfiedResponses: number,
  totalResponses: number
): number {
  if (totalResponses === 0) return 0;
  return (satisfiedResponses / totalResponses) * 100;
}
