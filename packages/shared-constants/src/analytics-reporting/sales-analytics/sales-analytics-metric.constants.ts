/**
 * @fileoverview Sales analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Sales analytics metrics
 */
export enum SalesAnalyticsMetric {
  /** Total sales amount */
  TOTAL_SALES = 'TOTAL_SALES',
  /** Net sales (after returns and discounts) */
  NET_SALES = 'NET_SALES',
  /** Gross sales (before returns and discounts) */
  GROSS_SALES = 'GROSS_SALES',
  /** Sales growth rate percentage */
  SALES_GROWTH_RATE = 'SALES_GROWTH_RATE',
  /** Sales per day */
  SALES_PER_DAY = 'SALES_PER_DAY',
  /** Sales per customer */
  SALES_PER_CUSTOMER = 'SALES_PER_CUSTOMER',
  /** Average order value */
  AVERAGE_ORDER_VALUE = 'AVERAGE_ORDER_VALUE',
  /** Sales by category */
  SALES_BY_CATEGORY = 'SALES_BY_CATEGORY',
  /** Sales by region */
  SALES_BY_REGION = 'SALES_BY_REGION',
  /** Sales by channel */
  SALES_BY_CHANNEL = 'SALES_BY_CHANNEL',
  /** Sales conversion rate percentage */
  SALES_CONVERSION_RATE = 'SALES_CONVERSION_RATE',
  /** Sales target achievement percentage */
  SALES_TARGET_ACHIEVEMENT = 'SALES_TARGET_ACHIEVEMENT',
  /** Sales pipeline value */
  SALES_PIPELINE_VALUE = 'SALES_PIPELINE_VALUE',
  /** Sales win rate percentage */
  SALES_WIN_RATE = 'SALES_WIN_RATE',
  /** Sales loss rate percentage */
  SALES_LOSS_RATE = 'SALES_LOSS_RATE',
  /** Sales cycle length in days */
  SALES_CYCLE_LENGTH = 'SALES_CYCLE_LENGTH',
  /** Sales per representative */
  SALES_PER_REPRESENTATIVE = 'SALES_PER_REPRESENTATIVE',
  /** Sales per product */
  SALES_PER_PRODUCT = 'SALES_PER_PRODUCT',
  /** Sales per location */
  SALES_PER_LOCATION = 'SALES_PER_LOCATION',
  /** Sales per market */
  SALES_PER_MARKET = 'SALES_PER_MARKET',
  /** Sales revenue per employee */
  SALES_REVENUE_PER_EMPLOYEE = 'SALES_REVENUE_PER_EMPLOYEE',
  /** Month over month sales growth */
  SALES_GROWTH_MOM = 'SALES_GROWTH_MOM',
  /** Year over year sales growth */
  SALES_GROWTH_YOY = 'SALES_GROWTH_YOY',
  /** Sales return rate percentage */
  SALES_RETURN_RATE = 'SALES_RETURN_RATE',
  /** Total number of orders */
  TOTAL_ORDERS = 'TOTAL_ORDERS',
  /** Total number of customers */
  TOTAL_CUSTOMERS = 'TOTAL_CUSTOMERS',
  /** Active customers */
  ACTIVE_CUSTOMERS = 'ACTIVE_CUSTOMERS',
  /** Average order size */
  AVERAGE_ORDER_SIZE = 'AVERAGE_ORDER_SIZE',
  /** Sales per hour */
  SALES_PER_HOUR = 'SALES_PER_HOUR',
  /** Sales forecast accuracy */
  FORECAST_ACCURACY = 'FORECAST_ACCURACY',
  /** Sales quota attainment */
  QUOTA_ATTAINMENT = 'QUOTA_ATTAINMENT',
  /** Sales territory coverage */
  TERRITORY_COVERAGE = 'TERRITORY_COVERAGE',
}

/**
 * Sales metric type classification
 */
export enum SalesAnalyticsMetricType {
  /** Revenue metrics */
  REVENUE = 'REVENUE',
  /** Rate metrics */
  RATE = 'RATE',
  /** Performance metrics */
  PERFORMANCE = 'PERFORMANCE',
  /** Customer metrics */
  CUSTOMER = 'CUSTOMER',
  /** Operational metrics */
  OPERATIONAL = 'OPERATIONAL',
  /** Growth metrics */
  GROWTH = 'GROWTH',
  /** Productivity metrics */
  PRODUCTIVITY = 'PRODUCTIVITY',
}

/**
 * Sales metric category mapping
 */
export const SALES_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  SalesAnalyticsMetric,
  SalesAnalyticsMetricType
> = {
  [SalesAnalyticsMetric.TOTAL_SALES]: SalesAnalyticsMetricType.REVENUE,
  [SalesAnalyticsMetric.NET_SALES]: SalesAnalyticsMetricType.REVENUE,
  [SalesAnalyticsMetric.GROSS_SALES]: SalesAnalyticsMetricType.REVENUE,
  [SalesAnalyticsMetric.SALES_GROWTH_RATE]: SalesAnalyticsMetricType.GROWTH,
  [SalesAnalyticsMetric.SALES_PER_DAY]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.SALES_PER_CUSTOMER]: SalesAnalyticsMetricType.CUSTOMER,
  [SalesAnalyticsMetric.AVERAGE_ORDER_VALUE]: SalesAnalyticsMetricType.REVENUE,
  [SalesAnalyticsMetric.SALES_BY_CATEGORY]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.SALES_BY_REGION]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.SALES_BY_CHANNEL]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.SALES_CONVERSION_RATE]: SalesAnalyticsMetricType.RATE,
  [SalesAnalyticsMetric.SALES_TARGET_ACHIEVEMENT]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.SALES_PIPELINE_VALUE]: SalesAnalyticsMetricType.REVENUE,
  [SalesAnalyticsMetric.SALES_WIN_RATE]: SalesAnalyticsMetricType.RATE,
  [SalesAnalyticsMetric.SALES_LOSS_RATE]: SalesAnalyticsMetricType.RATE,
  [SalesAnalyticsMetric.SALES_CYCLE_LENGTH]: SalesAnalyticsMetricType.OPERATIONAL,
  [SalesAnalyticsMetric.SALES_PER_REPRESENTATIVE]: SalesAnalyticsMetricType.PRODUCTIVITY,
  [SalesAnalyticsMetric.SALES_PER_PRODUCT]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.SALES_PER_LOCATION]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.SALES_PER_MARKET]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.SALES_REVENUE_PER_EMPLOYEE]: SalesAnalyticsMetricType.PRODUCTIVITY,
  [SalesAnalyticsMetric.SALES_GROWTH_MOM]: SalesAnalyticsMetricType.GROWTH,
  [SalesAnalyticsMetric.SALES_GROWTH_YOY]: SalesAnalyticsMetricType.GROWTH,
  [SalesAnalyticsMetric.SALES_RETURN_RATE]: SalesAnalyticsMetricType.RATE,
  [SalesAnalyticsMetric.TOTAL_ORDERS]: SalesAnalyticsMetricType.REVENUE,
  [SalesAnalyticsMetric.TOTAL_CUSTOMERS]: SalesAnalyticsMetricType.CUSTOMER,
  [SalesAnalyticsMetric.ACTIVE_CUSTOMERS]: SalesAnalyticsMetricType.CUSTOMER,
  [SalesAnalyticsMetric.AVERAGE_ORDER_SIZE]: SalesAnalyticsMetricType.OPERATIONAL,
  [SalesAnalyticsMetric.SALES_PER_HOUR]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.FORECAST_ACCURACY]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.QUOTA_ATTAINMENT]: SalesAnalyticsMetricType.PERFORMANCE,
  [SalesAnalyticsMetric.TERRITORY_COVERAGE]: SalesAnalyticsMetricType.OPERATIONAL,
};

/**
 * Sales metric format type
 */
export enum SalesAnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Ratio format */
  RATIO = 'RATIO',
  /** Time format (days) */
  TIME = 'TIME',
}

/**
 * Sales metric configuration
 */
export interface SalesAnalyticsMetricConfig {
  label: string;
  description: string;
  format: SalesAnalyticsMetricFormat;
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

export const SALES_ANALYTICS_METRIC_CONFIG: Record<
  SalesAnalyticsMetric,
  SalesAnalyticsMetricConfig
> = {
  [SalesAnalyticsMetric.TOTAL_SALES]: {
    label: 'Total Sales',
    description: 'Total sales revenue',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [SalesAnalyticsMetric.NET_SALES]: {
    label: 'Net Sales',
    description: 'Sales revenue after returns and discounts',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [SalesAnalyticsMetric.GROSS_SALES]: {
    label: 'Gross Sales',
    description: 'Total sales before returns and discounts',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_GROWTH_RATE]: {
    label: 'Sales Growth Rate',
    description: 'Rate of sales growth over time',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
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
  [SalesAnalyticsMetric.SALES_PER_DAY]: {
    label: 'Sales Per Day',
    description: 'Average daily sales revenue',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'Calendar',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_PER_CUSTOMER]: {
    label: 'Sales Per Customer',
    description: 'Average revenue per customer',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'User',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.AVERAGE_ORDER_VALUE]: {
    label: 'Average Order Value',
    description: 'Average value of each order',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'ShoppingCart',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
  },
  [SalesAnalyticsMetric.SALES_BY_CATEGORY]: {
    label: 'Sales By Category',
    description: 'Sales performance by product category',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'Folder',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_BY_REGION]: {
    label: 'Sales By Region',
    description: 'Sales performance by geographic region',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'MapPin',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_BY_CHANNEL]: {
    label: 'Sales By Channel',
    description: 'Sales performance by sales channel',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'Layers',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_CONVERSION_RATE]: {
    label: 'Conversion Rate',
    description: 'Percentage of leads converted to sales',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 20,
      average: 15,
      poor: 10,
    },
  },
  [SalesAnalyticsMetric.SALES_TARGET_ACHIEVEMENT]: {
    label: 'Target Achievement',
    description: 'Percentage of sales target achieved',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Target',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 100,
      average: 80,
      poor: 60,
    },
  },
  [SalesAnalyticsMetric.SALES_PIPELINE_VALUE]: {
    label: 'Pipeline Value',
    description: 'Total value of sales pipeline',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'Pipeline',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_WIN_RATE]: {
    label: 'Win Rate',
    description: 'Percentage of opportunities won',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
    icon: 'CheckCircle',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 40,
      average: 30,
      poor: 20,
    },
  },
  [SalesAnalyticsMetric.SALES_LOSS_RATE]: {
    label: 'Loss Rate',
    description: 'Percentage of opportunities lost',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
    icon: 'XCircle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 20,
      average: 30,
      poor: 40,
    },
  },
  [SalesAnalyticsMetric.SALES_CYCLE_LENGTH]: {
    label: 'Sales Cycle Length',
    description: 'Average length of sales cycle in days',
    format: SalesAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_PER_REPRESENTATIVE]: {
    label: 'Sales Per Rep',
    description: 'Average sales per representative',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'User',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_PER_PRODUCT]: {
    label: 'Sales Per Product',
    description: 'Average sales per product',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'Package',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_PER_LOCATION]: {
    label: 'Sales Per Location',
    description: 'Average sales per location',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'MapPin',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_PER_MARKET]: {
    label: 'Sales Per Market',
    description: 'Average sales per market segment',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'PieChart',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_REVENUE_PER_EMPLOYEE]: {
    label: 'Revenue Per Employee',
    description: 'Sales revenue per employee',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'Users',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_GROWTH_MOM]: {
    label: 'Month Over Month Growth',
    description: 'Month over month sales growth rate',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#10B981',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 5,
      average: 3,
      poor: 1,
    },
  },
  [SalesAnalyticsMetric.SALES_GROWTH_YOY]: {
    label: 'Year Over Year Growth',
    description: 'Year over year sales growth rate',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 10,
      average: 7,
      poor: 5,
    },
  },
  [SalesAnalyticsMetric.SALES_RETURN_RATE]: {
    label: 'Return Rate',
    description: 'Percentage of sales that are returned',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Undo',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 5,
      average: 10,
      poor: 15,
    },
  },
  [SalesAnalyticsMetric.TOTAL_ORDERS]: {
    label: 'Total Orders',
    description: 'Total number of orders',
    format: SalesAnalyticsMetricFormat.NUMBER,
    icon: 'ShoppingBag',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [SalesAnalyticsMetric.TOTAL_CUSTOMERS]: {
    label: 'Total Customers',
    description: 'Total number of customers',
    format: SalesAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#8B5CF6',
    isReversed: false,
    priority: 1,
  },
  [SalesAnalyticsMetric.ACTIVE_CUSTOMERS]: {
    label: 'Active Customers',
    description: 'Number of active customers',
    format: SalesAnalyticsMetricFormat.NUMBER,
    icon: 'UserCheck',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.AVERAGE_ORDER_SIZE]: {
    label: 'Average Order Size',
    description: 'Average number of items per order',
    format: SalesAnalyticsMetricFormat.NUMBER,
    icon: 'Package',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.SALES_PER_HOUR]: {
    label: 'Sales Per Hour',
    description: 'Average hourly sales revenue',
    format: SalesAnalyticsMetricFormat.CURRENCY,
    icon: 'Clock',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [SalesAnalyticsMetric.FORECAST_ACCURACY]: {
    label: 'Forecast Accuracy',
    description: 'Accuracy of sales forecasts',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Target',
    color: '#10B981',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 90,
      average: 80,
      poor: 70,
    },
  },
  [SalesAnalyticsMetric.QUOTA_ATTAINMENT]: {
    label: 'Quota Attainment',
    description: 'Percentage of sales quota achieved',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Trophy',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 100,
      average: 80,
      poor: 60,
    },
  },
  [SalesAnalyticsMetric.TERRITORY_COVERAGE]: {
    label: 'Territory Coverage',
    description: 'Percentage of territory covered',
    format: SalesAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Map',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
};

/**
 * Get sales metric category
 */
export function getSalesMetricCategory(metric: SalesAnalyticsMetric): SalesAnalyticsMetricType {
  return SALES_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get sales metric label
 */
export function getSalesMetricLabel(metric: SalesAnalyticsMetric): string {
  return SALES_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get sales metric description
 */
export function getSalesMetricDescription(metric: SalesAnalyticsMetric): string {
  return SALES_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get sales metric format
 */
export function getSalesMetricFormat(metric: SalesAnalyticsMetric): SalesAnalyticsMetricFormat {
  return SALES_ANALYTICS_METRIC_CONFIG[metric]?.format || SalesAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if sales metric is reversed (lower is better)
 */
export function isSalesMetricReversed(metric: SalesAnalyticsMetric): boolean {
  return SALES_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get sales metrics by category
 */
export function getSalesMetricsByCategory(
  category: SalesAnalyticsMetricType
): SalesAnalyticsMetric[] {
  return Object.entries(SALES_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as SalesAnalyticsMetric);
}

/**
 * Format sales metric value
 */
export function formatSalesMetricValue(metric: SalesAnalyticsMetric, value: number): string {
  const format = getSalesMetricFormat(metric);

  switch (format) {
    case SalesAnalyticsMetricFormat.CURRENCY:
      return `$${value.toFixed(2)}`;
    case SalesAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case SalesAnalyticsMetricFormat.TIME:
      return `${Math.round(value)} days`;
    case SalesAnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get sales metric priority
 */
export function getSalesMetricPriority(metric: SalesAnalyticsMetric): number {
  return SALES_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority sales metrics
 */
export function getHighPrioritySalesMetrics(): SalesAnalyticsMetric[] {
  return Object.values(SalesAnalyticsMetric).filter(
    (metric) => getSalesMetricPriority(metric) === 1
  );
}

/**
 * Get sales metric thresholds
 */
export function getSalesMetricThreshold(
  metric: SalesAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return SALES_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate sales metric performance
 */
export function evaluateSalesMetricPerformance(
  metric: SalesAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getSalesMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isSalesMetricReversed(metric);

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
 * Sales dashboard metrics
 */
export const SALES_DASHBOARD_METRICS: SalesAnalyticsMetric[] = [
  SalesAnalyticsMetric.TOTAL_SALES,
  SalesAnalyticsMetric.NET_SALES,
  SalesAnalyticsMetric.SALES_GROWTH_RATE,
  SalesAnalyticsMetric.AVERAGE_ORDER_VALUE,
  SalesAnalyticsMetric.SALES_CONVERSION_RATE,
  SalesAnalyticsMetric.SALES_TARGET_ACHIEVEMENT,
  SalesAnalyticsMetric.SALES_WIN_RATE,
  SalesAnalyticsMetric.TOTAL_ORDERS,
  SalesAnalyticsMetric.TOTAL_CUSTOMERS,
];

/**
 * Sales performance metrics
 */
export const SALES_PERFORMANCE_METRICS: SalesAnalyticsMetric[] = [
  SalesAnalyticsMetric.SALES_CONVERSION_RATE,
  SalesAnalyticsMetric.SALES_WIN_RATE,
  SalesAnalyticsMetric.SALES_LOSS_RATE,
  SalesAnalyticsMetric.SALES_TARGET_ACHIEVEMENT,
  SalesAnalyticsMetric.QUOTA_ATTAINMENT,
  SalesAnalyticsMetric.SALES_CYCLE_LENGTH,
];

/**
 * Sales growth metrics
 */
export const SALES_GROWTH_METRICS: SalesAnalyticsMetric[] = [
  SalesAnalyticsMetric.SALES_GROWTH_RATE,
  SalesAnalyticsMetric.SALES_GROWTH_MOM,
  SalesAnalyticsMetric.SALES_GROWTH_YOY,
  SalesAnalyticsMetric.FORECAST_ACCURACY,
  SalesAnalyticsMetric.SALES_PIPELINE_VALUE,
];

/**
 * Sales productivity metrics
 */
export const SALES_PRODUCTIVITY_METRICS: SalesAnalyticsMetric[] = [
  SalesAnalyticsMetric.SALES_PER_REPRESENTATIVE,
  SalesAnalyticsMetric.SALES_REVENUE_PER_EMPLOYEE,
  SalesAnalyticsMetric.SALES_PER_DAY,
  SalesAnalyticsMetric.SALES_PER_HOUR,
  SalesAnalyticsMetric.SALES_PER_CUSTOMER,
];
