/**
 * @fileoverview Customer analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Customer analytics metrics
 */
export enum CustomerAnalyticsMetric {
  /** Total number of customers */
  TOTAL_CUSTOMERS = 'TOTAL_CUSTOMERS',
  /** Active customers */
  ACTIVE_CUSTOMERS = 'ACTIVE_CUSTOMERS',
  /** New customers in period */
  NEW_CUSTOMERS = 'NEW_CUSTOMERS',
  /** Returning customers */
  RETURNING_CUSTOMERS = 'RETURNING_CUSTOMERS',
  /** Customer lifetime value */
  CUSTOMER_LIFETIME_VALUE = 'CUSTOMER_LIFETIME_VALUE',
  /** Customer acquisition cost */
  CUSTOMER_ACQUISITION_COST = 'CUSTOMER_ACQUISITION_COST',
  /** Customer retention rate percentage */
  CUSTOMER_RETENTION_RATE = 'CUSTOMER_RETENTION_RATE',
  /** Customer churn rate percentage */
  CUSTOMER_CHURN_RATE = 'CUSTOMER_CHURN_RATE',
  /** Customer satisfaction score */
  CUSTOMER_SATISFACTION_SCORE = 'CUSTOMER_SATISFACTION_SCORE',
  /** Net promoter score */
  NET_PROMOTER_SCORE = 'NET_PROMOTER_SCORE',
  /** Customer loyalty score */
  CUSTOMER_LOYALTY_SCORE = 'CUSTOMER_LOYALTY_SCORE',
  /** Repeat purchase rate percentage */
  REPEAT_PURCHASE_RATE = 'REPEAT_PURCHASE_RATE',
  /** Average order frequency */
  AVERAGE_ORDER_FREQUENCY = 'AVERAGE_ORDER_FREQUENCY',
  /** Average order value per customer */
  AVERAGE_ORDER_VALUE_PER_CUSTOMER = 'AVERAGE_ORDER_VALUE_PER_CUSTOMER',
  /** Customer segment distribution */
  CUSTOMER_SEGMENT_DISTRIBUTION = 'CUSTOMER_SEGMENT_DISTRIBUTION',
  /** Customer geographic distribution */
  CUSTOMER_GEOGRAPHIC_DISTRIBUTION = 'CUSTOMER_GEOGRAPHIC_DISTRIBUTION',
  /** Customer age distribution */
  CUSTOMER_AGE_DISTRIBUTION = 'CUSTOMER_AGE_DISTRIBUTION',
  /** Customer gender distribution */
  CUSTOMER_GENDER_DISTRIBUTION = 'CUSTOMER_GENDER_DISTRIBUTION',
  /** Customer income distribution */
  CUSTOMER_INCOME_DISTRIBUTION = 'CUSTOMER_INCOME_DISTRIBUTION',
  /** Customer preference distribution */
  CUSTOMER_PREFERENCE_DISTRIBUTION = 'CUSTOMER_PREFERENCE_DISTRIBUTION',
  /** Customer engagement score */
  CUSTOMER_ENGAGEMENT_SCORE = 'CUSTOMER_ENGAGEMENT_SCORE',
  /** Customer social influence score */
  CUSTOMER_SOCIAL_INFLUENCE_SCORE = 'CUSTOMER_SOCIAL_INFLUENCE_SCORE',
  /** Customer referral rate percentage */
  CUSTOMER_REFERRAL_RATE = 'CUSTOMER_REFERRAL_RATE',
  /** Customer review rate percentage */
  CUSTOMER_REVIEW_RATE = 'CUSTOMER_REVIEW_RATE',
  /** Customer complaint rate percentage */
  CUSTOMER_COMPLAINT_RATE = 'CUSTOMER_COMPLAINT_RATE',
  /** Customer resolution time in hours */
  CUSTOMER_RESOLUTION_TIME = 'CUSTOMER_RESOLUTION_TIME',
  /** First contact resolution rate percentage */
  CUSTOMER_FIRST_CONTACT_RESOLUTION = 'CUSTOMER_FIRST_CONTACT_RESOLUTION',
  /** Customer support ticket volume */
  CUSTOMER_SUPPORT_TICKET_VOLUME = 'CUSTOMER_SUPPORT_TICKET_VOLUME',
  /** Customer average lifetime */
  CUSTOMER_AVERAGE_LIFETIME = 'CUSTOMER_AVERAGE_LIFETIME',
  /** Customer reactivation rate */
  CUSTOMER_REACTIVATION_RATE = 'CUSTOMER_REACTIVATION_RATE',
  /** Customer advocacy score */
  CUSTOMER_ADVOCACY_SCORE = 'CUSTOMER_ADVOCACY_SCORE',
  /** Customer trust score */
  CUSTOMER_TRUST_SCORE = 'CUSTOMER_TRUST_SCORE',
}

/**
 * Customer metric type classification
 */
export enum CustomerAnalyticsMetricType {
  /** Count metrics */
  COUNT = 'COUNT',
  /** Rate metrics */
  RATE = 'RATE',
  /** Score metrics */
  SCORE = 'SCORE',
  /** Value metrics */
  VALUE = 'VALUE',
  /** Time metrics */
  TIME = 'TIME',
  /** Distribution metrics */
  DISTRIBUTION = 'DISTRIBUTION',
}

/**
 * Customer metric category mapping
 */
export const CUSTOMER_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  CustomerAnalyticsMetric,
  CustomerAnalyticsMetricType
> = {
  [CustomerAnalyticsMetric.TOTAL_CUSTOMERS]: CustomerAnalyticsMetricType.COUNT,
  [CustomerAnalyticsMetric.ACTIVE_CUSTOMERS]: CustomerAnalyticsMetricType.COUNT,
  [CustomerAnalyticsMetric.NEW_CUSTOMERS]: CustomerAnalyticsMetricType.COUNT,
  [CustomerAnalyticsMetric.RETURNING_CUSTOMERS]: CustomerAnalyticsMetricType.COUNT,
  [CustomerAnalyticsMetric.CUSTOMER_LIFETIME_VALUE]: CustomerAnalyticsMetricType.VALUE,
  [CustomerAnalyticsMetric.CUSTOMER_ACQUISITION_COST]: CustomerAnalyticsMetricType.VALUE,
  [CustomerAnalyticsMetric.CUSTOMER_RETENTION_RATE]: CustomerAnalyticsMetricType.RATE,
  [CustomerAnalyticsMetric.CUSTOMER_CHURN_RATE]: CustomerAnalyticsMetricType.RATE,
  [CustomerAnalyticsMetric.CUSTOMER_SATISFACTION_SCORE]: CustomerAnalyticsMetricType.SCORE,
  [CustomerAnalyticsMetric.NET_PROMOTER_SCORE]: CustomerAnalyticsMetricType.SCORE,
  [CustomerAnalyticsMetric.CUSTOMER_LOYALTY_SCORE]: CustomerAnalyticsMetricType.SCORE,
  [CustomerAnalyticsMetric.REPEAT_PURCHASE_RATE]: CustomerAnalyticsMetricType.RATE,
  [CustomerAnalyticsMetric.AVERAGE_ORDER_FREQUENCY]: CustomerAnalyticsMetricType.RATE,
  [CustomerAnalyticsMetric.AVERAGE_ORDER_VALUE_PER_CUSTOMER]: CustomerAnalyticsMetricType.VALUE,
  [CustomerAnalyticsMetric.CUSTOMER_SEGMENT_DISTRIBUTION]: CustomerAnalyticsMetricType.DISTRIBUTION,
  [CustomerAnalyticsMetric.CUSTOMER_GEOGRAPHIC_DISTRIBUTION]:
    CustomerAnalyticsMetricType.DISTRIBUTION,
  [CustomerAnalyticsMetric.CUSTOMER_AGE_DISTRIBUTION]: CustomerAnalyticsMetricType.DISTRIBUTION,
  [CustomerAnalyticsMetric.CUSTOMER_GENDER_DISTRIBUTION]: CustomerAnalyticsMetricType.DISTRIBUTION,
  [CustomerAnalyticsMetric.CUSTOMER_INCOME_DISTRIBUTION]: CustomerAnalyticsMetricType.DISTRIBUTION,
  [CustomerAnalyticsMetric.CUSTOMER_PREFERENCE_DISTRIBUTION]:
    CustomerAnalyticsMetricType.DISTRIBUTION,
  [CustomerAnalyticsMetric.CUSTOMER_ENGAGEMENT_SCORE]: CustomerAnalyticsMetricType.SCORE,
  [CustomerAnalyticsMetric.CUSTOMER_SOCIAL_INFLUENCE_SCORE]: CustomerAnalyticsMetricType.SCORE,
  [CustomerAnalyticsMetric.CUSTOMER_REFERRAL_RATE]: CustomerAnalyticsMetricType.RATE,
  [CustomerAnalyticsMetric.CUSTOMER_REVIEW_RATE]: CustomerAnalyticsMetricType.RATE,
  [CustomerAnalyticsMetric.CUSTOMER_COMPLAINT_RATE]: CustomerAnalyticsMetricType.RATE,
  [CustomerAnalyticsMetric.CUSTOMER_RESOLUTION_TIME]: CustomerAnalyticsMetricType.TIME,
  [CustomerAnalyticsMetric.CUSTOMER_FIRST_CONTACT_RESOLUTION]: CustomerAnalyticsMetricType.RATE,
  [CustomerAnalyticsMetric.CUSTOMER_SUPPORT_TICKET_VOLUME]: CustomerAnalyticsMetricType.COUNT,
  [CustomerAnalyticsMetric.CUSTOMER_AVERAGE_LIFETIME]: CustomerAnalyticsMetricType.TIME,
  [CustomerAnalyticsMetric.CUSTOMER_REACTIVATION_RATE]: CustomerAnalyticsMetricType.RATE,
  [CustomerAnalyticsMetric.CUSTOMER_ADVOCACY_SCORE]: CustomerAnalyticsMetricType.SCORE,
  [CustomerAnalyticsMetric.CUSTOMER_TRUST_SCORE]: CustomerAnalyticsMetricType.SCORE,
};

/**
 * Customer metric format type
 */
export enum CustomerAnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Score format (0-100) */
  SCORE = 'SCORE',
  /** Time format */
  TIME = 'TIME',
  /** Rating format (0-10) */
  RATING = 'RATING',
}

/**
 * Customer metric configuration
 */
export interface CustomerAnalyticsMetricConfig {
  label: string;
  description: string;
  format: CustomerAnalyticsMetricFormat;
  icon?: string;
  color?: string;
  isReversed: boolean;
  priority: number;
  threshold?: {
    good: number;
    average: number;
    poor: number;
  };
}

export const CUSTOMER_ANALYTICS_METRIC_CONFIG: Record<
  CustomerAnalyticsMetric,
  CustomerAnalyticsMetricConfig
> = {
  [CustomerAnalyticsMetric.TOTAL_CUSTOMERS]: {
    label: 'Total Customers',
    description: 'Total number of registered customers',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [CustomerAnalyticsMetric.ACTIVE_CUSTOMERS]: {
    label: 'Active Customers',
    description: 'Number of active customers in period',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'UserCheck',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [CustomerAnalyticsMetric.NEW_CUSTOMERS]: {
    label: 'New Customers',
    description: 'Number of new customers in period',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'UserPlus',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.RETURNING_CUSTOMERS]: {
    label: 'Returning Customers',
    description: 'Number of returning customers',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'UserCheck',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_LIFETIME_VALUE]: {
    label: 'Customer Lifetime Value',
    description: 'Average customer lifetime value',
    format: CustomerAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [CustomerAnalyticsMetric.CUSTOMER_ACQUISITION_COST]: {
    label: 'Customer Acquisition Cost',
    description: 'Cost to acquire a new customer',
    format: CustomerAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
  },
  [CustomerAnalyticsMetric.CUSTOMER_RETENTION_RATE]: {
    label: 'Customer Retention Rate',
    description: 'Percentage of customers retained',
    format: CustomerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 80,
      average: 60,
      poor: 40,
    },
  },
  [CustomerAnalyticsMetric.CUSTOMER_CHURN_RATE]: {
    label: 'Customer Churn Rate',
    description: 'Percentage of customers lost',
    format: CustomerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserX',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 5,
      average: 10,
      poor: 20,
    },
  },
  [CustomerAnalyticsMetric.CUSTOMER_SATISFACTION_SCORE]: {
    label: 'Customer Satisfaction Score',
    description: 'Overall customer satisfaction score',
    format: CustomerAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 80,
      average: 60,
      poor: 40,
    },
  },
  [CustomerAnalyticsMetric.NET_PROMOTER_SCORE]: {
    label: 'Net Promoter Score',
    description: 'Net promoter score (-100 to 100)',
    format: CustomerAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 50,
      average: 30,
      poor: 10,
    },
  },
  [CustomerAnalyticsMetric.CUSTOMER_LOYALTY_SCORE]: {
    label: 'Customer Loyalty Score',
    description: 'Overall customer loyalty score',
    format: CustomerAnalyticsMetricFormat.SCORE,
    icon: 'Heart',
    color: '#EC4899',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.REPEAT_PURCHASE_RATE]: {
    label: 'Repeat Purchase Rate',
    description: 'Percentage of customers who purchase again',
    format: CustomerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Repeat',
    color: '#10B981',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 40,
      average: 30,
      poor: 20,
    },
  },
  [CustomerAnalyticsMetric.AVERAGE_ORDER_FREQUENCY]: {
    label: 'Average Order Frequency',
    description: 'Average number of orders per customer',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'ShoppingBag',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.AVERAGE_ORDER_VALUE_PER_CUSTOMER]: {
    label: 'Average Order Value Per Customer',
    description: 'Average order value per customer',
    format: CustomerAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_SEGMENT_DISTRIBUTION]: {
    label: 'Segment Distribution',
    description: 'Distribution of customers by segment',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'PieChart',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_GEOGRAPHIC_DISTRIBUTION]: {
    label: 'Geographic Distribution',
    description: 'Distribution of customers by location',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'MapPin',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_AGE_DISTRIBUTION]: {
    label: 'Age Distribution',
    description: 'Distribution of customers by age',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'User',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_GENDER_DISTRIBUTION]: {
    label: 'Gender Distribution',
    description: 'Distribution of customers by gender',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'User',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_INCOME_DISTRIBUTION]: {
    label: 'Income Distribution',
    description: 'Distribution of customers by income',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_PREFERENCE_DISTRIBUTION]: {
    label: 'Preference Distribution',
    description: 'Distribution of customer preferences',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'Settings',
    color: '#6B7280',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_ENGAGEMENT_SCORE]: {
    label: 'Customer Engagement Score',
    description: 'Overall customer engagement score',
    format: CustomerAnalyticsMetricFormat.SCORE,
    icon: 'Activity',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_SOCIAL_INFLUENCE_SCORE]: {
    label: 'Social Influence Score',
    description: 'Customer social influence score',
    format: CustomerAnalyticsMetricFormat.SCORE,
    icon: 'Share2',
    color: '#1DA1F2',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_REFERRAL_RATE]: {
    label: 'Customer Referral Rate',
    description: 'Percentage of customers who refer others',
    format: CustomerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Users',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_REVIEW_RATE]: {
    label: 'Customer Review Rate',
    description: 'Percentage of customers who leave reviews',
    format: CustomerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MessageSquare',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_COMPLAINT_RATE]: {
    label: 'Customer Complaint Rate',
    description: 'Percentage of customers with complaints',
    format: CustomerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'AlertTriangle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_RESOLUTION_TIME]: {
    label: 'Resolution Time',
    description: 'Average time to resolve customer issues',
    format: CustomerAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_FIRST_CONTACT_RESOLUTION]: {
    label: 'First Contact Resolution',
    description: 'Percentage of issues resolved on first contact',
    format: CustomerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'CheckCircle',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_SUPPORT_TICKET_VOLUME]: {
    label: 'Support Ticket Volume',
    description: 'Total number of support tickets',
    format: CustomerAnalyticsMetricFormat.NUMBER,
    icon: 'MessageSquare',
    color: '#6366F1',
    isReversed: true,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_AVERAGE_LIFETIME]: {
    label: 'Average Customer Lifetime',
    description: 'Average customer lifetime in days',
    format: CustomerAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_REACTIVATION_RATE]: {
    label: 'Customer Reactivation Rate',
    description: 'Percentage of reactivated customers',
    format: CustomerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Refresh',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_ADVOCACY_SCORE]: {
    label: 'Customer Advocacy Score',
    description: 'Customer advocacy and promotion score',
    format: CustomerAnalyticsMetricFormat.SCORE,
    icon: 'Shield',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [CustomerAnalyticsMetric.CUSTOMER_TRUST_SCORE]: {
    label: 'Customer Trust Score',
    description: 'Customer trust and confidence score',
    format: CustomerAnalyticsMetricFormat.SCORE,
    icon: 'ShieldCheck',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
};

/**
 * Get customer metric category
 */
export function getCustomerMetricCategory(
  metric: CustomerAnalyticsMetric
): CustomerAnalyticsMetricType {
  return CUSTOMER_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get customer metric label
 */
export function getCustomerMetricLabel(metric: CustomerAnalyticsMetric): string {
  return CUSTOMER_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get customer metric description
 */
export function getCustomerMetricDescription(metric: CustomerAnalyticsMetric): string {
  return CUSTOMER_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get customer metric format
 */
export function getCustomerMetricFormat(
  metric: CustomerAnalyticsMetric
): CustomerAnalyticsMetricFormat {
  return CUSTOMER_ANALYTICS_METRIC_CONFIG[metric]?.format || CustomerAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if customer metric is reversed (lower is better)
 */
export function isCustomerMetricReversed(metric: CustomerAnalyticsMetric): boolean {
  return CUSTOMER_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get customer metrics by category
 */
export function getCustomerMetricsByCategory(
  category: CustomerAnalyticsMetricType
): CustomerAnalyticsMetric[] {
  return Object.entries(CUSTOMER_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as CustomerAnalyticsMetric);
}

/**
 * Format customer metric value
 */
export function formatCustomerMetricValue(metric: CustomerAnalyticsMetric, value: number): string {
  const format = getCustomerMetricFormat(metric);

  switch (format) {
    case CustomerAnalyticsMetricFormat.CURRENCY:
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
      }
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}K`;
      }
      return `$${value.toFixed(2)}`;
    case CustomerAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case CustomerAnalyticsMetricFormat.TIME:
      if (value >= 365) {
        const years = Math.floor(value / 365);
        const days = Math.round(value % 365);
        return `${years}y ${days}d`;
      }
      if (value >= 24) {
        const days = Math.floor(value / 24);
        const hours = Math.round(value % 24);
        return `${days}d ${hours}h`;
      }
      return `${Math.round(value)} hours`;
    case CustomerAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case CustomerAnalyticsMetricFormat.RATING:
      return value.toFixed(1);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get customer metric priority
 */
export function getCustomerMetricPriority(metric: CustomerAnalyticsMetric): number {
  return CUSTOMER_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority customer metrics
 */
export function getHighPriorityCustomerMetrics(): CustomerAnalyticsMetric[] {
  return Object.values(CustomerAnalyticsMetric).filter(
    (metric) => getCustomerMetricPriority(metric) === 1
  );
}

/**
 * Get customer metric thresholds
 */
export function getCustomerMetricThreshold(
  metric: CustomerAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return CUSTOMER_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate customer metric performance
 */
export function evaluateCustomerMetricPerformance(
  metric: CustomerAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getCustomerMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isCustomerMetricReversed(metric);

  if (isReversed) {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.average) return 'average';
    return 'poor';
  } else {
    if (value >= threshold.good) return 'good';
    if (value >= threshold.average) return 'average';
    return 'poor';
  }
}

/**
 * Customer dashboard metrics
 */
export const CUSTOMER_DASHBOARD_METRICS: CustomerAnalyticsMetric[] = [
  CustomerAnalyticsMetric.TOTAL_CUSTOMERS,
  CustomerAnalyticsMetric.ACTIVE_CUSTOMERS,
  CustomerAnalyticsMetric.NEW_CUSTOMERS,
  CustomerAnalyticsMetric.CUSTOMER_LIFETIME_VALUE,
  CustomerAnalyticsMetric.CUSTOMER_RETENTION_RATE,
  CustomerAnalyticsMetric.CUSTOMER_CHURN_RATE,
  CustomerAnalyticsMetric.CUSTOMER_SATISFACTION_SCORE,
  CustomerAnalyticsMetric.NET_PROMOTER_SCORE,
  CustomerAnalyticsMetric.REPEAT_PURCHASE_RATE,
];

/**
 * Customer value metrics
 */
export const CUSTOMER_VALUE_METRICS: CustomerAnalyticsMetric[] = [
  CustomerAnalyticsMetric.CUSTOMER_LIFETIME_VALUE,
  CustomerAnalyticsMetric.CUSTOMER_ACQUISITION_COST,
  CustomerAnalyticsMetric.AVERAGE_ORDER_VALUE_PER_CUSTOMER,
  CustomerAnalyticsMetric.AVERAGE_ORDER_FREQUENCY,
  CustomerAnalyticsMetric.REPEAT_PURCHASE_RATE,
];

/**
 * Customer satisfaction metrics
 */
export const CUSTOMER_SATISFACTION_METRICS: CustomerAnalyticsMetric[] = [
  CustomerAnalyticsMetric.CUSTOMER_SATISFACTION_SCORE,
  CustomerAnalyticsMetric.NET_PROMOTER_SCORE,
  CustomerAnalyticsMetric.CUSTOMER_COMPLAINT_RATE,
  CustomerAnalyticsMetric.CUSTOMER_FIRST_CONTACT_RESOLUTION,
  CustomerAnalyticsMetric.CUSTOMER_RESOLUTION_TIME,
];

/**
 * Customer engagement metrics
 */
export const CUSTOMER_ENGAGEMENT_METRICS: CustomerAnalyticsMetric[] = [
  CustomerAnalyticsMetric.CUSTOMER_ENGAGEMENT_SCORE,
  CustomerAnalyticsMetric.CUSTOMER_LOYALTY_SCORE,
  CustomerAnalyticsMetric.CUSTOMER_REFERRAL_RATE,
  CustomerAnalyticsMetric.CUSTOMER_REVIEW_RATE,
  CustomerAnalyticsMetric.CUSTOMER_SOCIAL_INFLUENCE_SCORE,
];

/**
 * Customer distribution metrics
 */
export const CUSTOMER_DISTRIBUTION_METRICS: CustomerAnalyticsMetric[] = [
  CustomerAnalyticsMetric.CUSTOMER_SEGMENT_DISTRIBUTION,
  CustomerAnalyticsMetric.CUSTOMER_GEOGRAPHIC_DISTRIBUTION,
  CustomerAnalyticsMetric.CUSTOMER_AGE_DISTRIBUTION,
  CustomerAnalyticsMetric.CUSTOMER_GENDER_DISTRIBUTION,
  CustomerAnalyticsMetric.CUSTOMER_INCOME_DISTRIBUTION,
  CustomerAnalyticsMetric.CUSTOMER_PREFERENCE_DISTRIBUTION,
];
