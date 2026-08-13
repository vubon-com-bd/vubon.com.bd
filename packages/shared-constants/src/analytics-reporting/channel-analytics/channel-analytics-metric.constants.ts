/**
 * @fileoverview Channel analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Channel analytics metrics
 */
export enum ChannelAnalyticsMetric {
  /** Channel revenue */
  CHANNEL_REVENUE = 'CHANNEL_REVENUE',
  /** Channel sales */
  CHANNEL_SALES = 'CHANNEL_SALES',
  /** Channel orders */
  CHANNEL_ORDERS = 'CHANNEL_ORDERS',
  /** Channel conversion rate percentage */
  CHANNEL_CONVERSION_RATE = 'CHANNEL_CONVERSION_RATE',
  /** Channel cost per acquisition */
  CHANNEL_CPA = 'CHANNEL_CPA',
  /** Channel return on investment percentage */
  CHANNEL_ROI = 'CHANNEL_ROI',
  /** Channel customer count */
  CHANNEL_CUSTOMER_COUNT = 'CHANNEL_CUSTOMER_COUNT',
  /** Channel customer acquisition cost */
  CHANNEL_CUSTOMER_ACQUISITION_COST = 'CHANNEL_CUSTOMER_ACQUISITION_COST',
  /** Channel customer lifetime value */
  CHANNEL_CUSTOMER_LIFETIME_VALUE = 'CHANNEL_CUSTOMER_LIFETIME_VALUE',
  /** Channel market share percentage */
  CHANNEL_MARKET_SHARE = 'CHANNEL_MARKET_SHARE',
  /** Channel reach */
  CHANNEL_REACH = 'CHANNEL_REACH',
  /** Channel impressions */
  CHANNEL_IMPRESSIONS = 'CHANNEL_IMPRESSIONS',
  /** Channel engagement rate percentage */
  CHANNEL_ENGAGEMENT_RATE = 'CHANNEL_ENGAGEMENT_RATE',
  /** Channel click-through rate percentage */
  CHANNEL_CLICK_THROUGH_RATE = 'CHANNEL_CLICK_THROUGH_RATE',
  /** Channel bounce rate percentage */
  CHANNEL_BOUNCE_RATE = 'CHANNEL_BOUNCE_RATE',
  /** Channel retention rate percentage */
  CHANNEL_RETENTION_RATE = 'CHANNEL_RETENTION_RATE',
  /** Channel churn rate percentage */
  CHANNEL_CHURN_RATE = 'CHANNEL_CHURN_RATE',
  /** Channel satisfaction score */
  CHANNEL_SATISFACTION_SCORE = 'CHANNEL_SATISFACTION_SCORE',
  /** Channel attribution weight percentage */
  CHANNEL_ATTRIBUTION_WEIGHT = 'CHANNEL_ATTRIBUTION_WEIGHT',
  /** Channel cost per order */
  CHANNEL_COST_PER_ORDER = 'CHANNEL_COST_PER_ORDER',
  /** Channel profit margin percentage */
  CHANNEL_PROFIT_MARGIN = 'CHANNEL_PROFIT_MARGIN',
  /** Channel growth rate percentage */
  CHANNEL_GROWTH_RATE = 'CHANNEL_GROWTH_RATE',
  /** Channel penetration rate percentage */
  CHANNEL_PENETRATION_RATE = 'CHANNEL_PENETRATION_RATE',
  /** Channel frequency */
  CHANNEL_FREQUENCY = 'CHANNEL_FREQUENCY',
  /** Channel recency in days */
  CHANNEL_RECENCY = 'CHANNEL_RECENCY',
  /** Channel seasonality index */
  CHANNEL_SEASONALITY_INDEX = 'CHANNEL_SEASONALITY_INDEX',
  /** Channel peak performance hours */
  CHANNEL_PEAK_PERFORMANCE_HOURS = 'CHANNEL_PEAK_PERFORMANCE_HOURS',
  /** Channel peak performance days */
  CHANNEL_PEAK_PERFORMANCE_DAYS = 'CHANNEL_PEAK_PERFORMANCE_DAYS',
  /** Channel share of voice */
  CHANNEL_SHARE_OF_VOICE = 'CHANNEL_SHARE_OF_VOICE',
  /** Channel influence score */
  CHANNEL_INFLUENCE_SCORE = 'CHANNEL_INFLUENCE_SCORE',
  /** Channel synergy score */
  CHANNEL_SYNERGY_SCORE = 'CHANNEL_SYNERGY_SCORE',
  /** Channel efficiency ratio */
  CHANNEL_EFFICIENCY_RATIO = 'CHANNEL_EFFICIENCY_RATIO',
}

/**
 * Channel metric type classification
 */
export enum ChannelAnalyticsMetricType {
  /** Revenue metrics */
  REVENUE = 'REVENUE',
  /** Rate metrics */
  RATE = 'RATE',
  /** Customer metrics */
  CUSTOMER = 'CUSTOMER',
  /** Performance metrics */
  PERFORMANCE = 'PERFORMANCE',
  /** Engagement metrics */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Growth metrics */
  GROWTH = 'GROWTH',
  /** Financial metrics */
  FINANCIAL = 'FINANCIAL',
}

/**
 * Channel metric category mapping
 */
export const CHANNEL_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  ChannelAnalyticsMetric,
  ChannelAnalyticsMetricType
> = {
  [ChannelAnalyticsMetric.CHANNEL_REVENUE]: ChannelAnalyticsMetricType.REVENUE,
  [ChannelAnalyticsMetric.CHANNEL_SALES]: ChannelAnalyticsMetricType.REVENUE,
  [ChannelAnalyticsMetric.CHANNEL_ORDERS]: ChannelAnalyticsMetricType.REVENUE,
  [ChannelAnalyticsMetric.CHANNEL_CONVERSION_RATE]: ChannelAnalyticsMetricType.RATE,
  [ChannelAnalyticsMetric.CHANNEL_CPA]: ChannelAnalyticsMetricType.FINANCIAL,
  [ChannelAnalyticsMetric.CHANNEL_ROI]: ChannelAnalyticsMetricType.FINANCIAL,
  [ChannelAnalyticsMetric.CHANNEL_CUSTOMER_COUNT]: ChannelAnalyticsMetricType.CUSTOMER,
  [ChannelAnalyticsMetric.CHANNEL_CUSTOMER_ACQUISITION_COST]: ChannelAnalyticsMetricType.FINANCIAL,
  [ChannelAnalyticsMetric.CHANNEL_CUSTOMER_LIFETIME_VALUE]: ChannelAnalyticsMetricType.CUSTOMER,
  [ChannelAnalyticsMetric.CHANNEL_MARKET_SHARE]: ChannelAnalyticsMetricType.PERFORMANCE,
  [ChannelAnalyticsMetric.CHANNEL_REACH]: ChannelAnalyticsMetricType.ENGAGEMENT,
  [ChannelAnalyticsMetric.CHANNEL_IMPRESSIONS]: ChannelAnalyticsMetricType.ENGAGEMENT,
  [ChannelAnalyticsMetric.CHANNEL_ENGAGEMENT_RATE]: ChannelAnalyticsMetricType.ENGAGEMENT,
  [ChannelAnalyticsMetric.CHANNEL_CLICK_THROUGH_RATE]: ChannelAnalyticsMetricType.ENGAGEMENT,
  [ChannelAnalyticsMetric.CHANNEL_BOUNCE_RATE]: ChannelAnalyticsMetricType.ENGAGEMENT,
  [ChannelAnalyticsMetric.CHANNEL_RETENTION_RATE]: ChannelAnalyticsMetricType.CUSTOMER,
  [ChannelAnalyticsMetric.CHANNEL_CHURN_RATE]: ChannelAnalyticsMetricType.CUSTOMER,
  [ChannelAnalyticsMetric.CHANNEL_SATISFACTION_SCORE]: ChannelAnalyticsMetricType.PERFORMANCE,
  [ChannelAnalyticsMetric.CHANNEL_ATTRIBUTION_WEIGHT]: ChannelAnalyticsMetricType.PERFORMANCE,
  [ChannelAnalyticsMetric.CHANNEL_COST_PER_ORDER]: ChannelAnalyticsMetricType.FINANCIAL,
  [ChannelAnalyticsMetric.CHANNEL_PROFIT_MARGIN]: ChannelAnalyticsMetricType.FINANCIAL,
  [ChannelAnalyticsMetric.CHANNEL_GROWTH_RATE]: ChannelAnalyticsMetricType.GROWTH,
  [ChannelAnalyticsMetric.CHANNEL_PENETRATION_RATE]: ChannelAnalyticsMetricType.GROWTH,
  [ChannelAnalyticsMetric.CHANNEL_FREQUENCY]: ChannelAnalyticsMetricType.PERFORMANCE,
  [ChannelAnalyticsMetric.CHANNEL_RECENCY]: ChannelAnalyticsMetricType.PERFORMANCE,
  [ChannelAnalyticsMetric.CHANNEL_SEASONALITY_INDEX]: ChannelAnalyticsMetricType.GROWTH,
  [ChannelAnalyticsMetric.CHANNEL_PEAK_PERFORMANCE_HOURS]: ChannelAnalyticsMetricType.PERFORMANCE,
  [ChannelAnalyticsMetric.CHANNEL_PEAK_PERFORMANCE_DAYS]: ChannelAnalyticsMetricType.PERFORMANCE,
  [ChannelAnalyticsMetric.CHANNEL_SHARE_OF_VOICE]: ChannelAnalyticsMetricType.PERFORMANCE,
  [ChannelAnalyticsMetric.CHANNEL_INFLUENCE_SCORE]: ChannelAnalyticsMetricType.PERFORMANCE,
  [ChannelAnalyticsMetric.CHANNEL_SYNERGY_SCORE]: ChannelAnalyticsMetricType.PERFORMANCE,
  [ChannelAnalyticsMetric.CHANNEL_EFFICIENCY_RATIO]: ChannelAnalyticsMetricType.FINANCIAL,
};

/**
 * Channel metric format type
 */
export enum ChannelAnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Score format (0-100) */
  SCORE = 'SCORE',
  /** Time format (hours) */
  TIME = 'TIME',
  /** Ratio format */
  RATIO = 'RATIO',
}

/**
 * Channel metric configuration
 */
export interface ChannelAnalyticsMetricConfig {
  label: string;
  description: string;
  format: ChannelAnalyticsMetricFormat;
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

export const CHANNEL_ANALYTICS_METRIC_CONFIG: Record<
  ChannelAnalyticsMetric,
  ChannelAnalyticsMetricConfig
> = {
  [ChannelAnalyticsMetric.CHANNEL_REVENUE]: {
    label: 'Channel Revenue',
    description: 'Total revenue generated by channel',
    format: ChannelAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [ChannelAnalyticsMetric.CHANNEL_SALES]: {
    label: 'Channel Sales',
    description: 'Total sales through channel',
    format: ChannelAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [ChannelAnalyticsMetric.CHANNEL_ORDERS]: {
    label: 'Channel Orders',
    description: 'Number of orders through channel',
    format: ChannelAnalyticsMetricFormat.NUMBER,
    icon: 'ShoppingBag',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_CONVERSION_RATE]: {
    label: 'Channel Conversion Rate',
    description: 'Conversion rate for channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 0.05,
      average: 0.03,
      poor: 0.01,
    },
  },
  [ChannelAnalyticsMetric.CHANNEL_CPA]: {
    label: 'Channel CPA',
    description: 'Cost per acquisition for channel',
    format: ChannelAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
  },
  [ChannelAnalyticsMetric.CHANNEL_ROI]: {
    label: 'Channel ROI',
    description: 'Return on investment for channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 30,
      average: 20,
      poor: 10,
    },
  },
  [ChannelAnalyticsMetric.CHANNEL_CUSTOMER_COUNT]: {
    label: 'Channel Customer Count',
    description: 'Number of customers from channel',
    format: ChannelAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_CUSTOMER_ACQUISITION_COST]: {
    label: 'Channel CAC',
    description: 'Customer acquisition cost for channel',
    format: ChannelAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
  },
  [ChannelAnalyticsMetric.CHANNEL_CUSTOMER_LIFETIME_VALUE]: {
    label: 'Channel CLV',
    description: 'Customer lifetime value for channel',
    format: ChannelAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [ChannelAnalyticsMetric.CHANNEL_MARKET_SHARE]: {
    label: 'Channel Market Share',
    description: 'Market share of channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'PieChart',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_REACH]: {
    label: 'Channel Reach',
    description: 'Total reach of channel',
    format: ChannelAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_IMPRESSIONS]: {
    label: 'Channel Impressions',
    description: 'Total impressions from channel',
    format: ChannelAnalyticsMetricFormat.NUMBER,
    icon: 'Eye',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_ENGAGEMENT_RATE]: {
    label: 'Channel Engagement Rate',
    description: 'Engagement rate for channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Activity',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_CLICK_THROUGH_RATE]: {
    label: 'Channel CTR',
    description: 'Click-through rate for channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MousePointerClick',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_BOUNCE_RATE]: {
    label: 'Channel Bounce Rate',
    description: 'Bounce rate for channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingDown',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_RETENTION_RATE]: {
    label: 'Channel Retention Rate',
    description: 'Customer retention rate for channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 70,
      average: 55,
      poor: 40,
    },
  },
  [ChannelAnalyticsMetric.CHANNEL_CHURN_RATE]: {
    label: 'Channel Churn Rate',
    description: 'Customer churn rate for channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserX',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 10,
      average: 20,
      poor: 30,
    },
  },
  [ChannelAnalyticsMetric.CHANNEL_SATISFACTION_SCORE]: {
    label: 'Channel Satisfaction Score',
    description: 'Customer satisfaction score for channel',
    format: ChannelAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_ATTRIBUTION_WEIGHT]: {
    label: 'Channel Attribution Weight',
    description: 'Attribution weight for channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'PieChart',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_COST_PER_ORDER]: {
    label: 'Channel Cost Per Order',
    description: 'Cost per order for channel',
    format: ChannelAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_PROFIT_MARGIN]: {
    label: 'Channel Profit Margin',
    description: 'Profit margin for channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 25,
      average: 15,
      poor: 5,
    },
  },
  [ChannelAnalyticsMetric.CHANNEL_GROWTH_RATE]: {
    label: 'Channel Growth Rate',
    description: 'Growth rate of channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 15,
      average: 10,
      poor: 5,
    },
  },
  [ChannelAnalyticsMetric.CHANNEL_PENETRATION_RATE]: {
    label: 'Channel Penetration Rate',
    description: 'Market penetration rate of channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Target',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_FREQUENCY]: {
    label: 'Channel Frequency',
    description: 'Frequency of channel usage',
    format: ChannelAnalyticsMetricFormat.NUMBER,
    icon: 'Repeat',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_RECENCY]: {
    label: 'Channel Recency',
    description: 'Recency of channel usage in days',
    format: ChannelAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_SEASONALITY_INDEX]: {
    label: 'Channel Seasonality Index',
    description: 'Seasonality index for channel',
    format: ChannelAnalyticsMetricFormat.RATIO,
    icon: 'Calendar',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_PEAK_PERFORMANCE_HOURS]: {
    label: 'Peak Performance Hours',
    description: 'Hours of peak performance for channel',
    format: ChannelAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_PEAK_PERFORMANCE_DAYS]: {
    label: 'Peak Performance Days',
    description: 'Days of peak performance for channel',
    format: ChannelAnalyticsMetricFormat.NUMBER,
    icon: 'Calendar',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_SHARE_OF_VOICE]: {
    label: 'Channel Share of Voice',
    description: 'Share of voice for channel',
    format: ChannelAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Volume2',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_INFLUENCE_SCORE]: {
    label: 'Channel Influence Score',
    description: 'Influence score of channel',
    format: ChannelAnalyticsMetricFormat.SCORE,
    icon: 'Activity',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_SYNERGY_SCORE]: {
    label: 'Channel Synergy Score',
    description: 'Synergy score of channel with other channels',
    format: ChannelAnalyticsMetricFormat.SCORE,
    icon: 'Layers',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [ChannelAnalyticsMetric.CHANNEL_EFFICIENCY_RATIO]: {
    label: 'Channel Efficiency Ratio',
    description: 'Efficiency ratio of channel',
    format: ChannelAnalyticsMetricFormat.RATIO,
    icon: 'Gauge',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
};

/**
 * Get channel metric category
 */
export function getChannelMetricCategory(
  metric: ChannelAnalyticsMetric
): ChannelAnalyticsMetricType {
  return CHANNEL_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get channel metric label
 */
export function getChannelMetricLabel(metric: ChannelAnalyticsMetric): string {
  return CHANNEL_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get channel metric description
 */
export function getChannelMetricDescription(metric: ChannelAnalyticsMetric): string {
  return CHANNEL_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get channel metric format
 */
export function getChannelMetricFormat(
  metric: ChannelAnalyticsMetric
): ChannelAnalyticsMetricFormat {
  return CHANNEL_ANALYTICS_METRIC_CONFIG[metric]?.format || ChannelAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if channel metric is reversed (lower is better)
 */
export function isChannelMetricReversed(metric: ChannelAnalyticsMetric): boolean {
  return CHANNEL_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get channel metrics by category
 */
export function getChannelMetricsByCategory(
  category: ChannelAnalyticsMetricType
): ChannelAnalyticsMetric[] {
  return Object.entries(CHANNEL_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as ChannelAnalyticsMetric);
}

/**
 * Format channel metric value
 */
export function formatChannelMetricValue(metric: ChannelAnalyticsMetric, value: number): string {
  const format = getChannelMetricFormat(metric);

  switch (format) {
    case ChannelAnalyticsMetricFormat.CURRENCY:
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
      }
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}K`;
      }
      return `$${value.toFixed(2)}`;
    case ChannelAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case ChannelAnalyticsMetricFormat.TIME:
      if (value >= 24) {
        const days = Math.floor(value / 24);
        const hours = Math.round(value % 24);
        return `${days}d ${hours}h`;
      }
      return `${Math.round(value)} hours`;
    case ChannelAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case ChannelAnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get channel metric priority
 */
export function getChannelMetricPriority(metric: ChannelAnalyticsMetric): number {
  return CHANNEL_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority channel metrics
 */
export function getHighPriorityChannelMetrics(): ChannelAnalyticsMetric[] {
  return Object.values(ChannelAnalyticsMetric).filter(
    (metric) => getChannelMetricPriority(metric) === 1
  );
}

/**
 * Get channel metric thresholds
 */
export function getChannelMetricThreshold(
  metric: ChannelAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return CHANNEL_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate channel metric performance
 */
export function evaluateChannelMetricPerformance(
  metric: ChannelAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getChannelMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isChannelMetricReversed(metric);

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
 * Channel dashboard metrics
 */
export const CHANNEL_DASHBOARD_METRICS: ChannelAnalyticsMetric[] = [
  ChannelAnalyticsMetric.CHANNEL_REVENUE,
  ChannelAnalyticsMetric.CHANNEL_CONVERSION_RATE,
  ChannelAnalyticsMetric.CHANNEL_ROI,
  ChannelAnalyticsMetric.CHANNEL_CUSTOMER_COUNT,
  ChannelAnalyticsMetric.CHANNEL_RETENTION_RATE,
  ChannelAnalyticsMetric.CHANNEL_CHURN_RATE,
  ChannelAnalyticsMetric.CHANNEL_GROWTH_RATE,
  ChannelAnalyticsMetric.CHANNEL_PROFIT_MARGIN,
];

/**
 * Channel revenue metrics
 */
export const CHANNEL_REVENUE_METRICS: ChannelAnalyticsMetric[] = [
  ChannelAnalyticsMetric.CHANNEL_REVENUE,
  ChannelAnalyticsMetric.CHANNEL_SALES,
  ChannelAnalyticsMetric.CHANNEL_ORDERS,
  ChannelAnalyticsMetric.CHANNEL_COST_PER_ORDER,
  ChannelAnalyticsMetric.CHANNEL_PROFIT_MARGIN,
  ChannelAnalyticsMetric.CHANNEL_EFFICIENCY_RATIO,
];

/**
 * Channel customer metrics
 */
export const CHANNEL_CUSTOMER_METRICS: ChannelAnalyticsMetric[] = [
  ChannelAnalyticsMetric.CHANNEL_CUSTOMER_COUNT,
  ChannelAnalyticsMetric.CHANNEL_CUSTOMER_ACQUISITION_COST,
  ChannelAnalyticsMetric.CHANNEL_CUSTOMER_LIFETIME_VALUE,
  ChannelAnalyticsMetric.CHANNEL_RETENTION_RATE,
  ChannelAnalyticsMetric.CHANNEL_CHURN_RATE,
  ChannelAnalyticsMetric.CHANNEL_SATISFACTION_SCORE,
];

/**
 * Channel engagement metrics
 */
export const CHANNEL_ENGAGEMENT_METRICS: ChannelAnalyticsMetric[] = [
  ChannelAnalyticsMetric.CHANNEL_REACH,
  ChannelAnalyticsMetric.CHANNEL_IMPRESSIONS,
  ChannelAnalyticsMetric.CHANNEL_ENGAGEMENT_RATE,
  ChannelAnalyticsMetric.CHANNEL_CLICK_THROUGH_RATE,
  ChannelAnalyticsMetric.CHANNEL_BOUNCE_RATE,
  ChannelAnalyticsMetric.CHANNEL_FREQUENCY,
  ChannelAnalyticsMetric.CHANNEL_RECENCY,
];

/**
 * Channel performance metrics
 */
export const CHANNEL_PERFORMANCE_METRICS: ChannelAnalyticsMetric[] = [
  ChannelAnalyticsMetric.CHANNEL_CONVERSION_RATE,
  ChannelAnalyticsMetric.CHANNEL_CPA,
  ChannelAnalyticsMetric.CHANNEL_ROI,
  ChannelAnalyticsMetric.CHANNEL_MARKET_SHARE,
  ChannelAnalyticsMetric.CHANNEL_ATTRIBUTION_WEIGHT,
  ChannelAnalyticsMetric.CHANNEL_INFLUENCE_SCORE,
  ChannelAnalyticsMetric.CHANNEL_SYNERGY_SCORE,
];
