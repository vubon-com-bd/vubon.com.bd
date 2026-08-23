/**
 * Vendor Analytics Metric Constants
 * Metrics for measuring vendor performance and analytics
 */

export const VENDOR_ANALYTICS_METRIC = {
  // Vendor Count Metrics
  COUNT_METRICS: {
    TOTAL_VENDORS: 'total_vendors',
    ACTIVE_VENDORS: 'active_vendors',
    INACTIVE_VENDORS: 'inactive_vendors',
    PENDING_VENDORS: 'pending_vendors',
    APPROVED_VENDORS: 'approved_vendors',
    REJECTED_VENDORS: 'rejected_vendors',
    SUSPENDED_VENDORS: 'suspended_vendors',
    TERMINATED_VENDORS: 'terminated_vendors',
    NEW_VENDORS: 'new_vendors',
    NEW_VENDOR_RATE: 'new_vendor_rate',
    VENDOR_RETENTION_RATE: 'vendor_retention_rate',
    VENDOR_CHURN_RATE: 'vendor_churn_rate',
  } as const,

  // Vendor Revenue Metrics
  REVENUE_METRICS: {
    TOTAL_REVENUE: 'total_revenue',
    AVG_REVENUE_PER_VENDOR: 'avg_revenue_per_vendor',
    REVENUE_GROWTH: 'revenue_growth',
    REVENUE_SHARE: 'revenue_share',
    REVENUE_PER_TIER: 'revenue_per_tier',
    REVENUE_PER_CATEGORY: 'revenue_per_category',
    AVG_DAILY_REVENUE: 'avg_daily_revenue',
    AVG_WEEKLY_REVENUE: 'avg_weekly_revenue',
    AVG_MONTHLY_REVENUE: 'avg_monthly_revenue',
    AVG_QUARTERLY_REVENUE: 'avg_quarterly_revenue',
    AVG_YEARLY_REVENUE: 'avg_yearly_revenue',
  } as const,

  // Vendor Sales Metrics
  SALES_METRICS: {
    TOTAL_SALES: 'total_sales',
    AVG_SALES_PER_VENDOR: 'avg_sales_per_vendor',
    SALES_GROWTH: 'sales_growth',
    UNITS_SOLD: 'units_sold',
    AVG_UNITS_PER_SALE: 'avg_units_per_sale',
    SALES_PER_TIER: 'sales_per_tier',
    SALES_PER_CATEGORY: 'sales_per_category',
    TOP_SELLING_VENDORS: 'top_selling_vendors',
    SALES_CONVERSION_RATE: 'sales_conversion_rate',
  } as const,

  // Vendor Profit Metrics
  PROFIT_METRICS: {
    TOTAL_PROFIT: 'total_profit',
    AVG_PROFIT_PER_VENDOR: 'avg_profit_per_vendor',
    PROFIT_GROWTH: 'profit_growth',
    PROFIT_MARGIN: 'profit_margin',
    GROSS_PROFIT: 'gross_profit',
    NET_PROFIT: 'net_profit',
    PROFIT_PER_TIER: 'profit_per_tier',
    PROFIT_PER_CATEGORY: 'profit_per_category',
  } as const,

  // Vendor Commission Metrics
  COMMISSION_METRICS: {
    TOTAL_COMMISSION: 'total_commission',
    AVG_COMMISSION_PER_VENDOR: 'avg_commission_per_vendor',
    COMMISSION_RATE: 'commission_rate',
    COMMISSION_EARNED: 'commission_earned',
    COMMISSION_PENDING: 'commission_pending',
    COMMISSION_PAID: 'commission_paid',
    COMMISSION_GROWTH: 'commission_growth',
    AVG_COMMISSION_RATE: 'avg_commission_rate',
  } as const,

  // Vendor Quality Metrics
  QUALITY_METRICS: {
    AVG_RATING: 'avg_rating',
    TOTAL_REVIEWS: 'total_reviews',
    POSITIVE_REVIEW_RATE: 'positive_review_rate',
    NEGATIVE_REVIEW_RATE: 'negative_review_rate',
    NEUTRAL_REVIEW_RATE: 'neutral_review_rate',
    REVIEWS_PER_VENDOR: 'reviews_per_vendor',
    QUALITY_SCORE: 'quality_score',
    PRODUCT_QUALITY_SCORE: 'product_quality_score',
    SERVICE_QUALITY_SCORE: 'service_quality_score',
    DELIVERY_QUALITY_SCORE: 'delivery_quality_score',
  } as const,

  // Vendor Compliance Metrics
  COMPLIANCE_METRICS: {
    COMPLIANCE_RATE: 'compliance_rate',
    COMPLIANCE_SCORE: 'compliance_score',
    AUDIT_RATE: 'audit_rate',
    AUDIT_PASS_RATE: 'audit_pass_rate',
    COMPLIANCE_ISSUES: 'compliance_issues',
    COMPLIANCE_VIOLATIONS: 'compliance_violations',
    COMPLIANCE_RESOLUTION_TIME: 'compliance_resolution_time',
    REGULATORY_COMPLIANCE: 'regulatory_compliance',
  } as const,

  // Vendor Performance Metrics
  PERFORMANCE_METRICS: {
    PERFORMANCE_SCORE: 'performance_score',
    FULFILLMENT_RATE: 'fulfillment_rate',
    DELIVERY_RATE: 'delivery_rate',
    ON_TIME_DELIVERY_RATE: 'on_time_delivery_rate',
    RETURN_RATE: 'return_rate',
    REFUND_RATE: 'refund_rate',
    CANCELLATION_RATE: 'cancellation_rate',
    ORDER_ACCURACY_RATE: 'order_accuracy_rate',
    RESPONSE_TIME: 'response_time',
    RESOLUTION_TIME: 'resolution_time',
  } as const,

  // Vendor Relationship Metrics
  RELATIONSHIP_METRICS: {
    PARTNERSHIP_DURATION: 'partnership_duration',
    AVG_PARTNERSHIP_DURATION: 'avg_partnership_duration',
    COMMUNICATION_FREQUENCY: 'communication_frequency',
    RESPONSE_RATE: 'response_rate',
    SATISFACTION_LEVEL: 'satisfaction_level',
    RETENTION_RATE: 'retention_rate',
    CHURN_RATE: 'churn_rate',
    REFERRAL_RATE: 'referral_rate',
  } as const,

  // Vendor Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    TIER_COMPARISON: 'tier_comparison',
    CATEGORY_COMPARISON: 'category_comparison',
    REGION_COMPARISON: 'region_comparison',
    PERFORMANCE_COMPARISON: 'performance_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    COUNT: 'count',
    REVENUE: 'revenue',
    SALES: 'sales',
    PROFIT: 'profit',
    COMMISSION: 'commission',
    QUALITY: 'quality',
    COMPLIANCE: 'compliance',
    PERFORMANCE: 'performance',
    RELATIONSHIP: 'relationship',
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

// Vendor Analytics Count Metrics
export type VendorAnalyticsCountMetric =
  (typeof VENDOR_ANALYTICS_METRIC.COUNT_METRICS)[keyof typeof VENDOR_ANALYTICS_METRIC.COUNT_METRICS];

// Vendor Analytics Revenue Metrics
export type VendorAnalyticsRevenueMetric =
  (typeof VENDOR_ANALYTICS_METRIC.REVENUE_METRICS)[keyof typeof VENDOR_ANALYTICS_METRIC.REVENUE_METRICS];

// Vendor Analytics Sales Metrics
export type VendorAnalyticsSalesMetric =
  (typeof VENDOR_ANALYTICS_METRIC.SALES_METRICS)[keyof typeof VENDOR_ANALYTICS_METRIC.SALES_METRICS];

// Vendor Analytics Profit Metrics
export type VendorAnalyticsProfitMetric =
  (typeof VENDOR_ANALYTICS_METRIC.PROFIT_METRICS)[keyof typeof VENDOR_ANALYTICS_METRIC.PROFIT_METRICS];

// Vendor Analytics Commission Metrics
export type VendorAnalyticsCommissionMetric =
  (typeof VENDOR_ANALYTICS_METRIC.COMMISSION_METRICS)[keyof typeof VENDOR_ANALYTICS_METRIC.COMMISSION_METRICS];

// Vendor Analytics Quality Metrics
export type VendorAnalyticsQualityMetric =
  (typeof VENDOR_ANALYTICS_METRIC.QUALITY_METRICS)[keyof typeof VENDOR_ANALYTICS_METRIC.QUALITY_METRICS];

// Vendor Analytics Compliance Metrics
export type VendorAnalyticsComplianceMetric =
  (typeof VENDOR_ANALYTICS_METRIC.COMPLIANCE_METRICS)[keyof typeof VENDOR_ANALYTICS_METRIC.COMPLIANCE_METRICS];

// Vendor Analytics Performance Metrics
export type VendorAnalyticsPerformanceMetric =
  (typeof VENDOR_ANALYTICS_METRIC.PERFORMANCE_METRICS)[keyof typeof VENDOR_ANALYTICS_METRIC.PERFORMANCE_METRICS];

// Vendor Analytics Relationship Metrics
export type VendorAnalyticsRelationshipMetric =
  (typeof VENDOR_ANALYTICS_METRIC.RELATIONSHIP_METRICS)[keyof typeof VENDOR_ANALYTICS_METRIC.RELATIONSHIP_METRICS];

// Vendor Analytics Comparison Metrics
export type VendorAnalyticsComparisonMetric =
  (typeof VENDOR_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof VENDOR_ANALYTICS_METRIC.COMPARISON_METRICS];

// Vendor Analytics Metric Categories
export type VendorAnalyticsMetricCategory =
  (typeof VENDOR_ANALYTICS_METRIC.CATEGORIES)[keyof typeof VENDOR_ANALYTICS_METRIC.CATEGORIES];

// Vendor Analytics Metric Types
export type VendorAnalyticsMetricType =
  (typeof VENDOR_ANALYTICS_METRIC.TYPES)[keyof typeof VENDOR_ANALYTICS_METRIC.TYPES];

// Vendor Analytics Metric Formats
export type VendorAnalyticsMetricFormat =
  (typeof VENDOR_ANALYTICS_METRIC.FORMATS)[keyof typeof VENDOR_ANALYTICS_METRIC.FORMATS];

// Vendor Analytics Metric Priority
export type VendorAnalyticsMetricPriority =
  (typeof VENDOR_ANALYTICS_METRIC.PRIORITY)[keyof typeof VENDOR_ANALYTICS_METRIC.PRIORITY];

// Vendor Analytics Metric Labels
export function getVendorAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Count Metrics
    total_vendors: 'Total Vendors',
    active_vendors: 'Active Vendors',
    inactive_vendors: 'Inactive Vendors',
    pending_vendors: 'Pending Vendors',
    approved_vendors: 'Approved Vendors',
    rejected_vendors: 'Rejected Vendors',
    suspended_vendors: 'Suspended Vendors',
    terminated_vendors: 'Terminated Vendors',
    new_vendors: 'New Vendors',
    new_vendor_rate: 'New Vendor Rate',
    vendor_retention_rate: 'Vendor Retention Rate',
    vendor_churn_rate: 'Vendor Churn Rate',

    // Revenue Metrics
    total_revenue: 'Total Revenue',
    avg_revenue_per_vendor: 'Avg Revenue Per Vendor',
    revenue_growth: 'Revenue Growth',
    revenue_share: 'Revenue Share',
    revenue_per_tier: 'Revenue Per Tier',
    revenue_per_category: 'Revenue Per Category',
    avg_daily_revenue: 'Avg Daily Revenue',
    avg_weekly_revenue: 'Avg Weekly Revenue',
    avg_monthly_revenue: 'Avg Monthly Revenue',
    avg_quarterly_revenue: 'Avg Quarterly Revenue',
    avg_yearly_revenue: 'Avg Yearly Revenue',

    // Sales Metrics
    total_sales: 'Total Sales',
    avg_sales_per_vendor: 'Avg Sales Per Vendor',
    sales_growth: 'Sales Growth',
    units_sold: 'Units Sold',
    avg_units_per_sale: 'Avg Units Per Sale',
    sales_per_tier: 'Sales Per Tier',
    sales_per_category: 'Sales Per Category',
    top_selling_vendors: 'Top Selling Vendors',
    sales_conversion_rate: 'Sales Conversion Rate',

    // Profit Metrics
    total_profit: 'Total Profit',
    avg_profit_per_vendor: 'Avg Profit Per Vendor',
    profit_growth: 'Profit Growth',
    profit_margin: 'Profit Margin',
    gross_profit: 'Gross Profit',
    net_profit: 'Net Profit',
    profit_per_tier: 'Profit Per Tier',
    profit_per_category: 'Profit Per Category',

    // Commission Metrics
    total_commission: 'Total Commission',
    avg_commission_per_vendor: 'Avg Commission Per Vendor',
    commission_rate: 'Commission Rate',
    commission_earned: 'Commission Earned',
    commission_pending: 'Commission Pending',
    commission_paid: 'Commission Paid',
    commission_growth: 'Commission Growth',
    avg_commission_rate: 'Avg Commission Rate',

    // Quality Metrics
    avg_rating: 'Avg Rating',
    total_reviews: 'Total Reviews',
    positive_review_rate: 'Positive Review Rate',
    negative_review_rate: 'Negative Review Rate',
    neutral_review_rate: 'Neutral Review Rate',
    reviews_per_vendor: 'Reviews Per Vendor',
    quality_score: 'Quality Score',
    product_quality_score: 'Product Quality Score',
    service_quality_score: 'Service Quality Score',
    delivery_quality_score: 'Delivery Quality Score',

    // Compliance Metrics
    compliance_rate: 'Compliance Rate',
    compliance_score: 'Compliance Score',
    audit_rate: 'Audit Rate',
    audit_pass_rate: 'Audit Pass Rate',
    compliance_issues: 'Compliance Issues',
    compliance_violations: 'Compliance Violations',
    compliance_resolution_time: 'Compliance Resolution Time',
    regulatory_compliance: 'Regulatory Compliance',

    // Performance Metrics
    performance_score: 'Performance Score',
    fulfillment_rate: 'Fulfillment Rate',
    delivery_rate: 'Delivery Rate',
    on_time_delivery_rate: 'On-time Delivery Rate',
    return_rate: 'Return Rate',
    refund_rate: 'Refund Rate',
    cancellation_rate: 'Cancellation Rate',
    order_accuracy_rate: 'Order Accuracy Rate',
    response_time: 'Response Time',
    resolution_time: 'Resolution Time',

    // Relationship Metrics
    partnership_duration: 'Partnership Duration',
    avg_partnership_duration: 'Avg Partnership Duration',
    communication_frequency: 'Communication Frequency',
    response_rate: 'Response Rate',
    satisfaction_level: 'Satisfaction Level',
    retention_rate: 'Retention Rate',
    churn_rate: 'Churn Rate',
    referral_rate: 'Referral Rate',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    tier_comparison: 'Tier Comparison',
    category_comparison: 'Category Comparison',
    region_comparison: 'Region Comparison',
    performance_comparison: 'Performance Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Vendor Analytics Metric Category Labels
export function getVendorAnalyticsMetricCategoryLabel(
  category: VendorAnalyticsMetricCategory
): string {
  const labels: Record<VendorAnalyticsMetricCategory, string> = {
    [VENDOR_ANALYTICS_METRIC.CATEGORIES.COUNT]: 'Count',
    [VENDOR_ANALYTICS_METRIC.CATEGORIES.REVENUE]: 'Revenue',
    [VENDOR_ANALYTICS_METRIC.CATEGORIES.SALES]: 'Sales',
    [VENDOR_ANALYTICS_METRIC.CATEGORIES.PROFIT]: 'Profit',
    [VENDOR_ANALYTICS_METRIC.CATEGORIES.COMMISSION]: 'Commission',
    [VENDOR_ANALYTICS_METRIC.CATEGORIES.QUALITY]: 'Quality',
    [VENDOR_ANALYTICS_METRIC.CATEGORIES.COMPLIANCE]: 'Compliance',
    [VENDOR_ANALYTICS_METRIC.CATEGORIES.PERFORMANCE]: 'Performance',
    [VENDOR_ANALYTICS_METRIC.CATEGORIES.RELATIONSHIP]: 'Relationship',
    [VENDOR_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Vendor Analytics Metric Type Labels
export function getVendorAnalyticsMetricTypeLabel(type: VendorAnalyticsMetricType): string {
  const labels: Record<VendorAnalyticsMetricType, string> = {
    [VENDOR_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [VENDOR_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [VENDOR_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [VENDOR_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [VENDOR_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [VENDOR_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
  };
  return labels[type] || 'Unknown';
}

// Vendor Analytics Metric Format Labels
export function getVendorAnalyticsMetricFormatLabel(format: VendorAnalyticsMetricFormat): string {
  const labels: Record<VendorAnalyticsMetricFormat, string> = {
    [VENDOR_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [VENDOR_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [VENDOR_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [VENDOR_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [VENDOR_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [VENDOR_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
  };
  return labels[format] || 'Unknown';
}

// Vendor Analytics Metric Priority Labels
export function getVendorAnalyticsMetricPriorityLabel(
  priority: VendorAnalyticsMetricPriority
): string {
  const labels: Record<VendorAnalyticsMetricPriority, string> = {
    [VENDOR_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [VENDOR_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [VENDOR_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [VENDOR_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getVendorAnalyticsMetricCategory(metric: string): VendorAnalyticsMetricCategory {
  const countMetrics: string[] = Object.values(VENDOR_ANALYTICS_METRIC.COUNT_METRICS);
  const revenueMetrics: string[] = Object.values(VENDOR_ANALYTICS_METRIC.REVENUE_METRICS);
  const salesMetrics: string[] = Object.values(VENDOR_ANALYTICS_METRIC.SALES_METRICS);
  const profitMetrics: string[] = Object.values(VENDOR_ANALYTICS_METRIC.PROFIT_METRICS);
  const commissionMetrics: string[] = Object.values(VENDOR_ANALYTICS_METRIC.COMMISSION_METRICS);
  const qualityMetrics: string[] = Object.values(VENDOR_ANALYTICS_METRIC.QUALITY_METRICS);
  const complianceMetrics: string[] = Object.values(VENDOR_ANALYTICS_METRIC.COMPLIANCE_METRICS);
  const performanceMetrics: string[] = Object.values(VENDOR_ANALYTICS_METRIC.PERFORMANCE_METRICS);
  const relationshipMetrics: string[] = Object.values(VENDOR_ANALYTICS_METRIC.RELATIONSHIP_METRICS);
  const comparisonMetrics: string[] = Object.values(VENDOR_ANALYTICS_METRIC.COMPARISON_METRICS);

  if (countMetrics.includes(metric)) return VENDOR_ANALYTICS_METRIC.CATEGORIES.COUNT;
  if (revenueMetrics.includes(metric)) return VENDOR_ANALYTICS_METRIC.CATEGORIES.REVENUE;
  if (salesMetrics.includes(metric)) return VENDOR_ANALYTICS_METRIC.CATEGORIES.SALES;
  if (profitMetrics.includes(metric)) return VENDOR_ANALYTICS_METRIC.CATEGORIES.PROFIT;
  if (commissionMetrics.includes(metric)) return VENDOR_ANALYTICS_METRIC.CATEGORIES.COMMISSION;
  if (qualityMetrics.includes(metric)) return VENDOR_ANALYTICS_METRIC.CATEGORIES.QUALITY;
  if (complianceMetrics.includes(metric)) return VENDOR_ANALYTICS_METRIC.CATEGORIES.COMPLIANCE;
  if (performanceMetrics.includes(metric)) return VENDOR_ANALYTICS_METRIC.CATEGORIES.PERFORMANCE;
  if (relationshipMetrics.includes(metric)) return VENDOR_ANALYTICS_METRIC.CATEGORIES.RELATIONSHIP;
  if (comparisonMetrics.includes(metric)) return VENDOR_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return VENDOR_ANALYTICS_METRIC.CATEGORIES.COUNT;
}

// Get metric type
export function getVendorAnalyticsMetricType(metric: string): VendorAnalyticsMetricType {
  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'margin',
    'growth',
    'conversion',
    'retention',
    'churn',
    'return',
    'refund',
    'cancellation',
    'accuracy',
    'compliance',
    'fulfillment',
    'delivery',
  ];

  const averageMetrics: string[] = ['avg', 'average', 'mean'];

  const scoreMetrics: string[] = ['score', 'rating', 'nps', 'csat'];

  const lowerMetric = metric.toLowerCase();

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return VENDOR_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am) => lowerMetric.includes(am))) {
    return VENDOR_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm) => lowerMetric.includes(sm))) {
    return VENDOR_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return VENDOR_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getVendorAnalyticsMetricFormat(metric: string): VendorAnalyticsMetricFormat {
  const currencyMetrics: string[] = ['revenue', 'profit', 'commission', 'value', 'price', 'cost'];

  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'margin',
    'growth',
    'conversion',
    'retention',
    'churn',
    'return',
    'refund',
    'cancellation',
    'accuracy',
    'compliance',
    'fulfillment',
    'delivery',
  ];

  const ratingMetrics: string[] = ['score', 'rating', 'nps', 'csat'];

  const durationMetrics: string[] = ['time', 'duration', 'response', 'resolution'];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm) => lowerMetric.includes(cm))) {
    return VENDOR_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return VENDOR_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (ratingMetrics.some((rm) => lowerMetric.includes(rm))) {
    return VENDOR_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return VENDOR_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return VENDOR_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate vendor retention rate
export function calculateVendorAnalyticsRetentionRate(
  retainedVendors: number,
  totalVendors: number
): number {
  if (totalVendors === 0) return 0;
  return (retainedVendors / totalVendors) * 100;
}

// Calculate vendor churn rate
export function calculateVendorAnalyticsChurnRate(
  churnedVendors: number,
  totalVendors: number
): number {
  if (totalVendors === 0) return 0;
  return (churnedVendors / totalVendors) * 100;
}

// Calculate vendor conversion rate
export function calculateVendorAnalyticsConversionRate(
  convertedVendors: number,
  totalVendors: number
): number {
  if (totalVendors === 0) return 0;
  return (convertedVendors / totalVendors) * 100;
}

// Calculate vendor compliance rate
export function calculateVendorAnalyticsComplianceRate(
  compliantVendors: number,
  totalVendors: number
): number {
  if (totalVendors === 0) return 0;
  return (compliantVendors / totalVendors) * 100;
}

// Calculate vendor quality score
export function calculateVendorAnalyticsQualityScore(
  avgRating: number,
  reviewCount: number
): number {
  if (reviewCount === 0) return 0;
  return avgRating;
}

// Calculate vendor fulfillment rate
export function calculateVendorAnalyticsFulfillmentRate(
  fulfilledOrders: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return (fulfilledOrders / totalOrders) * 100;
}
