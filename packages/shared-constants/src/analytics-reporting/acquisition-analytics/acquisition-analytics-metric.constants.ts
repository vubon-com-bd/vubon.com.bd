/**
 * @fileoverview Acquisition analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Acquisition analytics metrics
 */
export enum AcquisitionAnalyticsMetric {
  /** Total number of leads */
  TOTAL_LEADS = 'TOTAL_LEADS',
  /** Qualified leads */
  QUALIFIED_LEADS = 'QUALIFIED_LEADS',
  /** Marketing qualified leads */
  MARKETING_QUALIFIED_LEADS = 'MARKETING_QUALIFIED_LEADS',
  /** Sales qualified leads */
  SALES_QUALIFIED_LEADS = 'SALES_QUALIFIED_LEADS',
  /** Conversion rate percentage */
  CONVERSION_RATE = 'CONVERSION_RATE',
  /** Lead to customer rate percentage */
  LEAD_TO_CUSTOMER_RATE = 'LEAD_TO_CUSTOMER_RATE',
  /** Customer acquisition cost */
  CUSTOMER_ACQUISITION_COST = 'CUSTOMER_ACQUISITION_COST',
  /** Cost per lead */
  COST_PER_LEAD = 'COST_PER_LEAD',
  /** Cost per conversion */
  COST_PER_CONVERSION = 'COST_PER_CONVERSION',
  /** Acquisition ROI percentage */
  ACQUISITION_ROI = 'ACQUISITION_ROI',
  /** Funnel conversion rates */
  FUNNEL_CONVERSION_RATES = 'FUNNEL_CONVERSION_RATES',
  /** Landing page conversion rate percentage */
  LANDING_PAGE_CONVERSION_RATE = 'LANDING_PAGE_CONVERSION_RATE',
  /** Form completion rate percentage */
  FORM_COMPLETION_RATE = 'FORM_COMPLETION_RATE',
  /** Bounce rate from landing page percentage */
  BOUNCE_RATE_FROM_LANDING = 'BOUNCE_RATE_FROM_LANDING',
  /** Exit rate from landing page percentage */
  EXIT_RATE_FROM_LANDING = 'EXIT_RATE_FROM_LANDING',
  /** Time to conversion in hours */
  TIME_TO_CONVERSION = 'TIME_TO_CONVERSION',
  /** Click-through rate percentage */
  CLICK_THROUGH_RATE = 'CLICK_THROUGH_RATE',
  /** Impression to lead rate percentage */
  IMPRESSION_TO_LEAD_RATE = 'IMPRESSION_TO_LEAD_RATE',
  /** Lead to opportunity rate percentage */
  LEAD_TO_OPPORTUNITY_RATE = 'LEAD_TO_OPPORTUNITY_RATE',
  /** Opportunity to customer rate percentage */
  OPPORTUNITY_TO_CUSTOMER_RATE = 'OPPORTUNITY_TO_CUSTOMER_RATE',
  /** Channel acquisition distribution */
  CHANNEL_ACQUISITION_DISTRIBUTION = 'CHANNEL_ACQUISITION_DISTRIBUTION',
  /** Campaign performance score */
  CAMPAIGN_PERFORMANCE_SCORE = 'CAMPAIGN_PERFORMANCE_SCORE',
  /** Lead quality score */
  LEAD_QUALITY_SCORE = 'LEAD_QUALITY_SCORE',
  /** Acquisition velocity */
  ACQUISITION_VELOCITY = 'ACQUISITION_VELOCITY',
  /** Acquisition efficiency */
  ACQUISITION_EFFICIENCY = 'ACQUISITION_EFFICIENCY',
  /** Acquisition peak times */
  ACQUISITION_PEAK_TIMES = 'ACQUISITION_PEAK_TIMES',
  /** Acquisition seasonality */
  ACQUISITION_SEASONALITY = 'ACQUISITION_SEASONALITY',
  /** Acquisition growth rate percentage */
  ACQUISITION_GROWTH_RATE = 'ACQUISITION_GROWTH_RATE',
  /** Acquisition reach */
  ACQUISITION_REACH = 'ACQUISITION_REACH',
  /** Acquisition frequency */
  ACQUISITION_FREQUENCY = 'ACQUISITION_FREQUENCY',
  /** Lead conversion time in hours */
  LEAD_CONVERSION_TIME = 'LEAD_CONVERSION_TIME',
  /** Acquisition cost efficiency */
  ACQUISITION_COST_EFFICIENCY = 'ACQUISITION_COST_EFFICIENCY',
  /** Funnel abandonment rate */
  FUNNEL_ABANDONMENT_RATE = 'FUNNEL_ABANDONMENT_RATE',
  /** Multi-channel acquisition rate */
  MULTI_CHANNEL_ACQUISITION_RATE = 'MULTI_CHANNEL_ACQUISITION_RATE',
}

/**
 * Acquisition metric type classification
 */
export enum AcquisitionAnalyticsMetricType {
  /** Lead metrics */
  LEAD = 'LEAD',
  /** Conversion metrics */
  CONVERSION = 'CONVERSION',
  /** Cost metrics */
  COST = 'COST',
  /** Performance metrics */
  PERFORMANCE = 'PERFORMANCE',
  /** Efficiency metrics */
  EFFICIENCY = 'EFFICIENCY',
  /** Growth metrics */
  GROWTH = 'GROWTH',
  /** Distribution metrics */
  DISTRIBUTION = 'DISTRIBUTION',
}

/**
 * Acquisition metric category mapping
 */
export const ACQUISITION_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  AcquisitionAnalyticsMetric,
  AcquisitionAnalyticsMetricType
> = {
  [AcquisitionAnalyticsMetric.TOTAL_LEADS]: AcquisitionAnalyticsMetricType.LEAD,
  [AcquisitionAnalyticsMetric.QUALIFIED_LEADS]: AcquisitionAnalyticsMetricType.LEAD,
  [AcquisitionAnalyticsMetric.MARKETING_QUALIFIED_LEADS]: AcquisitionAnalyticsMetricType.LEAD,
  [AcquisitionAnalyticsMetric.SALES_QUALIFIED_LEADS]: AcquisitionAnalyticsMetricType.LEAD,
  [AcquisitionAnalyticsMetric.CONVERSION_RATE]: AcquisitionAnalyticsMetricType.CONVERSION,
  [AcquisitionAnalyticsMetric.LEAD_TO_CUSTOMER_RATE]: AcquisitionAnalyticsMetricType.CONVERSION,
  [AcquisitionAnalyticsMetric.CUSTOMER_ACQUISITION_COST]: AcquisitionAnalyticsMetricType.COST,
  [AcquisitionAnalyticsMetric.COST_PER_LEAD]: AcquisitionAnalyticsMetricType.COST,
  [AcquisitionAnalyticsMetric.COST_PER_CONVERSION]: AcquisitionAnalyticsMetricType.COST,
  [AcquisitionAnalyticsMetric.ACQUISITION_ROI]: AcquisitionAnalyticsMetricType.PERFORMANCE,
  [AcquisitionAnalyticsMetric.FUNNEL_CONVERSION_RATES]: AcquisitionAnalyticsMetricType.CONVERSION,
  [AcquisitionAnalyticsMetric.LANDING_PAGE_CONVERSION_RATE]:
    AcquisitionAnalyticsMetricType.CONVERSION,
  [AcquisitionAnalyticsMetric.FORM_COMPLETION_RATE]: AcquisitionAnalyticsMetricType.CONVERSION,
  [AcquisitionAnalyticsMetric.BOUNCE_RATE_FROM_LANDING]: AcquisitionAnalyticsMetricType.PERFORMANCE,
  [AcquisitionAnalyticsMetric.EXIT_RATE_FROM_LANDING]: AcquisitionAnalyticsMetricType.PERFORMANCE,
  [AcquisitionAnalyticsMetric.TIME_TO_CONVERSION]: AcquisitionAnalyticsMetricType.EFFICIENCY,
  [AcquisitionAnalyticsMetric.CLICK_THROUGH_RATE]: AcquisitionAnalyticsMetricType.PERFORMANCE,
  [AcquisitionAnalyticsMetric.IMPRESSION_TO_LEAD_RATE]: AcquisitionAnalyticsMetricType.CONVERSION,
  [AcquisitionAnalyticsMetric.LEAD_TO_OPPORTUNITY_RATE]: AcquisitionAnalyticsMetricType.CONVERSION,
  [AcquisitionAnalyticsMetric.OPPORTUNITY_TO_CUSTOMER_RATE]:
    AcquisitionAnalyticsMetricType.CONVERSION,
  [AcquisitionAnalyticsMetric.CHANNEL_ACQUISITION_DISTRIBUTION]:
    AcquisitionAnalyticsMetricType.DISTRIBUTION,
  [AcquisitionAnalyticsMetric.CAMPAIGN_PERFORMANCE_SCORE]:
    AcquisitionAnalyticsMetricType.PERFORMANCE,
  [AcquisitionAnalyticsMetric.LEAD_QUALITY_SCORE]: AcquisitionAnalyticsMetricType.LEAD,
  [AcquisitionAnalyticsMetric.ACQUISITION_VELOCITY]: AcquisitionAnalyticsMetricType.EFFICIENCY,
  [AcquisitionAnalyticsMetric.ACQUISITION_EFFICIENCY]: AcquisitionAnalyticsMetricType.EFFICIENCY,
  [AcquisitionAnalyticsMetric.ACQUISITION_PEAK_TIMES]: AcquisitionAnalyticsMetricType.PERFORMANCE,
  [AcquisitionAnalyticsMetric.ACQUISITION_SEASONALITY]: AcquisitionAnalyticsMetricType.GROWTH,
  [AcquisitionAnalyticsMetric.ACQUISITION_GROWTH_RATE]: AcquisitionAnalyticsMetricType.GROWTH,
  [AcquisitionAnalyticsMetric.ACQUISITION_REACH]: AcquisitionAnalyticsMetricType.PERFORMANCE,
  [AcquisitionAnalyticsMetric.ACQUISITION_FREQUENCY]: AcquisitionAnalyticsMetricType.PERFORMANCE,
  [AcquisitionAnalyticsMetric.LEAD_CONVERSION_TIME]: AcquisitionAnalyticsMetricType.EFFICIENCY,
  [AcquisitionAnalyticsMetric.ACQUISITION_COST_EFFICIENCY]:
    AcquisitionAnalyticsMetricType.EFFICIENCY,
  [AcquisitionAnalyticsMetric.FUNNEL_ABANDONMENT_RATE]: AcquisitionAnalyticsMetricType.CONVERSION,
  [AcquisitionAnalyticsMetric.MULTI_CHANNEL_ACQUISITION_RATE]:
    AcquisitionAnalyticsMetricType.PERFORMANCE,
};

/**
 * Acquisition metric format type
 */
export enum AcquisitionAnalyticsMetricFormat {
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
 * Acquisition metric configuration
 */
export interface AcquisitionAnalyticsMetricConfig {
  label: string;
  description: string;
  format: AcquisitionAnalyticsMetricFormat;
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

export const ACQUISITION_ANALYTICS_METRIC_CONFIG: Record<
  AcquisitionAnalyticsMetric,
  AcquisitionAnalyticsMetricConfig
> = {
  [AcquisitionAnalyticsMetric.TOTAL_LEADS]: {
    label: 'Total Leads',
    description: 'Total number of leads generated',
    format: AcquisitionAnalyticsMetricFormat.NUMBER,
    icon: 'UserPlus',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [AcquisitionAnalyticsMetric.QUALIFIED_LEADS]: {
    label: 'Qualified Leads',
    description: 'Number of qualified leads',
    format: AcquisitionAnalyticsMetricFormat.NUMBER,
    icon: 'UserCheck',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [AcquisitionAnalyticsMetric.MARKETING_QUALIFIED_LEADS]: {
    label: 'Marketing Qualified Leads',
    description: 'Number of marketing qualified leads',
    format: AcquisitionAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.SALES_QUALIFIED_LEADS]: {
    label: 'Sales Qualified Leads',
    description: 'Number of sales qualified leads',
    format: AcquisitionAnalyticsMetricFormat.NUMBER,
    icon: 'UserCheck',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.CONVERSION_RATE]: {
    label: 'Conversion Rate',
    description: 'Overall conversion rate',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
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
  [AcquisitionAnalyticsMetric.LEAD_TO_CUSTOMER_RATE]: {
    label: 'Lead to Customer Rate',
    description: 'Rate of leads becoming customers',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [AcquisitionAnalyticsMetric.CUSTOMER_ACQUISITION_COST]: {
    label: 'Customer Acquisition Cost',
    description: 'Cost to acquire a customer',
    format: AcquisitionAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
  },
  [AcquisitionAnalyticsMetric.COST_PER_LEAD]: {
    label: 'Cost Per Lead',
    description: 'Cost to generate a lead',
    format: AcquisitionAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#F97316',
    isReversed: true,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.COST_PER_CONVERSION]: {
    label: 'Cost Per Conversion',
    description: 'Cost per conversion',
    format: AcquisitionAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.ACQUISITION_ROI]: {
    label: 'Acquisition ROI',
    description: 'Return on investment for acquisition',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
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
  [AcquisitionAnalyticsMetric.FUNNEL_CONVERSION_RATES]: {
    label: 'Funnel Conversion Rates',
    description: 'Conversion rates at each funnel stage',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Filter',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.LANDING_PAGE_CONVERSION_RATE]: {
    label: 'Landing Page Conversion Rate',
    description: 'Conversion rate of landing pages',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'FileText',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.FORM_COMPLETION_RATE]: {
    label: 'Form Completion Rate',
    description: 'Rate of form completions',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'FormInput',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.BOUNCE_RATE_FROM_LANDING]: {
    label: 'Landing Page Bounce Rate',
    description: 'Bounce rate from landing pages',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingDown',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.EXIT_RATE_FROM_LANDING]: {
    label: 'Landing Page Exit Rate',
    description: 'Exit rate from landing pages',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'LogOut',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.TIME_TO_CONVERSION]: {
    label: 'Time to Conversion',
    description: 'Average time to conversion',
    format: AcquisitionAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.CLICK_THROUGH_RATE]: {
    label: 'Click-Through Rate',
    description: 'Click-through rate of campaigns',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MousePointerClick',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.IMPRESSION_TO_LEAD_RATE]: {
    label: 'Impression to Lead Rate',
    description: 'Rate of impressions becoming leads',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Eye',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.LEAD_TO_OPPORTUNITY_RATE]: {
    label: 'Lead to Opportunity Rate',
    description: 'Rate of leads becoming opportunities',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserPlus',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.OPPORTUNITY_TO_CUSTOMER_RATE]: {
    label: 'Opportunity to Customer Rate',
    description: 'Rate of opportunities becoming customers',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.CHANNEL_ACQUISITION_DISTRIBUTION]: {
    label: 'Channel Acquisition Distribution',
    description: 'Distribution of acquisitions by channel',
    format: AcquisitionAnalyticsMetricFormat.NUMBER,
    icon: 'PieChart',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.CAMPAIGN_PERFORMANCE_SCORE]: {
    label: 'Campaign Performance Score',
    description: 'Overall campaign performance score',
    format: AcquisitionAnalyticsMetricFormat.SCORE,
    icon: 'Megaphone',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.LEAD_QUALITY_SCORE]: {
    label: 'Lead Quality Score',
    description: 'Quality score of leads',
    format: AcquisitionAnalyticsMetricFormat.SCORE,
    icon: 'Shield',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.ACQUISITION_VELOCITY]: {
    label: 'Acquisition Velocity',
    description: 'Speed of acquisition process',
    format: AcquisitionAnalyticsMetricFormat.RATIO,
    icon: 'Zap',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.ACQUISITION_EFFICIENCY]: {
    label: 'Acquisition Efficiency',
    description: 'Efficiency of acquisition process',
    format: AcquisitionAnalyticsMetricFormat.RATIO,
    icon: 'Gauge',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.ACQUISITION_PEAK_TIMES]: {
    label: 'Acquisition Peak Times',
    description: 'Peak acquisition times',
    format: AcquisitionAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.ACQUISITION_SEASONALITY]: {
    label: 'Acquisition Seasonality',
    description: 'Seasonality of acquisition',
    format: AcquisitionAnalyticsMetricFormat.RATIO,
    icon: 'Calendar',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.ACQUISITION_GROWTH_RATE]: {
    label: 'Acquisition Growth Rate',
    description: 'Growth rate of acquisition',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 15,
      average: 10,
      poor: 5,
    },
  },
  [AcquisitionAnalyticsMetric.ACQUISITION_REACH]: {
    label: 'Acquisition Reach',
    description: 'Total reach of acquisition efforts',
    format: AcquisitionAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.ACQUISITION_FREQUENCY]: {
    label: 'Acquisition Frequency',
    description: 'Frequency of acquisitions',
    format: AcquisitionAnalyticsMetricFormat.NUMBER,
    icon: 'Repeat',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.LEAD_CONVERSION_TIME]: {
    label: 'Lead Conversion Time',
    description: 'Time from lead to conversion',
    format: AcquisitionAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.ACQUISITION_COST_EFFICIENCY]: {
    label: 'Acquisition Cost Efficiency',
    description: 'Cost efficiency of acquisition',
    format: AcquisitionAnalyticsMetricFormat.RATIO,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.FUNNEL_ABANDONMENT_RATE]: {
    label: 'Funnel Abandonment Rate',
    description: 'Rate of abandonment in funnel',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'XCircle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [AcquisitionAnalyticsMetric.MULTI_CHANNEL_ACQUISITION_RATE]: {
    label: 'Multi-Channel Acquisition Rate',
    description: 'Rate of multi-channel acquisitions',
    format: AcquisitionAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Layers',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
};

/**
 * Get acquisition metric category
 */
export function getAcquisitionMetricCategory(
  metric: AcquisitionAnalyticsMetric
): AcquisitionAnalyticsMetricType {
  return ACQUISITION_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get acquisition metric label
 */
export function getAcquisitionMetricLabel(metric: AcquisitionAnalyticsMetric): string {
  return ACQUISITION_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get acquisition metric description
 */
export function getAcquisitionMetricDescription(metric: AcquisitionAnalyticsMetric): string {
  return ACQUISITION_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get acquisition metric format
 */
export function getAcquisitionMetricFormat(
  metric: AcquisitionAnalyticsMetric
): AcquisitionAnalyticsMetricFormat {
  return (
    ACQUISITION_ANALYTICS_METRIC_CONFIG[metric]?.format || AcquisitionAnalyticsMetricFormat.NUMBER
  );
}

/**
 * Check if acquisition metric is reversed (lower is better)
 */
export function isAcquisitionMetricReversed(metric: AcquisitionAnalyticsMetric): boolean {
  return ACQUISITION_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get acquisition metrics by category
 */
export function getAcquisitionMetricsByCategory(
  category: AcquisitionAnalyticsMetricType
): AcquisitionAnalyticsMetric[] {
  return Object.entries(ACQUISITION_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as AcquisitionAnalyticsMetric);
}

/**
 * Format acquisition metric value
 */
export function formatAcquisitionMetricValue(
  metric: AcquisitionAnalyticsMetric,
  value: number
): string {
  const format = getAcquisitionMetricFormat(metric);

  switch (format) {
    case AcquisitionAnalyticsMetricFormat.CURRENCY:
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
      }
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}K`;
      }
      return `$${value.toFixed(2)}`;
    case AcquisitionAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case AcquisitionAnalyticsMetricFormat.TIME:
      if (value >= 24) {
        const days = Math.floor(value / 24);
        const hours = Math.round(value % 24);
        return `${days}d ${hours}h`;
      }
      return `${Math.round(value)} hours`;
    case AcquisitionAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case AcquisitionAnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get acquisition metric priority
 */
export function getAcquisitionMetricPriority(metric: AcquisitionAnalyticsMetric): number {
  return ACQUISITION_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority acquisition metrics
 */
export function getHighPriorityAcquisitionMetrics(): AcquisitionAnalyticsMetric[] {
  return Object.values(AcquisitionAnalyticsMetric).filter(
    (metric) => getAcquisitionMetricPriority(metric) === 1
  );
}

/**
 * Get acquisition metric thresholds
 */
export function getAcquisitionMetricThreshold(
  metric: AcquisitionAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return ACQUISITION_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate acquisition metric performance
 */
export function evaluateAcquisitionMetricPerformance(
  metric: AcquisitionAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getAcquisitionMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isAcquisitionMetricReversed(metric);

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
 * Acquisition dashboard metrics
 */
export const ACQUISITION_DASHBOARD_METRICS: AcquisitionAnalyticsMetric[] = [
  AcquisitionAnalyticsMetric.TOTAL_LEADS,
  AcquisitionAnalyticsMetric.QUALIFIED_LEADS,
  AcquisitionAnalyticsMetric.CONVERSION_RATE,
  AcquisitionAnalyticsMetric.CUSTOMER_ACQUISITION_COST,
  AcquisitionAnalyticsMetric.ACQUISITION_ROI,
  AcquisitionAnalyticsMetric.ACQUISITION_GROWTH_RATE,
  AcquisitionAnalyticsMetric.LEAD_TO_CUSTOMER_RATE,
  AcquisitionAnalyticsMetric.COST_PER_LEAD,
];

/**
 * Acquisition lead metrics
 */
export const ACQUISITION_LEAD_METRICS: AcquisitionAnalyticsMetric[] = [
  AcquisitionAnalyticsMetric.TOTAL_LEADS,
  AcquisitionAnalyticsMetric.QUALIFIED_LEADS,
  AcquisitionAnalyticsMetric.MARKETING_QUALIFIED_LEADS,
  AcquisitionAnalyticsMetric.SALES_QUALIFIED_LEADS,
  AcquisitionAnalyticsMetric.LEAD_QUALITY_SCORE,
  AcquisitionAnalyticsMetric.COST_PER_LEAD,
];

/**
 * Acquisition conversion metrics
 */
export const ACQUISITION_CONVERSION_METRICS: AcquisitionAnalyticsMetric[] = [
  AcquisitionAnalyticsMetric.CONVERSION_RATE,
  AcquisitionAnalyticsMetric.LEAD_TO_CUSTOMER_RATE,
  AcquisitionAnalyticsMetric.LANDING_PAGE_CONVERSION_RATE,
  AcquisitionAnalyticsMetric.FORM_COMPLETION_RATE,
  AcquisitionAnalyticsMetric.LEAD_TO_OPPORTUNITY_RATE,
  AcquisitionAnalyticsMetric.OPPORTUNITY_TO_CUSTOMER_RATE,
  AcquisitionAnalyticsMetric.FUNNEL_ABANDONMENT_RATE,
];

/**
 * Acquisition efficiency metrics
 */
export const ACQUISITION_EFFICIENCY_METRICS: AcquisitionAnalyticsMetric[] = [
  AcquisitionAnalyticsMetric.CUSTOMER_ACQUISITION_COST,
  AcquisitionAnalyticsMetric.COST_PER_CONVERSION,
  AcquisitionAnalyticsMetric.ACQUISITION_VELOCITY,
  AcquisitionAnalyticsMetric.ACQUISITION_EFFICIENCY,
  AcquisitionAnalyticsMetric.TIME_TO_CONVERSION,
  AcquisitionAnalyticsMetric.LEAD_CONVERSION_TIME,
  AcquisitionAnalyticsMetric.ACQUISITION_COST_EFFICIENCY,
];
