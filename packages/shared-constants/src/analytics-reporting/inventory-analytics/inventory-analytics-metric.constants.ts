/**
 * @fileoverview Inventory analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Inventory analytics metrics
 */
export enum InventoryAnalyticsMetric {
  /** Total inventory value */
  TOTAL_INVENTORY_VALUE = 'TOTAL_INVENTORY_VALUE',
  /** Inventory turnover rate */
  INVENTORY_TURNOVER_RATE = 'INVENTORY_TURNOVER_RATE',
  /** Days of inventory on hand */
  DAYS_OF_INVENTORY_ON_HAND = 'DAYS_OF_INVENTORY_ON_HAND',
  /** Stockout rate percentage */
  STOCKOUT_RATE = 'STOCKOUT_RATE',
  /** Reorder point */
  REORDER_POINT = 'REORDER_POINT',
  /** Safety stock level */
  SAFETY_STOCK_LEVEL = 'SAFETY_STOCK_LEVEL',
  /** Warehouse capacity utilization percentage */
  WAREHOUSE_CAPACITY_UTILIZATION = 'WAREHOUSE_CAPACITY_UTILIZATION',
  /** Demand forecast accuracy percentage */
  DEMAND_FORECAST_ACCURACY = 'DEMAND_FORECAST_ACCURACY',
  /** Lead time in days */
  LEAD_TIME_DAYS = 'LEAD_TIME_DAYS',
  /** Supplier lead time in days */
  SUPPLIER_LEAD_TIME = 'SUPPLIER_LEAD_TIME',
  /** Economic order quantity */
  ECONOMIC_ORDER_QUANTITY = 'ECONOMIC_ORDER_QUANTITY',
  /** Carrying cost percentage */
  CARRYING_COST = 'CARRYING_COST',
  /** Ordering cost */
  ORDERING_COST = 'ORDERING_COST',
  /** Total inventory cost */
  TOTAL_INVENTORY_COST = 'TOTAL_INVENTORY_COST',
  /** Inventory accuracy rate percentage */
  INVENTORY_ACCURACY_RATE = 'INVENTORY_ACCURACY_RATE',
  /** Shipping accuracy rate percentage */
  SHIPPING_ACCURACY_RATE = 'SHIPPING_ACCURACY_RATE',
  /** Backorder rate percentage */
  BACKORDER_RATE = 'BACKORDER_RATE',
  /** Fill rate percentage */
  FILL_RATE = 'FILL_RATE',
  /** Inventory shrinkage rate percentage */
  INVENTORY_SHRINKAGE_RATE = 'INVENTORY_SHRINKAGE_RATE',
  /** Aging inventory value */
  AGING_INVENTORY_VALUE = 'AGING_INVENTORY_VALUE',
  /** Slow moving inventory percentage */
  SLOW_MOVING_INVENTORY_PERCENTAGE = 'SLOW_MOVING_INVENTORY_PERCENTAGE',
  /** Fast moving inventory percentage */
  FAST_MOVING_INVENTORY_PERCENTAGE = 'FAST_MOVING_INVENTORY_PERCENTAGE',
  /** Seasonal index */
  SEASONAL_INDEX = 'SEASONAL_INDEX',
  /** Safety stock days */
  SAFETY_STOCK_DAYS = 'SAFETY_STOCK_DAYS',
  /** Reorder frequency */
  REORDER_FREQUENCY = 'REORDER_FREQUENCY',
  /** Inventory velocity */
  INVENTORY_VELOCITY = 'INVENTORY_VELOCITY',
  /** Inventory turnover days */
  INVENTORY_TURNOVER_DAYS = 'INVENTORY_TURNOVER_DAYS',
  /** Gross margin return on inventory */
  GMROI = 'GMROI',
  /** Inventory to sales ratio */
  INVENTORY_TO_SALES_RATIO = 'INVENTORY_TO_SALES_RATIO',
  /** Stock coverage days */
  STOCK_COVERAGE_DAYS = 'STOCK_COVERAGE_DAYS',
  /** Inventory obsolescence rate */
  OBSOLESCENCE_RATE = 'OBSOLESCENCE_RATE',
}

/**
 * Inventory metric type classification
 */
export enum InventoryAnalyticsMetricType {
  /** Value metrics */
  VALUE = 'VALUE',
  /** Rate metrics */
  RATE = 'RATE',
  /** Time metrics */
  TIME = 'TIME',
  /** Cost metrics */
  COST = 'COST',
  /** Accuracy metrics */
  ACCURACY = 'ACCURACY',
  /** Efficiency metrics */
  EFFICIENCY = 'EFFICIENCY',
  /** Performance metrics */
  PERFORMANCE = 'PERFORMANCE',
}

/**
 * Inventory metric category mapping
 */
export const INVENTORY_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  InventoryAnalyticsMetric,
  InventoryAnalyticsMetricType
> = {
  [InventoryAnalyticsMetric.TOTAL_INVENTORY_VALUE]: InventoryAnalyticsMetricType.VALUE,
  [InventoryAnalyticsMetric.INVENTORY_TURNOVER_RATE]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.DAYS_OF_INVENTORY_ON_HAND]: InventoryAnalyticsMetricType.TIME,
  [InventoryAnalyticsMetric.STOCKOUT_RATE]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.REORDER_POINT]: InventoryAnalyticsMetricType.VALUE,
  [InventoryAnalyticsMetric.SAFETY_STOCK_LEVEL]: InventoryAnalyticsMetricType.VALUE,
  [InventoryAnalyticsMetric.WAREHOUSE_CAPACITY_UTILIZATION]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.DEMAND_FORECAST_ACCURACY]: InventoryAnalyticsMetricType.ACCURACY,
  [InventoryAnalyticsMetric.LEAD_TIME_DAYS]: InventoryAnalyticsMetricType.TIME,
  [InventoryAnalyticsMetric.SUPPLIER_LEAD_TIME]: InventoryAnalyticsMetricType.TIME,
  [InventoryAnalyticsMetric.ECONOMIC_ORDER_QUANTITY]: InventoryAnalyticsMetricType.VALUE,
  [InventoryAnalyticsMetric.CARRYING_COST]: InventoryAnalyticsMetricType.COST,
  [InventoryAnalyticsMetric.ORDERING_COST]: InventoryAnalyticsMetricType.COST,
  [InventoryAnalyticsMetric.TOTAL_INVENTORY_COST]: InventoryAnalyticsMetricType.COST,
  [InventoryAnalyticsMetric.INVENTORY_ACCURACY_RATE]: InventoryAnalyticsMetricType.ACCURACY,
  [InventoryAnalyticsMetric.SHIPPING_ACCURACY_RATE]: InventoryAnalyticsMetricType.ACCURACY,
  [InventoryAnalyticsMetric.BACKORDER_RATE]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.FILL_RATE]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.INVENTORY_SHRINKAGE_RATE]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.AGING_INVENTORY_VALUE]: InventoryAnalyticsMetricType.VALUE,
  [InventoryAnalyticsMetric.SLOW_MOVING_INVENTORY_PERCENTAGE]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.FAST_MOVING_INVENTORY_PERCENTAGE]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.SEASONAL_INDEX]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.SAFETY_STOCK_DAYS]: InventoryAnalyticsMetricType.TIME,
  [InventoryAnalyticsMetric.REORDER_FREQUENCY]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.INVENTORY_VELOCITY]: InventoryAnalyticsMetricType.EFFICIENCY,
  [InventoryAnalyticsMetric.INVENTORY_TURNOVER_DAYS]: InventoryAnalyticsMetricType.TIME,
  [InventoryAnalyticsMetric.GMROI]: InventoryAnalyticsMetricType.PERFORMANCE,
  [InventoryAnalyticsMetric.INVENTORY_TO_SALES_RATIO]: InventoryAnalyticsMetricType.RATE,
  [InventoryAnalyticsMetric.STOCK_COVERAGE_DAYS]: InventoryAnalyticsMetricType.TIME,
  [InventoryAnalyticsMetric.OBSOLESCENCE_RATE]: InventoryAnalyticsMetricType.RATE,
};

/**
 * Inventory metric format type
 */
export enum InventoryAnalyticsMetricFormat {
  /** Currency format */
  CURRENCY = 'CURRENCY',
  /** Percentage format */
  PERCENTAGE = 'PERCENTAGE',
  /** Number format */
  NUMBER = 'NUMBER',
  /** Time format (days) */
  TIME = 'TIME',
  /** Rate format */
  RATE = 'RATE',
  /** Ratio format */
  RATIO = 'RATIO',
}

/**
 * Inventory metric configuration
 */
export interface InventoryAnalyticsMetricConfig {
  label: string;
  description: string;
  format: InventoryAnalyticsMetricFormat;
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

export const INVENTORY_ANALYTICS_METRIC_CONFIG: Record<
  InventoryAnalyticsMetric,
  InventoryAnalyticsMetricConfig
> = {
  [InventoryAnalyticsMetric.TOTAL_INVENTORY_VALUE]: {
    label: 'Total Inventory Value',
    description: 'Total value of inventory on hand',
    format: InventoryAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
  },
  [InventoryAnalyticsMetric.INVENTORY_TURNOVER_RATE]: {
    label: 'Inventory Turnover Rate',
    description: 'Number of times inventory is sold and replaced',
    format: InventoryAnalyticsMetricFormat.RATE,
    icon: 'Repeat',
    color: '#3B82F6',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 12,
      average: 8,
      poor: 4,
    },
  },
  [InventoryAnalyticsMetric.DAYS_OF_INVENTORY_ON_HAND]: {
    label: 'Days of Inventory on Hand',
    description: 'Number of days inventory will last at current usage',
    format: InventoryAnalyticsMetricFormat.TIME,
    icon: 'Calendar',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.STOCKOUT_RATE]: {
    label: 'Stockout Rate',
    description: 'Percentage of time inventory is out of stock',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'AlertTriangle',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 5,
      average: 10,
      poor: 20,
    },
  },
  [InventoryAnalyticsMetric.REORDER_POINT]: {
    label: 'Reorder Point',
    description: 'Inventory level at which to reorder',
    format: InventoryAnalyticsMetricFormat.NUMBER,
    icon: 'ArrowRight',
    color: '#F59E0B',
    isReversed: false,
    priority: 2,
  },
  [InventoryAnalyticsMetric.SAFETY_STOCK_LEVEL]: {
    label: 'Safety Stock Level',
    description: 'Buffer inventory to prevent stockouts',
    format: InventoryAnalyticsMetricFormat.NUMBER,
    icon: 'Shield',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [InventoryAnalyticsMetric.WAREHOUSE_CAPACITY_UTILIZATION]: {
    label: 'Warehouse Capacity Utilization',
    description: 'Percentage of warehouse capacity used',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Building',
    color: '#6366F1',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.DEMAND_FORECAST_ACCURACY]: {
    label: 'Demand Forecast Accuracy',
    description: 'Accuracy of demand forecasts',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Target',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 90,
      average: 80,
      poor: 70,
    },
  },
  [InventoryAnalyticsMetric.LEAD_TIME_DAYS]: {
    label: 'Lead Time',
    description: 'Average time from order to delivery',
    format: InventoryAnalyticsMetricFormat.TIME,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.SUPPLIER_LEAD_TIME]: {
    label: 'Supplier Lead Time',
    description: 'Average supplier delivery time',
    format: InventoryAnalyticsMetricFormat.TIME,
    icon: 'Truck',
    color: '#8B5CF6',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.ECONOMIC_ORDER_QUANTITY]: {
    label: 'Economic Order Quantity',
    description: 'Optimal order quantity to minimize costs',
    format: InventoryAnalyticsMetricFormat.NUMBER,
    icon: 'ShoppingCart',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [InventoryAnalyticsMetric.CARRYING_COST]: {
    label: 'Carrying Cost',
    description: 'Cost to hold inventory',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.ORDERING_COST]: {
    label: 'Ordering Cost',
    description: 'Cost per order',
    format: InventoryAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#F97316',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.TOTAL_INVENTORY_COST]: {
    label: 'Total Inventory Cost',
    description: 'Total cost of inventory management',
    format: InventoryAnalyticsMetricFormat.CURRENCY,
    icon: 'DollarSign',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
  },
  [InventoryAnalyticsMetric.INVENTORY_ACCURACY_RATE]: {
    label: 'Inventory Accuracy Rate',
    description: 'Percentage of inventory records that are accurate',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'CheckCircle',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 98,
      average: 95,
      poor: 90,
    },
  },
  [InventoryAnalyticsMetric.SHIPPING_ACCURACY_RATE]: {
    label: 'Shipping Accuracy Rate',
    description: 'Percentage of orders shipped correctly',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Truck',
    color: '#10B981',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 99,
      average: 97,
      poor: 95,
    },
  },
  [InventoryAnalyticsMetric.BACKORDER_RATE]: {
    label: 'Backorder Rate',
    description: 'Percentage of orders on backorder',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Package',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.FILL_RATE]: {
    label: 'Fill Rate',
    description: 'Percentage of orders filled completely',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Package',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 98,
      average: 95,
      poor: 90,
    },
  },
  [InventoryAnalyticsMetric.INVENTORY_SHRINKAGE_RATE]: {
    label: 'Shrinkage Rate',
    description: 'Percentage of inventory lost to theft, damage, etc.',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'AlertTriangle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.AGING_INVENTORY_VALUE]: {
    label: 'Aging Inventory Value',
    description: 'Value of inventory older than specified period',
    format: InventoryAnalyticsMetricFormat.CURRENCY,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.SLOW_MOVING_INVENTORY_PERCENTAGE]: {
    label: 'Slow Moving Inventory',
    description: 'Percentage of slow moving inventory',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Clock',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.FAST_MOVING_INVENTORY_PERCENTAGE]: {
    label: 'Fast Moving Inventory',
    description: 'Percentage of fast moving inventory',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Zap',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [InventoryAnalyticsMetric.SEASONAL_INDEX]: {
    label: 'Seasonal Index',
    description: 'Seasonal demand index',
    format: InventoryAnalyticsMetricFormat.RATIO,
    icon: 'Calendar',
    color: '#F472B6',
    isReversed: false,
    priority: 2,
  },
  [InventoryAnalyticsMetric.SAFETY_STOCK_DAYS]: {
    label: 'Safety Stock Days',
    description: 'Number of days of safety stock coverage',
    format: InventoryAnalyticsMetricFormat.TIME,
    icon: 'Shield',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [InventoryAnalyticsMetric.REORDER_FREQUENCY]: {
    label: 'Reorder Frequency',
    description: 'Frequency of reorders',
    format: InventoryAnalyticsMetricFormat.RATE,
    icon: 'Repeat',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [InventoryAnalyticsMetric.INVENTORY_VELOCITY]: {
    label: 'Inventory Velocity',
    description: 'Speed of inventory movement',
    format: InventoryAnalyticsMetricFormat.RATE,
    icon: 'Activity',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [InventoryAnalyticsMetric.INVENTORY_TURNOVER_DAYS]: {
    label: 'Inventory Turnover Days',
    description: 'Days to complete one inventory cycle',
    format: InventoryAnalyticsMetricFormat.TIME,
    icon: 'Calendar',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.GMROI]: {
    label: 'GMROI',
    description: 'Gross margin return on inventory investment',
    format: InventoryAnalyticsMetricFormat.RATIO,
    icon: 'DollarSign',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [InventoryAnalyticsMetric.INVENTORY_TO_SALES_RATIO]: {
    label: 'Inventory to Sales Ratio',
    description: 'Ratio of inventory to sales',
    format: InventoryAnalyticsMetricFormat.RATIO,
    icon: 'Scale',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [InventoryAnalyticsMetric.STOCK_COVERAGE_DAYS]: {
    label: 'Stock Coverage Days',
    description: 'Days of stock coverage',
    format: InventoryAnalyticsMetricFormat.TIME,
    icon: 'Calendar',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [InventoryAnalyticsMetric.OBSOLESCENCE_RATE]: {
    label: 'Obsolescence Rate',
    description: 'Percentage of obsolete inventory',
    format: InventoryAnalyticsMetricFormat.PERCENTAGE,
    icon: 'AlertCircle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
};

/**
 * Get inventory metric category
 */
export function getInventoryMetricCategory(
  metric: InventoryAnalyticsMetric
): InventoryAnalyticsMetricType {
  return INVENTORY_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get inventory metric label
 */
export function getInventoryMetricLabel(metric: InventoryAnalyticsMetric): string {
  return INVENTORY_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get inventory metric description
 */
export function getInventoryMetricDescription(metric: InventoryAnalyticsMetric): string {
  return INVENTORY_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get inventory metric format
 */
export function getInventoryMetricFormat(
  metric: InventoryAnalyticsMetric
): InventoryAnalyticsMetricFormat {
  return INVENTORY_ANALYTICS_METRIC_CONFIG[metric]?.format || InventoryAnalyticsMetricFormat.NUMBER;
}

/**
 * Check if inventory metric is reversed (lower is better)
 */
export function isInventoryMetricReversed(metric: InventoryAnalyticsMetric): boolean {
  return INVENTORY_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get inventory metrics by category
 */
export function getInventoryMetricsByCategory(
  category: InventoryAnalyticsMetricType
): InventoryAnalyticsMetric[] {
  return Object.entries(INVENTORY_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as InventoryAnalyticsMetric);
}

/**
 * Format inventory metric value
 */
export function formatInventoryMetricValue(
  metric: InventoryAnalyticsMetric,
  value: number
): string {
  const format = getInventoryMetricFormat(metric);

  switch (format) {
    case InventoryAnalyticsMetricFormat.CURRENCY:
      if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
      }
      if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}K`;
      }
      return `$${value.toFixed(2)}`;
    case InventoryAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case InventoryAnalyticsMetricFormat.TIME:
      return `${Math.round(value)} days`;
    case InventoryAnalyticsMetricFormat.RATE:
      return value.toFixed(2);
    case InventoryAnalyticsMetricFormat.RATIO:
      return value.toFixed(2);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get inventory metric priority
 */
export function getInventoryMetricPriority(metric: InventoryAnalyticsMetric): number {
  return INVENTORY_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority inventory metrics
 */
export function getHighPriorityInventoryMetrics(): InventoryAnalyticsMetric[] {
  return Object.values(InventoryAnalyticsMetric).filter(
    (metric) => getInventoryMetricPriority(metric) === 1
  );
}

/**
 * Get inventory metric thresholds
 */
export function getInventoryMetricThreshold(
  metric: InventoryAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return INVENTORY_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate inventory metric performance
 */
export function evaluateInventoryMetricPerformance(
  metric: InventoryAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getInventoryMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isInventoryMetricReversed(metric);

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
 * Inventory dashboard metrics
 */
export const INVENTORY_DASHBOARD_METRICS: InventoryAnalyticsMetric[] = [
  InventoryAnalyticsMetric.TOTAL_INVENTORY_VALUE,
  InventoryAnalyticsMetric.INVENTORY_TURNOVER_RATE,
  InventoryAnalyticsMetric.DAYS_OF_INVENTORY_ON_HAND,
  InventoryAnalyticsMetric.STOCKOUT_RATE,
  InventoryAnalyticsMetric.INVENTORY_ACCURACY_RATE,
  InventoryAnalyticsMetric.FILL_RATE,
  InventoryAnalyticsMetric.TOTAL_INVENTORY_COST,
  InventoryAnalyticsMetric.DEMAND_FORECAST_ACCURACY,
];

/**
 * Inventory performance metrics
 */
export const INVENTORY_PERFORMANCE_METRICS: InventoryAnalyticsMetric[] = [
  InventoryAnalyticsMetric.INVENTORY_TURNOVER_RATE,
  InventoryAnalyticsMetric.FILL_RATE,
  InventoryAnalyticsMetric.BACKORDER_RATE,
  InventoryAnalyticsMetric.STOCKOUT_RATE,
  InventoryAnalyticsMetric.INVENTORY_ACCURACY_RATE,
  InventoryAnalyticsMetric.SHIPPING_ACCURACY_RATE,
  InventoryAnalyticsMetric.INVENTORY_SHRINKAGE_RATE,
];

/**
 * Inventory cost metrics
 */
export const INVENTORY_COST_METRICS: InventoryAnalyticsMetric[] = [
  InventoryAnalyticsMetric.TOTAL_INVENTORY_COST,
  InventoryAnalyticsMetric.CARRYING_COST,
  InventoryAnalyticsMetric.ORDERING_COST,
  InventoryAnalyticsMetric.TOTAL_INVENTORY_VALUE,
  InventoryAnalyticsMetric.GMROI,
];

/**
 * Inventory time metrics
 */
export const INVENTORY_TIME_METRICS: InventoryAnalyticsMetric[] = [
  InventoryAnalyticsMetric.DAYS_OF_INVENTORY_ON_HAND,
  InventoryAnalyticsMetric.LEAD_TIME_DAYS,
  InventoryAnalyticsMetric.SUPPLIER_LEAD_TIME,
  InventoryAnalyticsMetric.INVENTORY_TURNOVER_DAYS,
  InventoryAnalyticsMetric.SAFETY_STOCK_DAYS,
  InventoryAnalyticsMetric.STOCK_COVERAGE_DAYS,
];
