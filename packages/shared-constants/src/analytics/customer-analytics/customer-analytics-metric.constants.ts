/**
 * Customer Analytics Metric Constants
 * Metrics for measuring customer behavior and performance
 */

export const CUSTOMER_ANALYTICS_METRIC = {
  // Customer Count Metrics
  COUNT_METRICS: {
    TOTAL_CUSTOMERS: 'total_customers',
    ACTIVE_CUSTOMERS: 'active_customers',
    INACTIVE_CUSTOMERS: 'inactive_customers',
    NEW_CUSTOMERS: 'new_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
    LOYAL_CUSTOMERS: 'loyal_customers',
    VIP_CUSTOMERS: 'vip_customers',
    CHURNED_CUSTOMERS: 'churned_customers',
    ENGAGED_CUSTOMERS: 'engaged_customers',
    DISENGAGED_CUSTOMERS: 'disengaged_customers',
  } as const,

  // Acquisition Metrics
  ACQUISITION_METRICS: {
    ACQUISITION_RATE: 'acquisition_rate',
    ACQUISITION_COST: 'acquisition_cost',
    CUSTOMER_ACQUISITION_COST: 'customer_acquisition_cost',
    COST_PER_ACQUISITION: 'cost_per_acquisition',
    ACQUISITION_CHANNEL: 'acquisition_channel',
    ACQUISITION_CONVERSION: 'acquisition_conversion',
  } as const,

  // Retention Metrics
  RETENTION_METRICS: {
    RETENTION_RATE: 'retention_rate',
    CHURN_RATE: 'churn_rate',
    REACTIVATION_RATE: 'reactivation_rate',
    CUSTOMER_LIFETIME: 'customer_lifetime',
    AVERAGE_CUSTOMER_LIFETIME: 'average_customer_lifetime',
    RETENTION_COST: 'retention_cost',
    REACTIVATION_COST: 'reactivation_cost',
  } as const,

  // Value Metrics
  VALUE_METRICS: {
    LIFETIME_VALUE: 'lifetime_value',
    AVERAGE_LIFETIME_VALUE: 'average_lifetime_value',
    TOTAL_SPENT: 'total_spent',
    AVERAGE_ORDER_VALUE: 'average_order_value',
    PURCHASE_FREQUENCY: 'purchase_frequency',
    REPEAT_PURCHASE_RATE: 'repeat_purchase_rate',
    CUSTOMER_VALUE: 'customer_value',
    CUSTOMER_PROFIT: 'customer_profit',
  } as const,

  // Engagement Metrics
  ENGAGEMENT_METRICS: {
    ENGAGEMENT_SCORE: 'engagement_score',
    LOYALTY_SCORE: 'loyalty_score',
    SATISFACTION_SCORE: 'satisfaction_score',
    NPS: 'nps',
    CSAT: 'csat',
    CES: 'ces',
    ENGAGEMENT_RATE: 'engagement_rate',
    INTERACTION_RATE: 'interaction_rate',
  } as const,

  // Growth Metrics
  GROWTH_METRICS: {
    CUSTOMER_GROWTH: 'customer_growth',
    CUSTOMER_GROWTH_RATE: 'customer_growth_rate',
    REVENUE_GROWTH: 'revenue_growth',
    PROFIT_GROWTH: 'profit_growth',
    VALUE_GROWTH: 'value_growth',
    ENGAGEMENT_GROWTH: 'engagement_growth',
  } as const,

  // Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
    SEGMENT_COMPARISON: 'segment_comparison',
    COHORT_COMPARISON: 'cohort_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    COUNT: 'count',
    ACQUISITION: 'acquisition',
    RETENTION: 'retention',
    VALUE: 'value',
    ENGAGEMENT: 'engagement',
    GROWTH: 'growth',
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
    COST: 'cost',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    DURATION: 'duration',
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

// Customer Analytics Count Metrics
export type CustomerAnalyticsCountMetric =
  (typeof CUSTOMER_ANALYTICS_METRIC.COUNT_METRICS)[keyof typeof CUSTOMER_ANALYTICS_METRIC.COUNT_METRICS];

// Customer Analytics Acquisition Metrics
export type CustomerAnalyticsAcquisitionMetric =
  (typeof CUSTOMER_ANALYTICS_METRIC.ACQUISITION_METRICS)[keyof typeof CUSTOMER_ANALYTICS_METRIC.ACQUISITION_METRICS];

// Customer Analytics Retention Metrics
export type CustomerAnalyticsRetentionMetric =
  (typeof CUSTOMER_ANALYTICS_METRIC.RETENTION_METRICS)[keyof typeof CUSTOMER_ANALYTICS_METRIC.RETENTION_METRICS];

// Customer Analytics Value Metrics
export type CustomerAnalyticsValueMetric =
  (typeof CUSTOMER_ANALYTICS_METRIC.VALUE_METRICS)[keyof typeof CUSTOMER_ANALYTICS_METRIC.VALUE_METRICS];

// Customer Analytics Engagement Metrics
export type CustomerAnalyticsEngagementMetric =
  (typeof CUSTOMER_ANALYTICS_METRIC.ENGAGEMENT_METRICS)[keyof typeof CUSTOMER_ANALYTICS_METRIC.ENGAGEMENT_METRICS];

// Customer Analytics Growth Metrics
export type CustomerAnalyticsGrowthMetric =
  (typeof CUSTOMER_ANALYTICS_METRIC.GROWTH_METRICS)[keyof typeof CUSTOMER_ANALYTICS_METRIC.GROWTH_METRICS];

// Customer Analytics Comparison Metrics
export type CustomerAnalyticsComparisonMetric =
  (typeof CUSTOMER_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof CUSTOMER_ANALYTICS_METRIC.COMPARISON_METRICS];

// Customer Analytics Metric Categories
export type CustomerAnalyticsMetricCategory =
  (typeof CUSTOMER_ANALYTICS_METRIC.CATEGORIES)[keyof typeof CUSTOMER_ANALYTICS_METRIC.CATEGORIES];

// Customer Analytics Metric Types
export type CustomerAnalyticsMetricType =
  (typeof CUSTOMER_ANALYTICS_METRIC.TYPES)[keyof typeof CUSTOMER_ANALYTICS_METRIC.TYPES];

// Customer Analytics Metric Formats
export type CustomerAnalyticsMetricFormat =
  (typeof CUSTOMER_ANALYTICS_METRIC.FORMATS)[keyof typeof CUSTOMER_ANALYTICS_METRIC.FORMATS];

// Customer Analytics Metric Priority
export type CustomerAnalyticsMetricPriority =
  (typeof CUSTOMER_ANALYTICS_METRIC.PRIORITY)[keyof typeof CUSTOMER_ANALYTICS_METRIC.PRIORITY];

// Customer Analytics Metric Labels
export function getCustomerAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Count Metrics
    total_customers: 'Total Customers',
    active_customers: 'Active Customers',
    inactive_customers: 'Inactive Customers',
    new_customers: 'New Customers',
    returning_customers: 'Returning Customers',
    loyal_customers: 'Loyal Customers',
    vip_customers: 'VIP Customers',
    churned_customers: 'Churned Customers',
    engaged_customers: 'Engaged Customers',
    disengaged_customers: 'Disengaged Customers',

    // Acquisition Metrics
    acquisition_rate: 'Acquisition Rate',
    acquisition_cost: 'Acquisition Cost',
    customer_acquisition_cost: 'Customer Acquisition Cost',
    cost_per_acquisition: 'Cost Per Acquisition',
    acquisition_channel: 'Acquisition Channel',
    acquisition_conversion: 'Acquisition Conversion',

    // Retention Metrics
    retention_rate: 'Retention Rate',
    churn_rate: 'Churn Rate',
    reactivation_rate: 'Reactivation Rate',
    customer_lifetime: 'Customer Lifetime',
    average_customer_lifetime: 'Average Customer Lifetime',
    retention_cost: 'Retention Cost',
    reactivation_cost: 'Reactivation Cost',

    // Value Metrics
    lifetime_value: 'Lifetime Value',
    average_lifetime_value: 'Average Lifetime Value',
    total_spent: 'Total Spent',
    average_order_value: 'Average Order Value',
    purchase_frequency: 'Purchase Frequency',
    repeat_purchase_rate: 'Repeat Purchase Rate',
    customer_value: 'Customer Value',
    customer_profit: 'Customer Profit',

    // Engagement Metrics
    engagement_score: 'Engagement Score',
    loyalty_score: 'Loyalty Score',
    satisfaction_score: 'Satisfaction Score',
    nps: 'NPS',
    csat: 'CSAT',
    ces: 'CES',
    engagement_rate: 'Engagement Rate',
    interaction_rate: 'Interaction Rate',

    // Growth Metrics
    customer_growth: 'Customer Growth',
    customer_growth_rate: 'Customer Growth Rate',
    revenue_growth: 'Revenue Growth',
    profit_growth: 'Profit Growth',
    value_growth: 'Value Growth',
    engagement_growth: 'Engagement Growth',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    period_comparison: 'Period Comparison',
    segment_comparison: 'Segment Comparison',
    cohort_comparison: 'Cohort Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Customer Analytics Metric Category Labels
export function getCustomerAnalyticsMetricCategoryLabel(
  category: CustomerAnalyticsMetricCategory
): string {
  const labels: Record<CustomerAnalyticsMetricCategory, string> = {
    [CUSTOMER_ANALYTICS_METRIC.CATEGORIES.COUNT]: 'Count',
    [CUSTOMER_ANALYTICS_METRIC.CATEGORIES.ACQUISITION]: 'Acquisition',
    [CUSTOMER_ANALYTICS_METRIC.CATEGORIES.RETENTION]: 'Retention',
    [CUSTOMER_ANALYTICS_METRIC.CATEGORIES.VALUE]: 'Value',
    [CUSTOMER_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [CUSTOMER_ANALYTICS_METRIC.CATEGORIES.GROWTH]: 'Growth',
    [CUSTOMER_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Customer Analytics Metric Type Labels
export function getCustomerAnalyticsMetricTypeLabel(type: CustomerAnalyticsMetricType): string {
  const labels: Record<CustomerAnalyticsMetricType, string> = {
    [CUSTOMER_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [CUSTOMER_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [CUSTOMER_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [CUSTOMER_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [CUSTOMER_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [CUSTOMER_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
    [CUSTOMER_ANALYTICS_METRIC.TYPES.COST]: 'Cost',
  };
  return labels[type] || 'Unknown';
}

// Customer Analytics Metric Format Labels
export function getCustomerAnalyticsMetricFormatLabel(
  format: CustomerAnalyticsMetricFormat
): string {
  const labels: Record<CustomerAnalyticsMetricFormat, string> = {
    [CUSTOMER_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [CUSTOMER_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [CUSTOMER_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [CUSTOMER_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [CUSTOMER_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [CUSTOMER_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Customer Analytics Metric Priority Labels
export function getCustomerAnalyticsMetricPriorityLabel(
  priority: CustomerAnalyticsMetricPriority
): string {
  const labels: Record<CustomerAnalyticsMetricPriority, string> = {
    [CUSTOMER_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [CUSTOMER_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [CUSTOMER_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [CUSTOMER_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getCustomerAnalyticsMetricCategory(
  metric: string
): CustomerAnalyticsMetricCategory {
  const countMetrics = Object.values(CUSTOMER_ANALYTICS_METRIC.COUNT_METRICS) as readonly string[];
  const acquisitionMetrics = Object.values(
    CUSTOMER_ANALYTICS_METRIC.ACQUISITION_METRICS
  ) as readonly string[];
  const retentionMetrics = Object.values(
    CUSTOMER_ANALYTICS_METRIC.RETENTION_METRICS
  ) as readonly string[];
  const valueMetrics = Object.values(CUSTOMER_ANALYTICS_METRIC.VALUE_METRICS) as readonly string[];
  const engagementMetrics = Object.values(
    CUSTOMER_ANALYTICS_METRIC.ENGAGEMENT_METRICS
  ) as readonly string[];
  const growthMetrics = Object.values(
    CUSTOMER_ANALYTICS_METRIC.GROWTH_METRICS
  ) as readonly string[];
  const comparisonMetrics = Object.values(
    CUSTOMER_ANALYTICS_METRIC.COMPARISON_METRICS
  ) as readonly string[];

  if (countMetrics.includes(metric)) return CUSTOMER_ANALYTICS_METRIC.CATEGORIES.COUNT;
  if (acquisitionMetrics.includes(metric)) return CUSTOMER_ANALYTICS_METRIC.CATEGORIES.ACQUISITION;
  if (retentionMetrics.includes(metric)) return CUSTOMER_ANALYTICS_METRIC.CATEGORIES.RETENTION;
  if (valueMetrics.includes(metric)) return CUSTOMER_ANALYTICS_METRIC.CATEGORIES.VALUE;
  if (engagementMetrics.includes(metric)) return CUSTOMER_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT;
  if (growthMetrics.includes(metric)) return CUSTOMER_ANALYTICS_METRIC.CATEGORIES.GROWTH;
  if (comparisonMetrics.includes(metric)) return CUSTOMER_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return CUSTOMER_ANALYTICS_METRIC.CATEGORIES.COUNT;
}

// Get metric type
export function getCustomerAnalyticsMetricType(metric: string): CustomerAnalyticsMetricType {
  const percentageMetrics: string[] = ['rate', 'percentage', 'growth', 'conversion'];

  const averageMetrics: string[] = ['avg', 'average', 'mean'];

  const costMetrics: string[] = ['cost', 'cac', 'acquisition_cost'];

  const scoreMetrics: string[] = ['score', 'nps', 'csat', 'ces'];

  const lowerMetric = metric.toLowerCase();

  if (costMetrics.some((cm) => lowerMetric.includes(cm))) {
    return CUSTOMER_ANALYTICS_METRIC.TYPES.COST;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return CUSTOMER_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am) => lowerMetric.includes(am))) {
    return CUSTOMER_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm) => lowerMetric.includes(sm))) {
    return CUSTOMER_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return CUSTOMER_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getCustomerAnalyticsMetricFormat(metric: string): CustomerAnalyticsMetricFormat {
  const currencyMetrics: string[] = ['cost', 'value', 'spent', 'price'];

  const percentageMetrics: string[] = ['rate', 'percentage', 'growth', 'conversion'];

  const durationMetrics: string[] = ['lifetime', 'duration', 'time'];

  const ratingMetrics: string[] = ['score', 'nps', 'csat', 'ces'];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm) => lowerMetric.includes(cm))) {
    return CUSTOMER_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return CUSTOMER_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (ratingMetrics.some((rm) => lowerMetric.includes(rm))) {
    return CUSTOMER_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return CUSTOMER_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return CUSTOMER_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate retention rate
export function calculateCustomerAnalyticsRetentionRate(
  retainedCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (retainedCustomers / totalCustomers) * 100;
}

// Calculate churn rate
export function calculateCustomerAnalyticsChurnRate(
  churnedCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (churnedCustomers / totalCustomers) * 100;
}

// Calculate lifetime value
export function calculateCustomerAnalyticsLifetimeValue(
  avgOrderValue: number,
  purchaseFrequency: number,
  customerLifetime: number
): number {
  return avgOrderValue * purchaseFrequency * customerLifetime;
}

// Calculate average order value
export function calculateCustomerAnalyticsAverageOrderValue(
  totalRevenue: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return totalRevenue / totalOrders;
}

// Calculate purchase frequency
export function calculateCustomerAnalyticsPurchaseFrequency(
  totalOrders: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return totalOrders / totalCustomers;
}

// Calculate repeat purchase rate
export function calculateCustomerAnalyticsRepeatPurchaseRate(
  repeatCustomers: number,
  totalCustomers: number
): number {
  if (totalCustomers === 0) return 0;
  return (repeatCustomers / totalCustomers) * 100;
}

// Calculate NPS
export function calculateCustomerAnalyticsNPS(
  promoters: number,
  passives: number,
  detractors: number
): number {
  const total = promoters + passives + detractors;
  if (total === 0) return 0;
  return ((promoters - detractors) / total) * 100;
}

// Calculate customer acquisition cost
export function calculateCustomerAnalyticsCAC(
  totalAcquisitionCost: number,
  newCustomers: number
): number {
  if (newCustomers === 0) return 0;
  return totalAcquisitionCost / newCustomers;
}
