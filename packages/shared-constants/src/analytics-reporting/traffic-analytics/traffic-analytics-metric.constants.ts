/**
 * @fileoverview Traffic analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Traffic analytics metrics
 */
export enum TrafficAnalyticsMetric {
  /** Total number of visits */
  TOTAL_VISITS = 'TOTAL_VISITS',
  /** Unique visitors count */
  UNIQUE_VISITORS = 'UNIQUE_VISITORS',
  /** Total page views */
  PAGE_VIEWS = 'PAGE_VIEWS',
  /** Number of sessions */
  SESSIONS = 'SESSIONS',
  /** Bounce rate percentage */
  BOUNCE_RATE = 'BOUNCE_RATE',
  /** Average session duration in seconds */
  AVG_SESSION_DURATION = 'AVG_SESSION_DURATION',
  /** Pages per session */
  PAGES_PER_SESSION = 'PAGES_PER_SESSION',
  /** Exit rate percentage */
  EXIT_RATE = 'EXIT_RATE',
  /** Entrance rate percentage */
  ENTRANCE_RATE = 'ENTRANCE_RATE',
  /** New visitor rate percentage */
  NEW_VISITOR_RATE = 'NEW_VISITOR_RATE',
  /** Returning visitor rate percentage */
  RETURNING_VISITOR_RATE = 'RETURNING_VISITOR_RATE',
  /** Traffic source distribution */
  TRAFFIC_SOURCE_DISTRIBUTION = 'TRAFFIC_SOURCE_DISTRIBUTION',
  /** Referral domain distribution */
  REFERRAL_DOMAIN_DISTRIBUTION = 'REFERRAL_DOMAIN_DISTRIBUTION',
  /** Search engine distribution */
  SEARCH_ENGINE_DISTRIBUTION = 'SEARCH_ENGINE_DISTRIBUTION',
  /** Social platform distribution */
  SOCIAL_PLATFORM_DISTRIBUTION = 'SOCIAL_PLATFORM_DISTRIBUTION',
  /** Device distribution */
  DEVICE_DISTRIBUTION = 'DEVICE_DISTRIBUTION',
  /** Browser distribution */
  BROWSER_DISTRIBUTION = 'BROWSER_DISTRIBUTION',
  /** Operating system distribution */
  OS_DISTRIBUTION = 'OS_DISTRIBUTION',
  /** Location distribution */
  LOCATION_DISTRIBUTION = 'LOCATION_DISTRIBUTION',
  /** Peak traffic hours */
  PEAK_TRAFFIC_HOURS = 'PEAK_TRAFFIC_HOURS',
  /** Peak traffic days */
  PEAK_TRAFFIC_DAYS = 'PEAK_TRAFFIC_DAYS',
  /** Traffic growth rate percentage */
  TRAFFIC_GROWTH_RATE = 'TRAFFIC_GROWTH_RATE',
  /** Conversion rate by source */
  CONVERSION_RATE_BY_SOURCE = 'CONVERSION_RATE_BY_SOURCE',
  /** Bounce rate by source */
  BOUNCE_RATE_BY_SOURCE = 'BOUNCE_RATE_BY_SOURCE',
  /** Session duration by source */
  SESSION_DURATION_BY_SOURCE = 'SESSION_DURATION_BY_SOURCE',
  /** Average time on page */
  AVG_TIME_ON_PAGE = 'AVG_TIME_ON_PAGE',
  /** Event count */
  EVENT_COUNT = 'EVENT_COUNT',
  /** Click-through rate */
  CTR = 'CTR',
  /** Cost per session */
  COST_PER_SESSION = 'COST_PER_SESSION',
  /** Revenue per session */
  REVENUE_PER_SESSION = 'REVENUE_PER_SESSION',
  /** Traffic quality score */
  TRAFFIC_QUALITY_SCORE = 'TRAFFIC_QUALITY_SCORE',
}

/**
 * Traffic metric type classification
 */
export enum TrafficAnalyticsMetricType {
  /** Volume metrics */
  VOLUME = 'VOLUME',
  /** Engagement metrics */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Distribution metrics */
  DISTRIBUTION = 'DISTRIBUTION',
  /** Performance metrics */
  PERFORMANCE = 'PERFORMANCE',
  /** Growth metrics */
  GROWTH = 'GROWTH',
  /** Conversion metrics */
  CONVERSION = 'CONVERSION',
  /** Financial metrics */
  FINANCIAL = 'FINANCIAL',
}

/**
 * Traffic metric category mapping
 */
export const TRAFFIC_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  TrafficAnalyticsMetric,
  TrafficAnalyticsMetricType
> = {
  [TrafficAnalyticsMetric.TOTAL_VISITS]: TrafficAnalyticsMetricType.VOLUME,
  [TrafficAnalyticsMetric.UNIQUE_VISITORS]: TrafficAnalyticsMetricType.VOLUME,
  [TrafficAnalyticsMetric.PAGE_VIEWS]: TrafficAnalyticsMetricType.VOLUME,
  [TrafficAnalyticsMetric.SESSIONS]: TrafficAnalyticsMetricType.VOLUME,
  [TrafficAnalyticsMetric.BOUNCE_RATE]: TrafficAnalyticsMetricType.ENGAGEMENT,
  [TrafficAnalyticsMetric.AVG_SESSION_DURATION]: TrafficAnalyticsMetricType.ENGAGEMENT,
  [TrafficAnalyticsMetric.PAGES_PER_SESSION]: TrafficAnalyticsMetricType.ENGAGEMENT,
  [TrafficAnalyticsMetric.EXIT_RATE]: TrafficAnalyticsMetricType.ENGAGEMENT,
  [TrafficAnalyticsMetric.ENTRANCE_RATE]: TrafficAnalyticsMetricType.ENGAGEMENT,
  [TrafficAnalyticsMetric.NEW_VISITOR_RATE]: TrafficAnalyticsMetricType.PERFORMANCE,
  [TrafficAnalyticsMetric.RETURNING_VISITOR_RATE]: TrafficAnalyticsMetricType.PERFORMANCE,
  [TrafficAnalyticsMetric.TRAFFIC_SOURCE_DISTRIBUTION]: TrafficAnalyticsMetricType.DISTRIBUTION,
  [TrafficAnalyticsMetric.REFERRAL_DOMAIN_DISTRIBUTION]: TrafficAnalyticsMetricType.DISTRIBUTION,
  [TrafficAnalyticsMetric.SEARCH_ENGINE_DISTRIBUTION]: TrafficAnalyticsMetricType.DISTRIBUTION,
  [TrafficAnalyticsMetric.SOCIAL_PLATFORM_DISTRIBUTION]: TrafficAnalyticsMetricType.DISTRIBUTION,
  [TrafficAnalyticsMetric.DEVICE_DISTRIBUTION]: TrafficAnalyticsMetricType.DISTRIBUTION,
  [TrafficAnalyticsMetric.BROWSER_DISTRIBUTION]: TrafficAnalyticsMetricType.DISTRIBUTION,
  [TrafficAnalyticsMetric.OS_DISTRIBUTION]: TrafficAnalyticsMetricType.DISTRIBUTION,
  [TrafficAnalyticsMetric.LOCATION_DISTRIBUTION]: TrafficAnalyticsMetricType.DISTRIBUTION,
  [TrafficAnalyticsMetric.PEAK_TRAFFIC_HOURS]: TrafficAnalyticsMetricType.PERFORMANCE,
  [TrafficAnalyticsMetric.PEAK_TRAFFIC_DAYS]: TrafficAnalyticsMetricType.PERFORMANCE,
  [TrafficAnalyticsMetric.TRAFFIC_GROWTH_RATE]: TrafficAnalyticsMetricType.GROWTH,
  [TrafficAnalyticsMetric.CONVERSION_RATE_BY_SOURCE]: TrafficAnalyticsMetricType.CONVERSION,
  [TrafficAnalyticsMetric.BOUNCE_RATE_BY_SOURCE]: TrafficAnalyticsMetricType.PERFORMANCE,
  [TrafficAnalyticsMetric.SESSION_DURATION_BY_SOURCE]: TrafficAnalyticsMetricType.PERFORMANCE,
  [TrafficAnalyticsMetric.AVG_TIME_ON_PAGE]: TrafficAnalyticsMetricType.ENGAGEMENT,
  [TrafficAnalyticsMetric.EVENT_COUNT]: TrafficAnalyticsMetricType.VOLUME,
  [TrafficAnalyticsMetric.CTR]: TrafficAnalyticsMetricType.CONVERSION,
  [TrafficAnalyticsMetric.COST_PER_SESSION]: TrafficAnalyticsMetricType.FINANCIAL,
  [TrafficAnalyticsMetric.REVENUE_PER_SESSION]: TrafficAnalyticsMetricType.FINANCIAL,
  [TrafficAnalyticsMetric.TRAFFIC_QUALITY_SCORE]: TrafficAnalyticsMetricType.PERFORMANCE,
};

/**
 * Traffic metric format type
 */
export enum TrafficAnalyticsMetricFormat {
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Time format (seconds) */
  TIME = 'TIME',
  /** Score format */
  SCORE = 'SCORE',
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Ratio format */
  RATIO = 'RATIO',
}

/**
 * Traffic metric configuration
 */
export interface TrafficAnalyticsMetricConfig {
  label: string;
  description: string;
  format: TrafficAnalyticsMetricFormat;
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

export const TRAFFIC_ANALYTICS_METRIC_CONFIG: Record<
  TrafficAnalyticsMetric,
  TrafficAnalyticsMetricConfig
> = {
  [TrafficAnalyticsMetric.TOTAL_VISITS]: {
    label: 'Total Visits',
    description: 'Total number of visits',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [TrafficAnalyticsMetric.UNIQUE_VISITORS]: {
    label: 'Unique Visitors',
    description: 'Number of unique visitors',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'User',
    color: '#6366F1',
    isReversed: false,
    priority: 1,
  },
  [TrafficAnalyticsMetric.PAGE_VIEWS]: {
    label: 'Page Views',
    description: 'Total number of page views',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Eye',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.SESSIONS]: {
    label: 'Sessions',
    description: 'Total number of sessions',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Activity',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [TrafficAnalyticsMetric.BOUNCE_RATE]: {
    label: 'Bounce Rate',
    description: 'Percentage of single-page sessions',
    format: TrafficAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingDown',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 30,
      average: 45,
      poor: 60,
    },
  },
  [TrafficAnalyticsMetric.AVG_SESSION_DURATION]: {
    label: 'Avg Session Duration',
    description: 'Average duration of sessions',
    format: TrafficAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.PAGES_PER_SESSION]: {
    label: 'Pages Per Session',
    description: 'Average pages viewed per session',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'FileText',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.EXIT_RATE]: {
    label: 'Exit Rate',
    description: 'Percentage of exits from a page',
    format: TrafficAnalyticsMetricFormat.PERCENTAGE,
    icon: 'LogOut',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [TrafficAnalyticsMetric.ENTRANCE_RATE]: {
    label: 'Entrance Rate',
    description: 'Percentage of entries to a page',
    format: TrafficAnalyticsMetricFormat.PERCENTAGE,
    icon: 'LogIn',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.NEW_VISITOR_RATE]: {
    label: 'New Visitor Rate',
    description: 'Percentage of new visitors',
    format: TrafficAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserPlus',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.RETURNING_VISITOR_RATE]: {
    label: 'Returning Visitor Rate',
    description: 'Percentage of returning visitors',
    format: TrafficAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.TRAFFIC_SOURCE_DISTRIBUTION]: {
    label: 'Source Distribution',
    description: 'Distribution of traffic by source',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'PieChart',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.REFERRAL_DOMAIN_DISTRIBUTION]: {
    label: 'Referral Domain Distribution',
    description: 'Distribution of traffic by referral domain',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Link',
    color: '#A855F7',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.SEARCH_ENGINE_DISTRIBUTION]: {
    label: 'Search Engine Distribution',
    description: 'Distribution of traffic by search engine',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Search',
    color: '#4285F4',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.SOCIAL_PLATFORM_DISTRIBUTION]: {
    label: 'Social Platform Distribution',
    description: 'Distribution of traffic by social platform',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Share2',
    color: '#1DA1F2',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.DEVICE_DISTRIBUTION]: {
    label: 'Device Distribution',
    description: 'Distribution of traffic by device type',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Smartphone',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.BROWSER_DISTRIBUTION]: {
    label: 'Browser Distribution',
    description: 'Distribution of traffic by browser',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Globe',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.OS_DISTRIBUTION]: {
    label: 'OS Distribution',
    description: 'Distribution of traffic by operating system',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Monitor',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.LOCATION_DISTRIBUTION]: {
    label: 'Location Distribution',
    description: 'Distribution of traffic by location',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'MapPin',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.PEAK_TRAFFIC_HOURS]: {
    label: 'Peak Traffic Hours',
    description: 'Hours with highest traffic volume',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.PEAK_TRAFFIC_DAYS]: {
    label: 'Peak Traffic Days',
    description: 'Days with highest traffic volume',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Calendar',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.TRAFFIC_GROWTH_RATE]: {
    label: 'Traffic Growth Rate',
    description: 'Rate of traffic growth over time',
    format: TrafficAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 10,
      average: 5,
      poor: 0,
    },
  },
  [TrafficAnalyticsMetric.CONVERSION_RATE_BY_SOURCE]: {
    label: 'Conversion Rate by Source',
    description: 'Conversion rate by traffic source',
    format: TrafficAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.BOUNCE_RATE_BY_SOURCE]: {
    label: 'Bounce Rate by Source',
    description: 'Bounce rate by traffic source',
    format: TrafficAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingDown',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [TrafficAnalyticsMetric.SESSION_DURATION_BY_SOURCE]: {
    label: 'Session Duration by Source',
    description: 'Average session duration by traffic source',
    format: TrafficAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.AVG_TIME_ON_PAGE]: {
    label: 'Avg Time on Page',
    description: 'Average time spent on a page',
    format: TrafficAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.EVENT_COUNT]: {
    label: 'Event Count',
    description: 'Total number of events tracked',
    format: TrafficAnalyticsMetricFormat.NUMBER,
    icon: 'Activity',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.CTR]: {
    label: 'Click-Through Rate',
    description: 'Rate of clicks on elements',
    format: TrafficAnalyticsMetricFormat.PERCENTAGE,
    icon: 'MousePointerClick',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [TrafficAnalyticsMetric.COST_PER_SESSION]: {
    label: 'Cost Per Session',
    description: 'Average cost per session',
    format: TrafficAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [TrafficAnalyticsMetric.REVENUE_PER_SESSION]: {
    label: 'Revenue Per Session',
    description: 'Average revenue per session',
    format: TrafficAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [TrafficAnalyticsMetric.TRAFFIC_QUALITY_SCORE]: {
    label: 'Traffic Quality Score',
    description: 'Overall traffic quality score',
    format: TrafficAnalyticsMetricFormat.SCORE,
    icon: 'Shield',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
};

/**
 * Get traffic metric category
 */
export function getTrafficMetricCategory(
  metric: TrafficAnalyticsMetric
): TrafficAnalyticsMetricType {
  return TRAFFIC_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get traffic metric label
 */
export function getTrafficMetricLabel(metric: TrafficAnalyticsMetric): string {
  return TRAFFIC_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get traffic metric description
 */
export function getTrafficMetricDescription(metric: TrafficAnalyticsMetric): string {
  return TRAFFIC_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get traffic metric format
 */
export function getTrafficMetricFormat(
  metric: TrafficAnalyticsMetric
): TrafficAnalyticsMetricFormat {
  return TRAFFIC_ANALYTICS_METRIC_CONFIG[metric]?.format || TrafficAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if traffic metric is reversed (lower is better)
 */
export function isTrafficMetricReversed(metric: TrafficAnalyticsMetric): boolean {
  return TRAFFIC_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get traffic metrics by category
 */
export function getTrafficMetricsByCategory(
  category: TrafficAnalyticsMetricType
): TrafficAnalyticsMetric[] {
  return Object.entries(TRAFFIC_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as TrafficAnalyticsMetric);
}

/**
 * Format traffic metric value
 */
export function formatTrafficMetricValue(metric: TrafficAnalyticsMetric, value: number): string {
  const format = getTrafficMetricFormat(metric);

  switch (format) {
    case TrafficAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case TrafficAnalyticsMetricFormat.TIME:
      if (value >= 3600) {
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        return `${hours}h ${minutes}m`;
      }
      if (value >= 60) {
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60);
        return `${minutes}m ${seconds}s`;
      }
      return `${Math.floor(value)}s`;
    case TrafficAnalyticsMetricFormat.CURRENCY:
      return `$${value.toFixed(2)}`;
    case TrafficAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get traffic metric priority
 */
export function getTrafficMetricPriority(metric: TrafficAnalyticsMetric): number {
  return TRAFFIC_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority traffic metrics
 */
export function getHighPriorityTrafficMetrics(): TrafficAnalyticsMetric[] {
  return Object.values(TrafficAnalyticsMetric).filter(
    (metric) => getTrafficMetricPriority(metric) === 1
  );
}

/**
 * Get traffic metric thresholds
 */
export function getTrafficMetricThreshold(
  metric: TrafficAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return TRAFFIC_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate traffic metric performance
 */
export function evaluateTrafficMetricPerformance(
  metric: TrafficAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getTrafficMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isTrafficMetricReversed(metric);

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
 * Traffic dashboard metrics
 */
export const TRAFFIC_DASHBOARD_METRICS: TrafficAnalyticsMetric[] = [
  TrafficAnalyticsMetric.TOTAL_VISITS,
  TrafficAnalyticsMetric.UNIQUE_VISITORS,
  TrafficAnalyticsMetric.PAGE_VIEWS,
  TrafficAnalyticsMetric.SESSIONS,
  TrafficAnalyticsMetric.BOUNCE_RATE,
  TrafficAnalyticsMetric.AVG_SESSION_DURATION,
  TrafficAnalyticsMetric.PAGES_PER_SESSION,
  TrafficAnalyticsMetric.TRAFFIC_GROWTH_RATE,
  TrafficAnalyticsMetric.REVENUE_PER_SESSION,
];

/**
 * Traffic engagement metrics
 */
export const TRAFFIC_ENGAGEMENT_METRICS: TrafficAnalyticsMetric[] = [
  TrafficAnalyticsMetric.BOUNCE_RATE,
  TrafficAnalyticsMetric.AVG_SESSION_DURATION,
  TrafficAnalyticsMetric.PAGES_PER_SESSION,
  TrafficAnalyticsMetric.AVG_TIME_ON_PAGE,
  TrafficAnalyticsMetric.EXIT_RATE,
  TrafficAnalyticsMetric.ENTRANCE_RATE,
  TrafficAnalyticsMetric.EVENT_COUNT,
];

/**
 * Traffic distribution metrics
 */
export const TRAFFIC_DISTRIBUTION_METRICS: TrafficAnalyticsMetric[] = [
  TrafficAnalyticsMetric.TRAFFIC_SOURCE_DISTRIBUTION,
  TrafficAnalyticsMetric.REFERRAL_DOMAIN_DISTRIBUTION,
  TrafficAnalyticsMetric.SEARCH_ENGINE_DISTRIBUTION,
  TrafficAnalyticsMetric.SOCIAL_PLATFORM_DISTRIBUTION,
  TrafficAnalyticsMetric.DEVICE_DISTRIBUTION,
  TrafficAnalyticsMetric.BROWSER_DISTRIBUTION,
  TrafficAnalyticsMetric.OS_DISTRIBUTION,
  TrafficAnalyticsMetric.LOCATION_DISTRIBUTION,
];

/**
 * Traffic source performance metrics
 */
export const TRAFFIC_SOURCE_PERFORMANCE_METRICS: TrafficAnalyticsMetric[] = [
  TrafficAnalyticsMetric.CONVERSION_RATE_BY_SOURCE,
  TrafficAnalyticsMetric.BOUNCE_RATE_BY_SOURCE,
  TrafficAnalyticsMetric.SESSION_DURATION_BY_SOURCE,
  TrafficAnalyticsMetric.CTR,
  TrafficAnalyticsMetric.COST_PER_SESSION,
  TrafficAnalyticsMetric.REVENUE_PER_SESSION,
];

/**
 * Traffic visitor metrics
 */
export const TRAFFIC_VISITOR_METRICS: TrafficAnalyticsMetric[] = [
  TrafficAnalyticsMetric.NEW_VISITOR_RATE,
  TrafficAnalyticsMetric.RETURNING_VISITOR_RATE,
  TrafficAnalyticsMetric.UNIQUE_VISITORS,
  TrafficAnalyticsMetric.PEAK_TRAFFIC_HOURS,
  TrafficAnalyticsMetric.PEAK_TRAFFIC_DAYS,
];
