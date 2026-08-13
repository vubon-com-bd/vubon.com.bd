/**
 * @fileoverview Order analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Order analytics metrics
 */
export enum OrderAnalyticsMetric {
  /** Total number of orders */
  TOTAL_ORDERS = 'TOTAL_ORDERS',
  /** Total order value */
  ORDER_VALUE = 'ORDER_VALUE',
  /** Average order value */
  AVERAGE_ORDER_VALUE = 'AVERAGE_ORDER_VALUE',
  /** Order fulfillment rate percentage */
  ORDER_FULFILLMENT_RATE = 'ORDER_FULFILLMENT_RATE',
  /** Order cancellation rate percentage */
  ORDER_CANCELLATION_RATE = 'ORDER_CANCELLATION_RATE',
  /** Order return rate percentage */
  ORDER_RETURN_RATE = 'ORDER_RETURN_RATE',
  /** Order delivery time in hours */
  ORDER_DELIVERY_TIME = 'ORDER_DELIVERY_TIME',
  /** Order processing time in hours */
  ORDER_PROCESSING_TIME = 'ORDER_PROCESSING_TIME',
  /** Order shipping time in hours */
  ORDER_SHIPPING_TIME = 'ORDER_SHIPPING_TIME',
  /** Order payment method distribution */
  ORDER_PAYMENT_METHOD_DISTRIBUTION = 'ORDER_PAYMENT_METHOD_DISTRIBUTION',
  /** Order shipping method distribution */
  ORDER_SHIPPING_METHOD_DISTRIBUTION = 'ORDER_SHIPPING_METHOD_DISTRIBUTION',
  /** Order value distribution */
  ORDER_VALUE_DISTRIBUTION = 'ORDER_VALUE_DISTRIBUTION',
  /** Order status distribution */
  ORDER_STATUS_DISTRIBUTION = 'ORDER_STATUS_DISTRIBUTION',
  /** Order retention rate percentage */
  ORDER_RETENTION_RATE = 'ORDER_RETENTION_RATE',
  /** Order frequency */
  ORDER_FREQUENCY = 'ORDER_FREQUENCY',
  /** Order seasonality index */
  ORDER_SEASONALITY = 'ORDER_SEASONALITY',
  /** Order peak hours */
  ORDER_PEAK_HOURS = 'ORDER_PEAK_HOURS',
  /** Order day of week */
  ORDER_DAY_OF_WEEK = 'ORDER_DAY_OF_WEEK',
  /** Order channel distribution */
  ORDER_CHANNEL_DISTRIBUTION = 'ORDER_CHANNEL_DISTRIBUTION',
  /** Order region distribution */
  ORDER_REGION_DISTRIBUTION = 'ORDER_REGION_DISTRIBUTION',
  /** Order customer segment */
  ORDER_CUSTOMER_SEGMENT = 'ORDER_CUSTOMER_SEGMENT',
  /** Order repeat rate percentage */
  ORDER_REPEAT_RATE = 'ORDER_REPEAT_RATE',
  /** Order abandonment rate percentage */
  ORDER_ABANDONMENT_RATE = 'ORDER_ABANDONMENT_RATE',
  /** Order conversion rate percentage */
  ORDER_CONVERSION_RATE = 'ORDER_CONVERSION_RATE',
  /** Average order size */
  AVERAGE_ORDER_SIZE = 'AVERAGE_ORDER_SIZE',
  /** Order completion rate */
  ORDER_COMPLETION_RATE = 'ORDER_COMPLETION_RATE',
  /** Order on-time delivery rate */
  ON_TIME_DELIVERY_RATE = 'ON_TIME_DELIVERY_RATE',
  /** Order damage rate */
  ORDER_DAMAGE_RATE = 'ORDER_DAMAGE_RATE',
  /** Order customer satisfaction */
  ORDER_CUSTOMER_SATISFACTION = 'ORDER_CUSTOMER_SATISFACTION',
  /** Order first-time rate */
  ORDER_FIRST_TIME_RATE = 'ORDER_FIRST_TIME_RATE',
  /** Order repeat customer rate */
  ORDER_REPEAT_CUSTOMER_RATE = 'ORDER_REPEAT_CUSTOMER_RATE',
}

/**
 * Order metric type classification
 */
export enum OrderAnalyticsMetricType {
  /** Order count metrics */
  COUNT = 'COUNT',
  /** Order value metrics */
  VALUE = 'VALUE',
  /** Order rate metrics */
  RATE = 'RATE',
  /** Order time metrics */
  TIME = 'TIME',
  /** Order distribution metrics */
  DISTRIBUTION = 'DISTRIBUTION',
  /** Order retention metrics */
  RETENTION = 'RETENTION',
  /** Order quality metrics */
  QUALITY = 'QUALITY',
  /** Order customer metrics */
  CUSTOMER = 'CUSTOMER',
}

/**
 * Order metric category mapping
 */
export const ORDER_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  OrderAnalyticsMetric,
  OrderAnalyticsMetricType
> = {
  [OrderAnalyticsMetric.TOTAL_ORDERS]: OrderAnalyticsMetricType.COUNT,
  [OrderAnalyticsMetric.ORDER_VALUE]: OrderAnalyticsMetricType.VALUE,
  [OrderAnalyticsMetric.AVERAGE_ORDER_VALUE]: OrderAnalyticsMetricType.VALUE,
  [OrderAnalyticsMetric.ORDER_FULFILLMENT_RATE]: OrderAnalyticsMetricType.RATE,
  [OrderAnalyticsMetric.ORDER_CANCELLATION_RATE]: OrderAnalyticsMetricType.RATE,
  [OrderAnalyticsMetric.ORDER_RETURN_RATE]: OrderAnalyticsMetricType.RATE,
  [OrderAnalyticsMetric.ORDER_DELIVERY_TIME]: OrderAnalyticsMetricType.TIME,
  [OrderAnalyticsMetric.ORDER_PROCESSING_TIME]: OrderAnalyticsMetricType.TIME,
  [OrderAnalyticsMetric.ORDER_SHIPPING_TIME]: OrderAnalyticsMetricType.TIME,
  [OrderAnalyticsMetric.ORDER_PAYMENT_METHOD_DISTRIBUTION]: OrderAnalyticsMetricType.DISTRIBUTION,
  [OrderAnalyticsMetric.ORDER_SHIPPING_METHOD_DISTRIBUTION]: OrderAnalyticsMetricType.DISTRIBUTION,
  [OrderAnalyticsMetric.ORDER_VALUE_DISTRIBUTION]: OrderAnalyticsMetricType.DISTRIBUTION,
  [OrderAnalyticsMetric.ORDER_STATUS_DISTRIBUTION]: OrderAnalyticsMetricType.DISTRIBUTION,
  [OrderAnalyticsMetric.ORDER_RETENTION_RATE]: OrderAnalyticsMetricType.RETENTION,
  [OrderAnalyticsMetric.ORDER_FREQUENCY]: OrderAnalyticsMetricType.COUNT,
  [OrderAnalyticsMetric.ORDER_SEASONALITY]: OrderAnalyticsMetricType.COUNT,
  [OrderAnalyticsMetric.ORDER_PEAK_HOURS]: OrderAnalyticsMetricType.TIME,
  [OrderAnalyticsMetric.ORDER_DAY_OF_WEEK]: OrderAnalyticsMetricType.TIME,
  [OrderAnalyticsMetric.ORDER_CHANNEL_DISTRIBUTION]: OrderAnalyticsMetricType.DISTRIBUTION,
  [OrderAnalyticsMetric.ORDER_REGION_DISTRIBUTION]: OrderAnalyticsMetricType.DISTRIBUTION,
  [OrderAnalyticsMetric.ORDER_CUSTOMER_SEGMENT]: OrderAnalyticsMetricType.CUSTOMER,
  [OrderAnalyticsMetric.ORDER_REPEAT_RATE]: OrderAnalyticsMetricType.RETENTION,
  [OrderAnalyticsMetric.ORDER_ABANDONMENT_RATE]: OrderAnalyticsMetricType.RATE,
  [OrderAnalyticsMetric.ORDER_CONVERSION_RATE]: OrderAnalyticsMetricType.RATE,
  [OrderAnalyticsMetric.AVERAGE_ORDER_SIZE]: OrderAnalyticsMetricType.COUNT,
  [OrderAnalyticsMetric.ORDER_COMPLETION_RATE]: OrderAnalyticsMetricType.RATE,
  [OrderAnalyticsMetric.ON_TIME_DELIVERY_RATE]: OrderAnalyticsMetricType.QUALITY,
  [OrderAnalyticsMetric.ORDER_DAMAGE_RATE]: OrderAnalyticsMetricType.QUALITY,
  [OrderAnalyticsMetric.ORDER_CUSTOMER_SATISFACTION]: OrderAnalyticsMetricType.CUSTOMER,
  [OrderAnalyticsMetric.ORDER_FIRST_TIME_RATE]: OrderAnalyticsMetricType.CUSTOMER,
  [OrderAnalyticsMetric.ORDER_REPEAT_CUSTOMER_RATE]: OrderAnalyticsMetricType.RETENTION,
};

/**
 * Order metric format type
 */
export enum OrderAnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Time format (hours) */
  TIME = 'TIME',
  /** Ratio format */
  RATIO = 'RATIO',
  /** Score format */
  SCORE = 'SCORE',
}

/**
 * Order metric configuration
 */
export interface OrderAnalyticsMetricConfig {
  label: string;
  description: string;
  format: OrderAnalyticsMetricFormat;
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

export const ORDER_ANALYTICS_METRIC_CONFIG: Record<
  OrderAnalyticsMetric,
  OrderAnalyticsMetricConfig
> = {
  [OrderAnalyticsMetric.TOTAL_ORDERS]: {
    label: 'Total Orders',
    description: 'Total number of orders placed',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'ShoppingBag',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
  },
  [OrderAnalyticsMetric.ORDER_VALUE]: {
    label: 'Order Value',
    description: 'Total value of all orders',
    format: OrderAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [OrderAnalyticsMetric.AVERAGE_ORDER_VALUE]: {
    label: 'Average Order Value',
    description: 'Average value per order',
    format: OrderAnalyticsMetricFormat.CURRENCY,
    icon: 'ShoppingCart',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
  },
  [OrderAnalyticsMetric.ORDER_FULFILLMENT_RATE]: {
    label: 'Fulfillment Rate',
    description: 'Percentage of orders fulfilled successfully',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Package',
    color: '#10B981',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 95,
      average: 85,
      poor: 75,
    },
  },
  [OrderAnalyticsMetric.ORDER_CANCELLATION_RATE]: {
    label: 'Cancellation Rate',
    description: 'Percentage of orders cancelled',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
    icon: 'XCircle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 5,
      average: 10,
      poor: 20,
    },
  },
  [OrderAnalyticsMetric.ORDER_RETURN_RATE]: {
    label: 'Return Rate',
    description: 'Percentage of orders returned',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Undo',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 5,
      average: 10,
      poor: 15,
    },
  },
  [OrderAnalyticsMetric.ORDER_DELIVERY_TIME]: {
    label: 'Delivery Time',
    description: 'Average order delivery time in hours',
    format: OrderAnalyticsMetricFormat.TIME,
    icon: 'Truck',
    color: '#6366F1',
    isReversed: true,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_PROCESSING_TIME]: {
    label: 'Processing Time',
    description: 'Average order processing time in hours',
    format: OrderAnalyticsMetricFormat.TIME,
    icon: 'Refresh',
    color: '#8B5CF6',
    isReversed: true,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_SHIPPING_TIME]: {
    label: 'Shipping Time',
    description: 'Average order shipping time in hours',
    format: OrderAnalyticsMetricFormat.TIME,
    icon: 'Truck',
    color: '#10B981',
    isReversed: true,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_PAYMENT_METHOD_DISTRIBUTION]: {
    label: 'Payment Method Distribution',
    description: 'Distribution of orders by payment method',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'CreditCard',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_SHIPPING_METHOD_DISTRIBUTION]: {
    label: 'Shipping Method Distribution',
    description: 'Distribution of orders by shipping method',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'Truck',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_VALUE_DISTRIBUTION]: {
    label: 'Order Value Distribution',
    description: 'Distribution of orders by value range',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_STATUS_DISTRIBUTION]: {
    label: 'Order Status Distribution',
    description: 'Distribution of orders by status',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'List',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_RETENTION_RATE]: {
    label: 'Order Retention Rate',
    description: 'Percentage of orders that are repeat orders',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#10B981',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 60,
      average: 45,
      poor: 30,
    },
  },
  [OrderAnalyticsMetric.ORDER_FREQUENCY]: {
    label: 'Order Frequency',
    description: 'Average number of orders per customer',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'Repeat',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_SEASONALITY]: {
    label: 'Order Seasonality',
    description: 'Seasonal variation in order volume',
    format: OrderAnalyticsMetricFormat.RATIO,
    icon: 'Calendar',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_PEAK_HOURS]: {
    label: 'Peak Hours',
    description: 'Hours with highest order volume',
    format: OrderAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#6366F1',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_DAY_OF_WEEK]: {
    label: 'Day of Week',
    description: 'Distribution of orders by day of week',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'Calendar',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_CHANNEL_DISTRIBUTION]: {
    label: 'Channel Distribution',
    description: 'Distribution of orders by sales channel',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'Layers',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_REGION_DISTRIBUTION]: {
    label: 'Region Distribution',
    description: 'Distribution of orders by region',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'MapPin',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_CUSTOMER_SEGMENT]: {
    label: 'Customer Segment',
    description: 'Distribution of orders by customer segment',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_REPEAT_RATE]: {
    label: 'Repeat Rate',
    description: 'Percentage of orders from repeat customers',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
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
  [OrderAnalyticsMetric.ORDER_ABANDONMENT_RATE]: {
    label: 'Abandonment Rate',
    description: 'Percentage of orders abandoned during checkout',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
    icon: 'XCircle',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 20,
      average: 35,
      poor: 50,
    },
  },
  [OrderAnalyticsMetric.ORDER_CONVERSION_RATE]: {
    label: 'Conversion Rate',
    description: 'Percentage of visits that result in orders',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
    icon: 'TrendingUp',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 5,
      average: 3,
      poor: 1,
    },
  },
  [OrderAnalyticsMetric.AVERAGE_ORDER_SIZE]: {
    label: 'Average Order Size',
    description: 'Average number of items per order',
    format: OrderAnalyticsMetricFormat.NUMBER,
    icon: 'Package',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_COMPLETION_RATE]: {
    label: 'Completion Rate',
    description: 'Percentage of orders completed successfully',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
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
  [OrderAnalyticsMetric.ON_TIME_DELIVERY_RATE]: {
    label: 'On-Time Delivery Rate',
    description: 'Percentage of orders delivered on time',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Clock',
    color: '#10B981',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 95,
      average: 85,
      poor: 75,
    },
  },
  [OrderAnalyticsMetric.ORDER_DAMAGE_RATE]: {
    label: 'Damage Rate',
    description: 'Percentage of orders received damaged',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
    icon: 'AlertTriangle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 1,
      average: 3,
      poor: 5,
    },
  },
  [OrderAnalyticsMetric.ORDER_CUSTOMER_SATISFACTION]: {
    label: 'Customer Satisfaction',
    description: 'Order customer satisfaction score',
    format: OrderAnalyticsMetricFormat.SCORE,
    icon: 'Smile',
    color: '#F59E0B',
    isReversed: false,
    priority: 1,
  },
  [OrderAnalyticsMetric.ORDER_FIRST_TIME_RATE]: {
    label: 'First-Time Rate',
    description: 'Percentage of orders from first-time customers',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserPlus',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [OrderAnalyticsMetric.ORDER_REPEAT_CUSTOMER_RATE]: {
    label: 'Repeat Customer Rate',
    description: 'Percentage of orders from repeat customers',
    format: OrderAnalyticsMetricFormat.PERCENTAGE,
    icon: 'UserCheck',
    color: '#10B981',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 50,
      average: 35,
      poor: 20,
    },
  },
};

/**
 * Get order metric category
 */
export function getOrderMetricCategory(metric: OrderAnalyticsMetric): OrderAnalyticsMetricType {
  return ORDER_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get order metric label
 */
export function getOrderMetricLabel(metric: OrderAnalyticsMetric): string {
  return ORDER_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get order metric description
 */
export function getOrderMetricDescription(metric: OrderAnalyticsMetric): string {
  return ORDER_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get order metric format
 */
export function getOrderMetricFormat(metric: OrderAnalyticsMetric): OrderAnalyticsMetricFormat {
  return ORDER_ANALYTICS_METRIC_CONFIG[metric]?.format || OrderAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if order metric is reversed (lower is better)
 */
export function isOrderMetricReversed(metric: OrderAnalyticsMetric): boolean {
  return ORDER_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get order metrics by category
 */
export function getOrderMetricsByCategory(
  category: OrderAnalyticsMetricType
): OrderAnalyticsMetric[] {
  return Object.entries(ORDER_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as OrderAnalyticsMetric);
}

/**
 * Format order metric value
 */
export function formatOrderMetricValue(metric: OrderAnalyticsMetric, value: number): string {
  const format = getOrderMetricFormat(metric);

  switch (format) {
    case OrderAnalyticsMetricFormat.CURRENCY:
      return `$${value.toFixed(2)}`;
    case OrderAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case OrderAnalyticsMetricFormat.TIME:
      if (value >= 24) {
        const days = Math.floor(value / 24);
        const hours = Math.round(value % 24);
        return `${days}d ${hours}h`;
      }
      return `${Math.round(value)} hours`;
    case OrderAnalyticsMetricFormat.SCORE:
      return value.toFixed(1);
    case OrderAnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get order metric priority
 */
export function getOrderMetricPriority(metric: OrderAnalyticsMetric): number {
  return ORDER_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority order metrics
 */
export function getHighPriorityOrderMetrics(): OrderAnalyticsMetric[] {
  return Object.values(OrderAnalyticsMetric).filter(
    (metric) => getOrderMetricPriority(metric) === 1
  );
}

/**
 * Get order metric thresholds
 */
export function getOrderMetricThreshold(
  metric: OrderAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return ORDER_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate order metric performance
 */
export function evaluateOrderMetricPerformance(
  metric: OrderAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getOrderMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isOrderMetricReversed(metric);

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
 * Order dashboard metrics
 */
export const ORDER_DASHBOARD_METRICS: OrderAnalyticsMetric[] = [
  OrderAnalyticsMetric.TOTAL_ORDERS,
  OrderAnalyticsMetric.ORDER_VALUE,
  OrderAnalyticsMetric.AVERAGE_ORDER_VALUE,
  OrderAnalyticsMetric.ORDER_CONVERSION_RATE,
  OrderAnalyticsMetric.ORDER_ABANDONMENT_RATE,
  OrderAnalyticsMetric.ORDER_FULFILLMENT_RATE,
  OrderAnalyticsMetric.ORDER_RETENTION_RATE,
  OrderAnalyticsMetric.ORDER_DELIVERY_TIME,
];

/**
 * Order performance metrics
 */
export const ORDER_PERFORMANCE_METRICS: OrderAnalyticsMetric[] = [
  OrderAnalyticsMetric.ORDER_FULFILLMENT_RATE,
  OrderAnalyticsMetric.ORDER_COMPLETION_RATE,
  OrderAnalyticsMetric.ON_TIME_DELIVERY_RATE,
  OrderAnalyticsMetric.ORDER_PROCESSING_TIME,
  OrderAnalyticsMetric.ORDER_SHIPPING_TIME,
  OrderAnalyticsMetric.ORDER_DELIVERY_TIME,
];

/**
 * Order quality metrics
 */
export const ORDER_QUALITY_METRICS: OrderAnalyticsMetric[] = [
  OrderAnalyticsMetric.ORDER_RETURN_RATE,
  OrderAnalyticsMetric.ORDER_DAMAGE_RATE,
  OrderAnalyticsMetric.ORDER_CUSTOMER_SATISFACTION,
  OrderAnalyticsMetric.ORDER_CANCELLATION_RATE,
];

/**
 * Order customer metrics
 */
export const ORDER_CUSTOMER_METRICS: OrderAnalyticsMetric[] = [
  OrderAnalyticsMetric.ORDER_REPEAT_RATE,
  OrderAnalyticsMetric.ORDER_RETENTION_RATE,
  OrderAnalyticsMetric.ORDER_FIRST_TIME_RATE,
  OrderAnalyticsMetric.ORDER_REPEAT_CUSTOMER_RATE,
  OrderAnalyticsMetric.ORDER_CUSTOMER_SEGMENT,
  OrderAnalyticsMetric.ORDER_FREQUENCY,
];

/**
 * Order distribution metrics
 */
export const ORDER_DISTRIBUTION_METRICS: OrderAnalyticsMetric[] = [
  OrderAnalyticsMetric.ORDER_PAYMENT_METHOD_DISTRIBUTION,
  OrderAnalyticsMetric.ORDER_SHIPPING_METHOD_DISTRIBUTION,
  OrderAnalyticsMetric.ORDER_VALUE_DISTRIBUTION,
  OrderAnalyticsMetric.ORDER_STATUS_DISTRIBUTION,
  OrderAnalyticsMetric.ORDER_CHANNEL_DISTRIBUTION,
  OrderAnalyticsMetric.ORDER_REGION_DISTRIBUTION,
  OrderAnalyticsMetric.ORDER_DAY_OF_WEEK,
  OrderAnalyticsMetric.ORDER_PEAK_HOURS,
  OrderAnalyticsMetric.ORDER_SEASONALITY,
];
