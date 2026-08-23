/**
 * AI Analytics Metric Constants
 * Metrics and KPIs for AI analytics
 */

export const AI_ANALYTICS_METRIC = {
  // Metric Categories
  CATEGORIES: {
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    ACQUISITION: 'acquisition',
    REVENUE: 'revenue',
    PROFIT: 'profit',
    EFFICIENCY: 'efficiency',
    QUALITY: 'quality',
    SATISFACTION: 'satisfaction',
    GROWTH: 'growth',
  } as const,

  // Metric Types
  TYPES: {
    COUNT: 'count',
    RATE: 'rate',
    RATIO: 'ratio',
    PERCENTAGE: 'percentage',
    AVERAGE: 'average',
    MEDIAN: 'median',
    SUM: 'sum',
    DURATION: 'duration',
    AMOUNT: 'amount',
    SCORE: 'score',
    INDEX: 'index',
  } as const,

  // Metric Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NICE_TO_HAVE: 'nice_to_have',
  } as const,

  // Metric Formulas
  FORMULAS: {
    CONVERSION_RATE: 'purchases / visitors * 100',
    BOUNCE_RATE: 'single_page_sessions / total_sessions * 100',
    AVERAGE_ORDER_VALUE: 'total_revenue / total_orders',
    CUSTOMER_LIFETIME_VALUE: 'average_order_value * purchase_frequency * customer_lifespan',
    CUSTOMER_ACQUISITION_COST: 'total_marketing_spend / new_customers',
    RETURN_ON_INVESTMENT: '(gain - cost) / cost * 100',
    NET_PROMOTER_SCORE: 'promoters - detractors',
    CUSTOMER_SATISFACTION_SCORE: 'total_satisfaction_scores / total_responses',
    ENGAGEMENT_RATE: 'interactions / impressions * 100',
    CHURN_RATE: 'lost_customers / total_customers * 100',
    RETENTION_RATE: 'retained_customers / total_customers * 100',
  } as const,

  // Metric Thresholds
  THRESHOLDS: {
    CONVERSION_RATE: { low: 0, medium: 2, high: 5, critical: 10 },
    BOUNCE_RATE: { low: 60, medium: 40, high: 20, critical: 10 },
    CHURN_RATE: { low: 10, medium: 5, high: 2, critical: 1 },
    CUSTOMER_SATISFACTION: { low: 0, medium: 60, high: 80, critical: 90 },
    NPS: { low: 0, medium: 30, high: 50, critical: 70 },
  } as const,

  // Metric Colors
  COLORS: {
    EXCELLENT: '#00E676',
    GOOD: '#4CAF50',
    AVERAGE: '#FFC107',
    POOR: '#FF5722',
    CRITICAL: '#D32F2F',
  } as const,
} as const;

// Metric Categories
export type AIAnalyticsMetricCategory =
  (typeof AI_ANALYTICS_METRIC.CATEGORIES)[keyof typeof AI_ANALYTICS_METRIC.CATEGORIES];

// Metric Types
export type AIAnalyticsMetricType =
  (typeof AI_ANALYTICS_METRIC.TYPES)[keyof typeof AI_ANALYTICS_METRIC.TYPES];

// Metric Priorities
export type AIAnalyticsMetricPriority =
  (typeof AI_ANALYTICS_METRIC.PRIORITIES)[keyof typeof AI_ANALYTICS_METRIC.PRIORITIES];

// Metric Formulas
export type AIAnalyticsMetricFormula =
  (typeof AI_ANALYTICS_METRIC.FORMULAS)[keyof typeof AI_ANALYTICS_METRIC.FORMULAS];

// Metric Thresholds
export type AIAnalyticsMetricThreshold =
  (typeof AI_ANALYTICS_METRIC.THRESHOLDS)[keyof typeof AI_ANALYTICS_METRIC.THRESHOLDS];

// Metric Colors
export type AIAnalyticsMetricColor =
  (typeof AI_ANALYTICS_METRIC.COLORS)[keyof typeof AI_ANALYTICS_METRIC.COLORS];

// Utility Functions - সব নামে AI যোগ করা হয়েছে
export function getAIMetricCategoryLabel(category: AIAnalyticsMetricCategory): string {
  const labels: Record<AIAnalyticsMetricCategory, string> = {
    [AI_ANALYTICS_METRIC.CATEGORIES.ENGAGEMENT]: 'Engagement',
    [AI_ANALYTICS_METRIC.CATEGORIES.CONVERSION]: 'Conversion',
    [AI_ANALYTICS_METRIC.CATEGORIES.RETENTION]: 'Retention',
    [AI_ANALYTICS_METRIC.CATEGORIES.ACQUISITION]: 'Acquisition',
    [AI_ANALYTICS_METRIC.CATEGORIES.REVENUE]: 'Revenue',
    [AI_ANALYTICS_METRIC.CATEGORIES.PROFIT]: 'Profit',
    [AI_ANALYTICS_METRIC.CATEGORIES.EFFICIENCY]: 'Efficiency',
    [AI_ANALYTICS_METRIC.CATEGORIES.QUALITY]: 'Quality',
    [AI_ANALYTICS_METRIC.CATEGORIES.SATISFACTION]: 'Satisfaction',
    [AI_ANALYTICS_METRIC.CATEGORIES.GROWTH]: 'Growth',
  };
  return labels[category] || 'Unknown';
}

export function getAIMetricTypeLabel(type: AIAnalyticsMetricType): string {
  const labels: Record<AIAnalyticsMetricType, string> = {
    [AI_ANALYTICS_METRIC.TYPES.COUNT]: 'Count',
    [AI_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [AI_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [AI_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [AI_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [AI_ANALYTICS_METRIC.TYPES.MEDIAN]: 'Median',
    [AI_ANALYTICS_METRIC.TYPES.SUM]: 'Sum',
    [AI_ANALYTICS_METRIC.TYPES.DURATION]: 'Duration',
    [AI_ANALYTICS_METRIC.TYPES.AMOUNT]: 'Amount',
    [AI_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
    [AI_ANALYTICS_METRIC.TYPES.INDEX]: 'Index',
  };
  return labels[type] || 'Unknown';
}

export function getAIMetricPriorityLabel(priority: AIAnalyticsMetricPriority): string {
  const labels: Record<AIAnalyticsMetricPriority, string> = {
    [AI_ANALYTICS_METRIC.PRIORITIES.CRITICAL]: 'Critical',
    [AI_ANALYTICS_METRIC.PRIORITIES.HIGH]: 'High',
    [AI_ANALYTICS_METRIC.PRIORITIES.MEDIUM]: 'Medium',
    [AI_ANALYTICS_METRIC.PRIORITIES.LOW]: 'Low',
    [AI_ANALYTICS_METRIC.PRIORITIES.NICE_TO_HAVE]: 'Nice to Have',
  };
  return labels[priority] || 'Unknown';
}

export function getAIMetricFormula(formulaName: string): string {
  const formulas: Record<string, string> = AI_ANALYTICS_METRIC.FORMULAS;
  return formulas[formulaName] || 'Formula not found';
}

export function getAIMetricColor(score: number): AIAnalyticsMetricColor {
  if (score >= 90) return AI_ANALYTICS_METRIC.COLORS.EXCELLENT;
  if (score >= 70) return AI_ANALYTICS_METRIC.COLORS.GOOD;
  if (score >= 50) return AI_ANALYTICS_METRIC.COLORS.AVERAGE;
  if (score >= 30) return AI_ANALYTICS_METRIC.COLORS.POOR;
  return AI_ANALYTICS_METRIC.COLORS.CRITICAL;
}

export function getAIMetricStatus(
  score: number,
  threshold: AIAnalyticsMetricThreshold
): 'excellent' | 'good' | 'average' | 'poor' | 'critical' {
  if (score >= threshold.critical) return 'excellent';
  if (score >= threshold.high) return 'good';
  if (score >= threshold.medium) return 'average';
  if (score >= threshold.low) return 'poor';
  return 'critical';
}

export function getAIMetricColorByStatus(
  status: 'excellent' | 'good' | 'average' | 'poor' | 'critical'
): AIAnalyticsMetricColor {
  const colorMap: Record<string, AIAnalyticsMetricColor> = {
    excellent: AI_ANALYTICS_METRIC.COLORS.EXCELLENT,
    good: AI_ANALYTICS_METRIC.COLORS.GOOD,
    average: AI_ANALYTICS_METRIC.COLORS.AVERAGE,
    poor: AI_ANALYTICS_METRIC.COLORS.POOR,
    critical: AI_ANALYTICS_METRIC.COLORS.CRITICAL,
  };
  return colorMap[status];
}
