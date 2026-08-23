/**
 * Inventory Analytics Metric Constants
 * Metrics for measuring inventory performance and health
 */

export const INVENTORY_ANALYTICS_METRIC = {
  // Stock Level Metrics
  STOCK_LEVEL_METRICS: {
    TOTAL_STOCK: 'total_stock',
    TOTAL_STOCK_VALUE: 'total_stock_value',
    AVG_STOCK_LEVEL: 'avg_stock_level',
    MAX_STOCK_LEVEL: 'max_stock_level',
    MIN_STOCK_LEVEL: 'min_stock_level',
    STOCK_LEVEL_RANGE: 'stock_level_range',
    STOCK_DENSITY: 'stock_density',
  } as const,

  // Stock Movement Metrics
  MOVEMENT_METRICS: {
    STOCK_IN: 'stock_in',
    STOCK_OUT: 'stock_out',
    NET_STOCK_CHANGE: 'net_stock_change',
    STOCK_TURNOVER: 'stock_turnover',
    TURNOVER_RATE: 'turnover_rate',
    STOCK_DAYS: 'stock_days',
    MOVEMENT_FREQUENCY: 'movement_frequency',
  } as const,

  // Stock Health Metrics
  HEALTH_METRICS: {
    STOCK_AVAILABILITY: 'stock_availability',
    STOCK_ACCURACY: 'stock_accuracy',
    STOCK_LOSS_RATE: 'stock_loss_rate',
    DAMAGED_RATE: 'damaged_rate',
    DEFECTIVE_RATE: 'defective_rate',
    RECALL_RATE: 'recall_rate',
    STOCK_QUALITY_SCORE: 'stock_quality_score',
  } as const,

  // Warehouse Metrics
  WAREHOUSE_METRICS: {
    WAREHOUSE_CAPACITY: 'warehouse_capacity',
    WAREHOUSE_UTILIZATION: 'warehouse_utilization',
    AVG_WAREHOUSE_OCCUPANCY: 'avg_warehouse_occupancy',
    MAX_WAREHOUSE_OCCUPANCY: 'max_warehouse_occupancy',
    MIN_WAREHOUSE_OCCUPANCY: 'min_warehouse_occupancy',
    WAREHOUSE_EFFICIENCY: 'warehouse_efficiency',
    WAREHOUSE_PRODUCTIVITY: 'warehouse_productivity',
  } as const,

  // Supply Chain Metrics
  SUPPLY_CHAIN_METRICS: {
    LEAD_TIME: 'lead_time',
    ORDER_CYCLE_TIME: 'order_cycle_time',
    SUPPLIER_DELIVERY_TIME: 'supplier_delivery_time',
    SUPPLIER_RELIABILITY: 'supplier_reliability',
    SUPPLIER_QUALITY: 'supplier_quality',
    PROCUREMENT_TIME: 'procurement_time',
    SUPPLIER_RESPONSE_TIME: 'supplier_response_time',
  } as const,

  // Demand Metrics
  DEMAND_METRICS: {
    DEMAND_FORECAST: 'demand_forecast',
    DEMAND_ACCURACY: 'demand_accuracy',
    DEMAND_VARIABILITY: 'demand_variability',
    SEASONALITY_INDEX: 'seasonality_index',
    DEMAND_TREND: 'demand_trend',
    DEMAND_PATTERN: 'demand_pattern',
    DEMAND_STABILITY: 'demand_stability',
  } as const,

  // Cost Metrics
  COST_METRICS: {
    TOTAL_INVENTORY_COST: 'total_inventory_cost',
    HOLDING_COST: 'holding_cost',
    ORDERING_COST: 'ordering_cost',
    STOCKOUT_COST: 'stockout_cost',
    COST_PER_UNIT: 'cost_per_unit',
    HOLDING_COST_RATIO: 'holding_cost_ratio',
    ORDERING_COST_RATIO: 'ordering_cost_ratio',
    TOTAL_COST_PER_UNIT: 'total_cost_per_unit',
  } as const,

  // Fulfillment Metrics
  FULFILLMENT_METRICS: {
    FULFILLMENT_RATE: 'fulfillment_rate',
    ORDER_FULFILLMENT_TIME: 'order_fulfillment_time',
    PICKING_ACCURACY: 'picking_accuracy',
    PACKING_ACCURACY: 'packing_accuracy',
    SHIPPING_ACCURACY: 'shipping_accuracy',
    FULFILLMENT_CYCLE_TIME: 'fulfillment_cycle_time',
    FULFILLMENT_EFFICIENCY: 'fulfillment_efficiency',
  } as const,

  // Comparison Metrics
  COMPARISON_METRICS: {
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
    WAREHOUSE_COMPARISON: 'warehouse_comparison',
    SUPPLIER_COMPARISON: 'supplier_comparison',
    CATEGORY_COMPARISON: 'category_comparison',
  } as const,

  // Metric Categories
  CATEGORIES: {
    STOCK_LEVEL: 'stock_level',
    MOVEMENT: 'movement',
    HEALTH: 'health',
    WAREHOUSE: 'warehouse',
    SUPPLY_CHAIN: 'supply_chain',
    DEMAND: 'demand',
    COST: 'cost',
    FULFILLMENT: 'fulfillment',
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
    DURATION: 'duration',
    COUNT: 'count',
  } as const,

  // Metric Formats
  FORMATS: {
    NUMBER: 'number',
    DECIMAL: 'decimal',
    PERCENTAGE: 'percentage',
    CURRENCY: 'currency',
    DURATION: 'duration',
    RATING: 'rating',
    COUNT: 'count',
  } as const,

  // Metric Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,
} as const;

// Inventory Analytics Stock Level Metrics
export type InventoryAnalyticsStockLevelMetric =
  (typeof INVENTORY_ANALYTICS_METRIC.STOCK_LEVEL_METRICS)[keyof typeof INVENTORY_ANALYTICS_METRIC.STOCK_LEVEL_METRICS];

// Inventory Analytics Movement Metrics
export type InventoryAnalyticsMovementMetric =
  (typeof INVENTORY_ANALYTICS_METRIC.MOVEMENT_METRICS)[keyof typeof INVENTORY_ANALYTICS_METRIC.MOVEMENT_METRICS];

// Inventory Analytics Health Metrics
export type InventoryAnalyticsHealthMetric =
  (typeof INVENTORY_ANALYTICS_METRIC.HEALTH_METRICS)[keyof typeof INVENTORY_ANALYTICS_METRIC.HEALTH_METRICS];

// Inventory Analytics Warehouse Metrics
export type InventoryAnalyticsWarehouseMetric =
  (typeof INVENTORY_ANALYTICS_METRIC.WAREHOUSE_METRICS)[keyof typeof INVENTORY_ANALYTICS_METRIC.WAREHOUSE_METRICS];

// Inventory Analytics Supply Chain Metrics
export type InventoryAnalyticsSupplyChainMetric =
  (typeof INVENTORY_ANALYTICS_METRIC.SUPPLY_CHAIN_METRICS)[keyof typeof INVENTORY_ANALYTICS_METRIC.SUPPLY_CHAIN_METRICS];

// Inventory Analytics Demand Metrics
export type InventoryAnalyticsDemandMetric =
  (typeof INVENTORY_ANALYTICS_METRIC.DEMAND_METRICS)[keyof typeof INVENTORY_ANALYTICS_METRIC.DEMAND_METRICS];

// Inventory Analytics Cost Metrics
export type InventoryAnalyticsCostMetric =
  (typeof INVENTORY_ANALYTICS_METRIC.COST_METRICS)[keyof typeof INVENTORY_ANALYTICS_METRIC.COST_METRICS];

// Inventory Analytics Fulfillment Metrics
export type InventoryAnalyticsFulfillmentMetric =
  (typeof INVENTORY_ANALYTICS_METRIC.FULFILLMENT_METRICS)[keyof typeof INVENTORY_ANALYTICS_METRIC.FULFILLMENT_METRICS];

// Inventory Analytics Comparison Metrics
export type InventoryAnalyticsComparisonMetric =
  (typeof INVENTORY_ANALYTICS_METRIC.COMPARISON_METRICS)[keyof typeof INVENTORY_ANALYTICS_METRIC.COMPARISON_METRICS];

// Inventory Analytics Metric Categories
export type InventoryAnalyticsMetricCategory =
  (typeof INVENTORY_ANALYTICS_METRIC.CATEGORIES)[keyof typeof INVENTORY_ANALYTICS_METRIC.CATEGORIES];

// Inventory Analytics Metric Types
export type InventoryAnalyticsMetricType =
  (typeof INVENTORY_ANALYTICS_METRIC.TYPES)[keyof typeof INVENTORY_ANALYTICS_METRIC.TYPES];

// Inventory Analytics Metric Formats
export type InventoryAnalyticsMetricFormat =
  (typeof INVENTORY_ANALYTICS_METRIC.FORMATS)[keyof typeof INVENTORY_ANALYTICS_METRIC.FORMATS];

// Inventory Analytics Metric Priority
export type InventoryAnalyticsMetricPriority =
  (typeof INVENTORY_ANALYTICS_METRIC.PRIORITY)[keyof typeof INVENTORY_ANALYTICS_METRIC.PRIORITY];

// Inventory Analytics Metric Labels
export function getInventoryAnalyticsMetricLabel(metric: string): string {
  const labels: Record<string, string> = {
    // Stock Level Metrics
    total_stock: 'Total Stock',
    total_stock_value: 'Total Stock Value',
    avg_stock_level: 'Avg Stock Level',
    max_stock_level: 'Max Stock Level',
    min_stock_level: 'Min Stock Level',
    stock_level_range: 'Stock Level Range',
    stock_density: 'Stock Density',

    // Movement Metrics
    stock_in: 'Stock In',
    stock_out: 'Stock Out',
    net_stock_change: 'Net Stock Change',
    stock_turnover: 'Stock Turnover',
    turnover_rate: 'Turnover Rate',
    stock_days: 'Stock Days',
    movement_frequency: 'Movement Frequency',

    // Health Metrics
    stock_availability: 'Stock Availability',
    stock_accuracy: 'Stock Accuracy',
    stock_loss_rate: 'Stock Loss Rate',
    damaged_rate: 'Damaged Rate',
    defective_rate: 'Defective Rate',
    recall_rate: 'Recall Rate',
    stock_quality_score: 'Stock Quality Score',

    // Warehouse Metrics
    warehouse_capacity: 'Warehouse Capacity',
    warehouse_utilization: 'Warehouse Utilization',
    avg_warehouse_occupancy: 'Avg Warehouse Occupancy',
    max_warehouse_occupancy: 'Max Warehouse Occupancy',
    min_warehouse_occupancy: 'Min Warehouse Occupancy',
    warehouse_efficiency: 'Warehouse Efficiency',
    warehouse_productivity: 'Warehouse Productivity',

    // Supply Chain Metrics
    lead_time: 'Lead Time',
    order_cycle_time: 'Order Cycle Time',
    supplier_delivery_time: 'Supplier Delivery Time',
    supplier_reliability: 'Supplier Reliability',
    supplier_quality: 'Supplier Quality',
    procurement_time: 'Procurement Time',
    supplier_response_time: 'Supplier Response Time',

    // Demand Metrics
    demand_forecast: 'Demand Forecast',
    demand_accuracy: 'Demand Accuracy',
    demand_variability: 'Demand Variability',
    seasonality_index: 'Seasonality Index',
    demand_trend: 'Demand Trend',
    demand_pattern: 'Demand Pattern',
    demand_stability: 'Demand Stability',

    // Cost Metrics
    total_inventory_cost: 'Total Inventory Cost',
    holding_cost: 'Holding Cost',
    ordering_cost: 'Ordering Cost',
    stockout_cost: 'Stockout Cost',
    cost_per_unit: 'Cost Per Unit',
    holding_cost_ratio: 'Holding Cost Ratio',
    ordering_cost_ratio: 'Ordering Cost Ratio',
    total_cost_per_unit: 'Total Cost Per Unit',

    // Fulfillment Metrics
    fulfillment_rate: 'Fulfillment Rate',
    order_fulfillment_time: 'Order Fulfillment Time',
    picking_accuracy: 'Picking Accuracy',
    packing_accuracy: 'Packing Accuracy',
    shipping_accuracy: 'Shipping Accuracy',
    fulfillment_cycle_time: 'Fulfillment Cycle Time',
    fulfillment_efficiency: 'Fulfillment Efficiency',

    // Comparison Metrics
    year_over_year: 'Year Over Year',
    quarter_over_quarter: 'Quarter Over Quarter',
    month_over_month: 'Month Over Month',
    period_comparison: 'Period Comparison',
    warehouse_comparison: 'Warehouse Comparison',
    supplier_comparison: 'Supplier Comparison',
    category_comparison: 'Category Comparison',
  };

  return (
    labels[metric] || metric.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  );
}

// Inventory Analytics Metric Category Labels
export function getInventoryAnalyticsMetricCategoryLabel(
  category: InventoryAnalyticsMetricCategory
): string {
  const labels: Record<InventoryAnalyticsMetricCategory, string> = {
    [INVENTORY_ANALYTICS_METRIC.CATEGORIES.STOCK_LEVEL]: 'Stock Level',
    [INVENTORY_ANALYTICS_METRIC.CATEGORIES.MOVEMENT]: 'Movement',
    [INVENTORY_ANALYTICS_METRIC.CATEGORIES.HEALTH]: 'Health',
    [INVENTORY_ANALYTICS_METRIC.CATEGORIES.WAREHOUSE]: 'Warehouse',
    [INVENTORY_ANALYTICS_METRIC.CATEGORIES.SUPPLY_CHAIN]: 'Supply Chain',
    [INVENTORY_ANALYTICS_METRIC.CATEGORIES.DEMAND]: 'Demand',
    [INVENTORY_ANALYTICS_METRIC.CATEGORIES.COST]: 'Cost',
    [INVENTORY_ANALYTICS_METRIC.CATEGORIES.FULFILLMENT]: 'Fulfillment',
    [INVENTORY_ANALYTICS_METRIC.CATEGORIES.COMPARISON]: 'Comparison',
  };
  return labels[category] || 'Unknown';
}

// Inventory Analytics Metric Type Labels
export function getInventoryAnalyticsMetricTypeLabel(type: InventoryAnalyticsMetricType): string {
  const labels: Record<InventoryAnalyticsMetricType, string> = {
    [INVENTORY_ANALYTICS_METRIC.TYPES.ABSOLUTE]: 'Absolute',
    [INVENTORY_ANALYTICS_METRIC.TYPES.AVERAGE]: 'Average',
    [INVENTORY_ANALYTICS_METRIC.TYPES.PERCENTAGE]: 'Percentage',
    [INVENTORY_ANALYTICS_METRIC.TYPES.RATIO]: 'Ratio',
    [INVENTORY_ANALYTICS_METRIC.TYPES.RATE]: 'Rate',
    [INVENTORY_ANALYTICS_METRIC.TYPES.SCORE]: 'Score',
    [INVENTORY_ANALYTICS_METRIC.TYPES.DURATION]: 'Duration',
    [INVENTORY_ANALYTICS_METRIC.TYPES.COUNT]: 'Count',
  };
  return labels[type] || 'Unknown';
}

// Inventory Analytics Metric Format Labels
export function getInventoryAnalyticsMetricFormatLabel(
  format: InventoryAnalyticsMetricFormat
): string {
  const labels: Record<InventoryAnalyticsMetricFormat, string> = {
    [INVENTORY_ANALYTICS_METRIC.FORMATS.NUMBER]: 'Number',
    [INVENTORY_ANALYTICS_METRIC.FORMATS.DECIMAL]: 'Decimal',
    [INVENTORY_ANALYTICS_METRIC.FORMATS.PERCENTAGE]: 'Percentage',
    [INVENTORY_ANALYTICS_METRIC.FORMATS.CURRENCY]: 'Currency',
    [INVENTORY_ANALYTICS_METRIC.FORMATS.DURATION]: 'Duration',
    [INVENTORY_ANALYTICS_METRIC.FORMATS.RATING]: 'Rating',
    [INVENTORY_ANALYTICS_METRIC.FORMATS.COUNT]: 'Count',
  };
  return labels[format] || 'Unknown';
}

// Inventory Analytics Metric Priority Labels
export function getInventoryAnalyticsMetricPriorityLabel(
  priority: InventoryAnalyticsMetricPriority
): string {
  const labels: Record<InventoryAnalyticsMetricPriority, string> = {
    [INVENTORY_ANALYTICS_METRIC.PRIORITY.CRITICAL]: 'Critical',
    [INVENTORY_ANALYTICS_METRIC.PRIORITY.HIGH]: 'High',
    [INVENTORY_ANALYTICS_METRIC.PRIORITY.MEDIUM]: 'Medium',
    [INVENTORY_ANALYTICS_METRIC.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Get metric category
export function getInventoryAnalyticsMetricCategory(
  metric: string
): InventoryAnalyticsMetricCategory {
  const stockLevelMetrics = Object.values(
    INVENTORY_ANALYTICS_METRIC.STOCK_LEVEL_METRICS
  ) as readonly string[];
  const movementMetrics = Object.values(
    INVENTORY_ANALYTICS_METRIC.MOVEMENT_METRICS
  ) as readonly string[];
  const healthMetrics = Object.values(
    INVENTORY_ANALYTICS_METRIC.HEALTH_METRICS
  ) as readonly string[];
  const warehouseMetrics = Object.values(
    INVENTORY_ANALYTICS_METRIC.WAREHOUSE_METRICS
  ) as readonly string[];
  const supplyChainMetrics = Object.values(
    INVENTORY_ANALYTICS_METRIC.SUPPLY_CHAIN_METRICS
  ) as readonly string[];
  const demandMetrics = Object.values(
    INVENTORY_ANALYTICS_METRIC.DEMAND_METRICS
  ) as readonly string[];
  const costMetrics = Object.values(INVENTORY_ANALYTICS_METRIC.COST_METRICS) as readonly string[];
  const fulfillmentMetrics = Object.values(
    INVENTORY_ANALYTICS_METRIC.FULFILLMENT_METRICS
  ) as readonly string[];
  const comparisonMetrics = Object.values(
    INVENTORY_ANALYTICS_METRIC.COMPARISON_METRICS
  ) as readonly string[];

  if (stockLevelMetrics.includes(metric)) return INVENTORY_ANALYTICS_METRIC.CATEGORIES.STOCK_LEVEL;
  if (movementMetrics.includes(metric)) return INVENTORY_ANALYTICS_METRIC.CATEGORIES.MOVEMENT;
  if (healthMetrics.includes(metric)) return INVENTORY_ANALYTICS_METRIC.CATEGORIES.HEALTH;
  if (warehouseMetrics.includes(metric)) return INVENTORY_ANALYTICS_METRIC.CATEGORIES.WAREHOUSE;
  if (supplyChainMetrics.includes(metric))
    return INVENTORY_ANALYTICS_METRIC.CATEGORIES.SUPPLY_CHAIN;
  if (demandMetrics.includes(metric)) return INVENTORY_ANALYTICS_METRIC.CATEGORIES.DEMAND;
  if (costMetrics.includes(metric)) return INVENTORY_ANALYTICS_METRIC.CATEGORIES.COST;
  if (fulfillmentMetrics.includes(metric)) return INVENTORY_ANALYTICS_METRIC.CATEGORIES.FULFILLMENT;
  if (comparisonMetrics.includes(metric)) return INVENTORY_ANALYTICS_METRIC.CATEGORIES.COMPARISON;

  return INVENTORY_ANALYTICS_METRIC.CATEGORIES.STOCK_LEVEL;
}

// Get metric type
export function getInventoryAnalyticsMetricType(metric: string): InventoryAnalyticsMetricType {
  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'accuracy',
    'availability',
    'utilization',
    'reliability',
    'quality',
    'efficiency',
    'productivity',
    'stability',
    'turnover',
    'loss',
    'damaged',
    'defective',
    'recall',
    'fulfillment',
    'growth',
    'change',
  ];

  const averageMetrics: string[] = ['avg', 'average', 'mean'];

  const durationMetrics: string[] = [
    'time',
    'duration',
    'cycle',
    'lead',
    'procurement',
    'delivery',
    'response',
    'fulfillment',
  ];

  const scoreMetrics: string[] = ['score'];

  const lowerMetric = metric.toLowerCase();

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return INVENTORY_ANALYTICS_METRIC.TYPES.DURATION;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return INVENTORY_ANALYTICS_METRIC.TYPES.PERCENTAGE;
  }

  if (averageMetrics.some((am) => lowerMetric.includes(am))) {
    return INVENTORY_ANALYTICS_METRIC.TYPES.AVERAGE;
  }

  if (scoreMetrics.some((sm) => lowerMetric.includes(sm))) {
    return INVENTORY_ANALYTICS_METRIC.TYPES.SCORE;
  }

  return INVENTORY_ANALYTICS_METRIC.TYPES.ABSOLUTE;
}

// Get metric format
export function getInventoryAnalyticsMetricFormat(metric: string): InventoryAnalyticsMetricFormat {
  const currencyMetrics: string[] = ['cost', 'value', 'price'];

  const percentageMetrics: string[] = [
    'rate',
    'percentage',
    'accuracy',
    'availability',
    'utilization',
    'reliability',
    'quality',
    'efficiency',
    'productivity',
    'stability',
    'turnover',
    'loss',
    'damaged',
    'defective',
    'recall',
    'fulfillment',
    'growth',
    'change',
  ];

  const durationMetrics: string[] = [
    'time',
    'duration',
    'cycle',
    'lead',
    'procurement',
    'delivery',
    'response',
    'fulfillment',
  ];

  const ratingMetrics: string[] = ['score'];

  const lowerMetric = metric.toLowerCase();

  if (currencyMetrics.some((cm) => lowerMetric.includes(cm))) {
    return INVENTORY_ANALYTICS_METRIC.FORMATS.CURRENCY;
  }

  if (durationMetrics.some((dm) => lowerMetric.includes(dm))) {
    return INVENTORY_ANALYTICS_METRIC.FORMATS.DURATION;
  }

  if (ratingMetrics.some((rm) => lowerMetric.includes(rm))) {
    return INVENTORY_ANALYTICS_METRIC.FORMATS.RATING;
  }

  if (percentageMetrics.some((pm) => lowerMetric.includes(pm))) {
    return INVENTORY_ANALYTICS_METRIC.FORMATS.PERCENTAGE;
  }

  return INVENTORY_ANALYTICS_METRIC.FORMATS.NUMBER;
}

// Calculate turnover rate
export function calculateInventoryAnalyticsTurnoverRate(
  costOfGoodsSold: number,
  avgInventory: number
): number {
  if (avgInventory === 0) return 0;
  return costOfGoodsSold / avgInventory;
}

// Calculate stock days
export function calculateInventoryAnalyticsStockDays(
  avgInventory: number,
  dailyDemand: number
): number {
  if (dailyDemand === 0) return 0;
  return avgInventory / dailyDemand;
}

// Calculate stock availability
export function calculateInventoryAnalyticsStockAvailability(
  availableStock: number,
  totalDemand: number
): number {
  if (totalDemand === 0) return 0;
  return (availableStock / totalDemand) * 100;
}

// Calculate stock accuracy
export function calculateInventoryAnalyticsStockAccuracy(
  actualStock: number,
  recordedStock: number
): number {
  if (recordedStock === 0) return 0;
  return (actualStock / recordedStock) * 100;
}

// Calculate warehouse utilization
export function calculateInventoryAnalyticsWarehouseUtilization(
  usedSpace: number,
  totalSpace: number
): number {
  if (totalSpace === 0) return 0;
  return (usedSpace / totalSpace) * 100;
}

// Calculate demand accuracy
export function calculateInventoryAnalyticsDemandAccuracy(
  forecastedDemand: number,
  actualDemand: number
): number {
  if (actualDemand === 0) return 0;
  return 100 - (Math.abs(forecastedDemand - actualDemand) / actualDemand) * 100;
}

// Calculate holding cost ratio
export function calculateInventoryAnalyticsHoldingCostRatio(
  holdingCost: number,
  totalInventoryValue: number
): number {
  if (totalInventoryValue === 0) return 0;
  return (holdingCost / totalInventoryValue) * 100;
}

// Calculate fulfillment rate
export function calculateInventoryAnalyticsFulfillmentRate(
  fulfilledOrders: number,
  totalOrders: number
): number {
  if (totalOrders === 0) return 0;
  return (fulfilledOrders / totalOrders) * 100;
}
