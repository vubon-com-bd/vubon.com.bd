/**
 * @fileoverview Seller analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Seller analytics metrics
 */
export enum SellerAnalyticsMetric {
  /** Total number of vendors */
  TOTAL_VENDORS = 'TOTAL_VENDORS',
  /** Active vendors */
  ACTIVE_VENDORS = 'ACTIVE_VENDORS',
  /** Vendor sales */
  VENDOR_SALES = 'VENDOR_SALES',
  /** Vendor revenue */
  VENDOR_REVENUE = 'VENDOR_REVENUE',
  /** Vendor orders */
  VENDOR_ORDERS = 'VENDOR_ORDERS',
  /** Vendor commission */
  VENDOR_COMMISSION = 'VENDOR_COMMISSION',
  /** Vendor rating */
  VENDOR_RATING = 'VENDOR_RATING',
  /** Vendor review count */
  VENDOR_REVIEW_COUNT = 'VENDOR_REVIEW_COUNT',
  /** Vendor product count */
  VENDOR_PRODUCT_COUNT = 'VENDOR_PRODUCT_COUNT',
  /** Vendor fulfillment rate percentage */
  VENDOR_FULFILLMENT_RATE = 'VENDOR_FULFILLMENT_RATE',
  /** Vendor on-time delivery rate percentage */
  VENDOR_ON_TIME_DELIVERY = 'VENDOR_ON_TIME_DELIVERY',
  /** Vendor response time in hours */
  VENDOR_RESPONSE_TIME = 'VENDOR_RESPONSE_TIME',
  /** Vendor resolution rate percentage */
  VENDOR_RESOLUTION_RATE = 'VENDOR_RESOLUTION_RATE',
  /** Vendor customer satisfaction score */
  VENDOR_CUSTOMER_SATISFACTION = 'VENDOR_CUSTOMER_SATISFACTION',
  /** Vendor growth rate percentage */
  VENDOR_GROWTH_RATE = 'VENDOR_GROWTH_RATE',
  /** Vendor tier distribution */
  VENDOR_TIER_DISTRIBUTION = 'VENDOR_TIER_DISTRIBUTION',
  /** Vendor category specialization */
  VENDOR_CATEGORY_SPECIALIZATION = 'VENDOR_CATEGORY_SPECIALIZATION',
  /** Vendor geographic distribution */
  VENDOR_GEOGRAPHIC_DISTRIBUTION = 'VENDOR_GEOGRAPHIC_DISTRIBUTION',
  /** Vendor revenue per product */
  VENDOR_REVENUE_PER_PRODUCT = 'VENDOR_REVENUE_PER_PRODUCT',
  /** Vendor profit margin percentage */
  VENDOR_PROFIT_MARGIN = 'VENDOR_PROFIT_MARGIN',
  /** Vendor acquisition cost */
  VENDOR_ACQUISITION_COST = 'VENDOR_ACQUISITION_COST',
  /** Vendor retention rate percentage */
  VENDOR_RETENTION_RATE = 'VENDOR_RETENTION_RATE',
  /** Vendor churn rate percentage */
  VENDOR_CHURN_RATE = 'VENDOR_CHURN_RATE',
  /** Average vendors per category */
  AVG_VENDORS_PER_CATEGORY = 'AVG_VENDORS_PER_CATEGORY',
  /** Vendor satisfaction score */
  VENDOR_SATISFACTION_SCORE = 'VENDOR_SATISFACTION_SCORE',
  /** Vendor support ticket volume */
  VENDOR_TICKET_VOLUME = 'VENDOR_TICKET_VOLUME',
  /** Vendor dispute rate percentage */
  VENDOR_DISPUTE_RATE = 'VENDOR_DISPUTE_RATE',
  /** Vendor return rate percentage */
  VENDOR_RETURN_RATE = 'VENDOR_RETURN_RATE',
  /** Vendor inventory accuracy percentage */
  VENDOR_INVENTORY_ACCURACY = 'VENDOR_INVENTORY_ACCURACY',
  /** Vendor quality score */
  VENDOR_QUALITY_SCORE = 'VENDOR_QUALITY_SCORE',
}

/**
 * Seller metric type classification
 */
export enum SellerAnalyticsMetricType {
  /** Vendor count metrics */
  COUNT = 'COUNT',
  /** Vendor financial metrics */
  FINANCIAL = 'FINANCIAL',
  /** Vendor performance metrics */
  PERFORMANCE = 'PERFORMANCE',
  /** Vendor quality metrics */
  QUALITY = 'QUALITY',
  /** Vendor growth metrics */
  GROWTH = 'GROWTH',
  /** Vendor distribution metrics */
  DISTRIBUTION = 'DISTRIBUTION',
  /** Vendor operational metrics */
  OPERATIONAL = 'OPERATIONAL',
}

/**
 * Seller metric category mapping
 */
export const SELLER_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  SellerAnalyticsMetric,
  SellerAnalyticsMetricType
> = {
  [SellerAnalyticsMetric.TOTAL_VENDORS]: SellerAnalyticsMetricType.COUNT,
  [SellerAnalyticsMetric.ACTIVE_VENDORS]: SellerAnalyticsMetricType.COUNT,
  [SellerAnalyticsMetric.VENDOR_SALES]: SellerAnalyticsMetricType.FINANCIAL,
  [SellerAnalyticsMetric.VENDOR_REVENUE]: SellerAnalyticsMetricType.FINANCIAL,
  [SellerAnalyticsMetric.VENDOR_ORDERS]: SellerAnalyticsMetricType.COUNT,
  [SellerAnalyticsMetric.VENDOR_COMMISSION]: SellerAnalyticsMetricType.FINANCIAL,
  [SellerAnalyticsMetric.VENDOR_RATING]: SellerAnalyticsMetricType.QUALITY,
  [SellerAnalyticsMetric.VENDOR_REVIEW_COUNT]: SellerAnalyticsMetricType.QUALITY,
  [SellerAnalyticsMetric.VENDOR_PRODUCT_COUNT]: SellerAnalyticsMetricType.COUNT,
  [SellerAnalyticsMetric.VENDOR_FULFILLMENT_RATE]: SellerAnalyticsMetricType.PERFORMANCE,
  [SellerAnalyticsMetric.VENDOR_ON_TIME_DELIVERY]: SellerAnalyticsMetricType.PERFORMANCE,
  [SellerAnalyticsMetric.VENDOR_RESPONSE_TIME]: SellerAnalyticsMetricType.OPERATIONAL,
  [SellerAnalyticsMetric.VENDOR_RESOLUTION_RATE]: SellerAnalyticsMetricType.PERFORMANCE,
  [SellerAnalyticsMetric.VENDOR_CUSTOMER_SATISFACTION]: SellerAnalyticsMetricType.QUALITY,
  [SellerAnalyticsMetric.VENDOR_GROWTH_RATE]: SellerAnalyticsMetricType.GROWTH,
  [SellerAnalyticsMetric.VENDOR_TIER_DISTRIBUTION]: SellerAnalyticsMetricType.DISTRIBUTION,
  [SellerAnalyticsMetric.VENDOR_CATEGORY_SPECIALIZATION]: SellerAnalyticsMetricType.DISTRIBUTION,
  [SellerAnalyticsMetric.VENDOR_GEOGRAPHIC_DISTRIBUTION]: SellerAnalyticsMetricType.DISTRIBUTION,
  [SellerAnalyticsMetric.VENDOR_REVENUE_PER_PRODUCT]: SellerAnalyticsMetricType.FINANCIAL,
  [SellerAnalyticsMetric.VENDOR_PROFIT_MARGIN]: SellerAnalyticsMetricType.FINANCIAL,
  [SellerAnalyticsMetric.VENDOR_ACQUISITION_COST]: SellerAnalyticsMetricType.FINANCIAL,
  [SellerAnalyticsMetric.VENDOR_RETENTION_RATE]: SellerAnalyticsMetricType.GROWTH,
  [SellerAnalyticsMetric.VENDOR_CHURN_RATE]: SellerAnalyticsMetricType.GROWTH,
  [SellerAnalyticsMetric.AVG_VENDORS_PER_CATEGORY]: SellerAnalyticsMetricType.DISTRIBUTION,
  [SellerAnalyticsMetric.VENDOR_SATISFACTION_SCORE]: SellerAnalyticsMetricType.QUALITY,
  [SellerAnalyticsMetric.VENDOR_TICKET_VOLUME]: SellerAnalyticsMetricType.OPERATIONAL,
  [SellerAnalyticsMetric.VENDOR_DISPUTE_RATE]: SellerAnalyticsMetricType.OPERATIONAL,
  [SellerAnalyticsMetric.VENDOR_RETURN_RATE]: SellerAnalyticsMetricType.OPERATIONAL,
  [SellerAnalyticsMetric.VENDOR_INVENTORY_ACCURACY]: SellerAnalyticsMetricType.OPERATIONAL,
  [SellerAnalyticsMetric.VENDOR_QUALITY_SCORE]: SellerAnalyticsMetricType.QUALITY,
};

/**
 * Seller metric format type
 */
export enum SellerAnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Score format (0-100) */
  SCORE = 'SCORE',
  /** Rating format (0-5) */
  RATING = 'RATING',
  /** Time format (hours) */
  TIME = 'TIME',
  /** Ratio format */
  RATIO = 'RATIO',
}

/**
 * Seller metric configuration
 */
export interface SellerAnalyticsMetricConfig {
  label: string;
  description: string;
  format: SellerAnalyticsMetricFormat;
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

export const SELLER_ANALYTICS_METRIC_CONFIG: Record<
  SellerAnalyticsMetric,
  SellerAnalyticsMetricConfig
> = {
  [SellerAnalyticsMetric.TOTAL_VENDORS]: {
    label: 'Total Vendors',
    description: 'Total number of registered vendors',
    format: SellerAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [SellerAnalyticsMetric.ACTIVE_VENDORS]: {
    label: 'Active Vendors',
    description: 'Number of active vendors',
    format: SellerAnalyticsMetricFormat.NUMBER,
    icon: 'UserCheck',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [SellerAnalyticsMetric.VENDOR_SALES]: {
    label: 'Vendor Sales',
    description: 'Total sales from vendors',
    format: SellerAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 1,
  },
  [SellerAnalyticsMetric.VENDOR_REVENUE]: {
    label: 'Vendor Revenue',
    description: 'Total revenue generated by vendors',
    format: SellerAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [SellerAnalyticsMetric.VENDOR_ORDERS]: {
    label: 'Vendor Orders',
    description: 'Total orders received by vendors',
    format: SellerAnalyticsMetricFormat.NUMBER,
    icon: 'ShoppingBag',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_COMMISSION]: {
    label: 'Vendor Commission',
    description: 'Commission earned from vendors',
    format: SellerAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_RATING]: {
    label: 'Vendor Rating',
    description: 'Average vendor rating',
    format: SellerAnalyticsMetricFormat.RATING,
    icon: 'Star',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 4.5,
      average: 4.0,
      poor: 3.0,
    },
  },
  [SellerAnalyticsMetric.VENDOR_REVIEW_COUNT]: {
    label: 'Vendor Reviews',
    description: 'Number of vendor reviews',
    format: SellerAnalyticsMetricFormat.NUMBER,
    icon: 'MessageSquare',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_PRODUCT_COUNT]: {
    label: 'Vendor Products',
    description: 'Number of products per vendor',
    format: SellerAnalyticsMetricFormat.NUMBER,
    icon: 'Package',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_FULFILLMENT_RATE]: {
    label: 'Fulfillment Rate',
    description: 'Vendor order fulfillment rate',
    format: SellerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Package',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 95,
      average: 85,
      poor: 75,
    },
  },
  [SellerAnalyticsMetric.VENDOR_ON_TIME_DELIVERY]: {
    label: 'On-Time Delivery',
    description: 'Vendor on-time delivery rate',
    format: SellerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Truck',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 90,
      average: 80,
      poor: 70,
    },
  },
  [SellerAnalyticsMetric.VENDOR_RESPONSE_TIME]: {
    label: 'Response Time',
    description: 'Average vendor response time in hours',
    format: SellerAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_RESOLUTION_RATE]: {
    label: 'Resolution Rate',
    description: 'Vendor issue resolution rate',
    format: SellerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'CheckCircle',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 90,
      average: 80,
      poor: 70,
    },
  },
  [SellerAnalyticsMetric.VENDOR_CUSTOMER_SATISFACTION]: {
    label: 'Customer Satisfaction',
    description: 'Vendor customer satisfaction score',
    format: SellerAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
  },
  [SellerAnalyticsMetric.VENDOR_GROWTH_RATE]: {
    label: 'Vendor Growth Rate',
    description: 'Vendor growth rate over time',
    format: SellerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 10,
      average: 5,
      poor: 0,
    },
  },
  [SellerAnalyticsMetric.VENDOR_TIER_DISTRIBUTION]: {
    label: 'Tier Distribution',
    description: 'Distribution of vendors by tier',
    format: SellerAnalyticsMetricFormat.NUMBER,
    icon: 'Layers',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_CATEGORY_SPECIALIZATION]: {
    label: 'Category Specialization',
    description: 'Vendor specialization by category',
    format: SellerAnalyticsMetricFormat.NUMBER,
    icon: 'Folder',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_GEOGRAPHIC_DISTRIBUTION]: {
    label: 'Geographic Distribution',
    description: 'Vendor distribution by region',
    format: SellerAnalyticsMetricFormat.NUMBER,
    icon: 'MapPin',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_REVENUE_PER_PRODUCT]: {
    label: 'Revenue Per Product',
    description: 'Revenue per product per vendor',
    format: SellerAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_PROFIT_MARGIN]: {
    label: 'Profit Margin',
    description: 'Vendor profit margin percentage',
    format: SellerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 30,
      average: 20,
      poor: 10,
    },
  },
  [SellerAnalyticsMetric.VENDOR_ACQUISITION_COST]: {
    label: 'Acquisition Cost',
    description: 'Cost to acquire a vendor',
    format: SellerAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_RETENTION_RATE]: {
    label: 'Retention Rate',
    description: 'Vendor retention rate',
    format: SellerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 80,
      average: 65,
      poor: 50,
    },
  },
  [SellerAnalyticsMetric.VENDOR_CHURN_RATE]: {
    label: 'Churn Rate',
    description: 'Vendor churn rate',
    format: SellerAnalyticsMetricFormat.PERCENTAGE,
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
  [SellerAnalyticsMetric.AVG_VENDORS_PER_CATEGORY]: {
    label: 'Avg Vendors Per Category',
    description: 'Average number of vendors per category',
    format: SellerAnalyticsMetricFormat.NUMBER,
    icon: 'Folder',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_SATISFACTION_SCORE]: {
    label: 'Vendor Satisfaction',
    description: 'Vendor satisfaction score',
    format: SellerAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_TICKET_VOLUME]: {
    label: 'Support Tickets',
    description: 'Number of support tickets from vendors',
    format: SellerAnalyticsMetricFormat.NUMBER,
    icon: 'MessageSquare',
    color: '#6366F1',
    isReversed: true,
    priority: 3,
  },
  [SellerAnalyticsMetric.VENDOR_DISPUTE_RATE]: {
    label: 'Dispute Rate',
    description: 'Vendor dispute rate percentage',
    format: SellerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'AlertTriangle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_RETURN_RATE]: {
    label: 'Return Rate',
    description: 'Vendor return rate percentage',
    format: SellerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Undo',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_INVENTORY_ACCURACY]: {
    label: 'Inventory Accuracy',
    description: 'Vendor inventory accuracy percentage',
    format: SellerAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Package',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [SellerAnalyticsMetric.VENDOR_QUALITY_SCORE]: {
    label: 'Quality Score',
    description: 'Vendor quality score',
    format: SellerAnalyticsMetricFormat.SCORE,
    icon: 'Shield',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
};

/**
 * Get seller metric category
 */
export function getSellerMetricCategory(metric: SellerAnalyticsMetric): SellerAnalyticsMetricType {
  return SELLER_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get seller metric label
 */
export function getSellerMetricLabel(metric: SellerAnalyticsMetric): string {
  return SELLER_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get seller metric description
 */
export function getSellerMetricDescription(metric: SellerAnalyticsMetric): string {
  return SELLER_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get seller metric format
 */
export function getSellerMetricFormat(metric: SellerAnalyticsMetric): SellerAnalyticsMetricFormat {
  return SELLER_ANALYTICS_METRIC_CONFIG[metric]?.format || SellerAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if seller metric is reversed (lower is better)
 */
export function isSellerMetricReversed(metric: SellerAnalyticsMetric): boolean {
  return SELLER_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get seller metrics by category
 */
export function getSellerMetricsByCategory(
  category: SellerAnalyticsMetricType
): SellerAnalyticsMetric[] {
  return Object.entries(SELLER_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as SellerAnalyticsMetric);
}

/**
 * Format seller metric value
 */
export function formatSellerMetricValue(metric: SellerAnalyticsMetric, value: number): string {
  const format = getSellerMetricFormat(metric);

  switch (format) {
    case SellerAnalyticsMetricFormat.CURRENCY:
      return `$${value.toFixed(2)}`;
    case SellerAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case SellerAnalyticsMetricFormat.TIME:
      if (value >= 24) {
        const days = Math.floor(value / 24);
        const hours = Math.round(value % 24);
        return `${days}d ${hours}h`;
      }
      return `${Math.round(value)} hours`;
    case SellerAnalyticsMetricFormat.RATING:
      return value.toFixed(1);
    case SellerAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case SellerAnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get seller metric priority
 */
export function getSellerMetricPriority(metric: SellerAnalyticsMetric): number {
  return SELLER_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority seller metrics
 */
export function getHighPrioritySellerMetrics(): SellerAnalyticsMetric[] {
  return Object.values(SellerAnalyticsMetric).filter(
    (metric) => getSellerMetricPriority(metric) === 1
  );
}

/**
 * Get seller metric thresholds
 */
export function getSellerMetricThreshold(
  metric: SellerAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return SELLER_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate seller metric performance
 */
export function evaluateSellerMetricPerformance(
  metric: SellerAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getSellerMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isSellerMetricReversed(metric);

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
 * Seller dashboard metrics
 */
export const SELLER_DASHBOARD_METRICS: SellerAnalyticsMetric[] = [
  SellerAnalyticsMetric.TOTAL_VENDORS,
  SellerAnalyticsMetric.ACTIVE_VENDORS,
  SellerAnalyticsMetric.VENDOR_REVENUE,
  SellerAnalyticsMetric.VENDOR_RATING,
  SellerAnalyticsMetric.VENDOR_FULFILLMENT_RATE,
  SellerAnalyticsMetric.VENDOR_RETENTION_RATE,
  SellerAnalyticsMetric.VENDOR_CHURN_RATE,
  SellerAnalyticsMetric.VENDOR_QUALITY_SCORE,
];

/**
 * Seller performance metrics
 */
export const SELLER_PERFORMANCE_METRICS: SellerAnalyticsMetric[] = [
  SellerAnalyticsMetric.VENDOR_FULFILLMENT_RATE,
  SellerAnalyticsMetric.VENDOR_ON_TIME_DELIVERY,
  SellerAnalyticsMetric.VENDOR_RESPONSE_TIME,
  SellerAnalyticsMetric.VENDOR_RESOLUTION_RATE,
  SellerAnalyticsMetric.VENDOR_RATING,
  SellerAnalyticsMetric.VENDOR_QUALITY_SCORE,
];

/**
 * Seller financial metrics
 */
export const SELLER_FINANCIAL_METRICS: SellerAnalyticsMetric[] = [
  SellerAnalyticsMetric.VENDOR_REVENUE,
  SellerAnalyticsMetric.VENDOR_SALES,
  SellerAnalyticsMetric.VENDOR_COMMISSION,
  SellerAnalyticsMetric.VENDOR_PROFIT_MARGIN,
  SellerAnalyticsMetric.VENDOR_REVENUE_PER_PRODUCT,
  SellerAnalyticsMetric.VENDOR_ACQUISITION_COST,
];

/**
 * Seller growth metrics
 */
export const SELLER_GROWTH_METRICS: SellerAnalyticsMetric[] = [
  SellerAnalyticsMetric.VENDOR_GROWTH_RATE,
  SellerAnalyticsMetric.VENDOR_RETENTION_RATE,
  SellerAnalyticsMetric.VENDOR_CHURN_RATE,
  SellerAnalyticsMetric.ACTIVE_VENDORS,
  SellerAnalyticsMetric.VENDOR_PRODUCT_COUNT,
];

/**
 * Seller distribution metrics
 */
export const SELLER_DISTRIBUTION_METRICS: SellerAnalyticsMetric[] = [
  SellerAnalyticsMetric.VENDOR_TIER_DISTRIBUTION,
  SellerAnalyticsMetric.VENDOR_CATEGORY_SPECIALIZATION,
  SellerAnalyticsMetric.VENDOR_GEOGRAPHIC_DISTRIBUTION,
  SellerAnalyticsMetric.AVG_VENDORS_PER_CATEGORY,
];
