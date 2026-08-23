/**
 * Inventory Analytics Type Constants
 * Types of inventory analytics data and analysis
 */

export const INVENTORY_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Stock Analysis
    STOCK_ANALYSIS: 'stock_analysis',
    STOCK_LEVEL_ANALYSIS: 'stock_level_analysis',
    STOCK_MOVEMENT_ANALYSIS: 'stock_movement_analysis',
    STOCK_TURNOVER_ANALYSIS: 'stock_turnover_analysis',

    // Warehouse Analysis
    WAREHOUSE_ANALYSIS: 'warehouse_analysis',
    WAREHOUSE_CAPACITY_ANALYSIS: 'warehouse_capacity_analysis',
    WAREHOUSE_UTILIZATION_ANALYSIS: 'warehouse_utilization_analysis',

    // Demand Analysis
    DEMAND_ANALYSIS: 'demand_analysis',
    DEMAND_FORECAST_ANALYSIS: 'demand_forecast_analysis',
    DEMAND_PATTERN_ANALYSIS: 'demand_pattern_analysis',

    // Supply Chain Analysis
    SUPPLY_CHAIN_ANALYSIS: 'supply_chain_analysis',
    SUPPLIER_ANALYSIS: 'supplier_analysis',
    PROCUREMENT_ANALYSIS: 'procurement_analysis',

    // Fulfillment Analysis
    FULFILLMENT_ANALYSIS: 'fulfillment_analysis',
    ORDER_FULFILLMENT_ANALYSIS: 'order_fulfillment_analysis',

    // Cost Analysis
    COST_ANALYSIS: 'cost_analysis',
    INVENTORY_COST_ANALYSIS: 'inventory_cost_analysis',

    // Quality Analysis
    QUALITY_ANALYSIS: 'quality_analysis',
    DAMAGE_ANALYSIS: 'damage_analysis',

    // Comparative Analysis
    COMPARATIVE: 'comparative',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
  } as const,

  // Data Types
  DATA_TYPES: {
    STOCK_DATA: 'stock_data',
    WAREHOUSE_DATA: 'warehouse_data',
    PRODUCT_DATA: 'product_data',
    SUPPLIER_DATA: 'supplier_data',
    DEMAND_DATA: 'demand_data',
    FULFILLMENT_DATA: 'fulfillment_data',
    COST_DATA: 'cost_data',
    QUALITY_DATA: 'quality_data',
    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
    REALTIME: 'realtime',
  } as const,

  // Stock Status
  STOCK_STATUS: {
    IN_STOCK: 'in_stock',
    LOW_STOCK: 'low_stock',
    CRITICAL_STOCK: 'critical_stock',
    OUT_OF_STOCK: 'out_of_stock',
    OVERSTOCKED: 'overstocked',
    DISCONTINUED: 'discontinued',
    ON_ORDER: 'on_order',
    BACK_ORDERED: 'back_ordered',
  } as const,

  // Stock Types
  STOCK_TYPES: {
    RAW_MATERIAL: 'raw_material',
    WORK_IN_PROGRESS: 'work_in_progress',
    FINISHED_GOODS: 'finished_goods',
    PACKAGING: 'packaging',
    SPARE_PARTS: 'spare_parts',
    CONSUMABLES: 'consumables',
  } as const,

  // Warehouse Types
  WAREHOUSE_TYPES: {
    DISTRIBUTION: 'distribution',
    FULFILLMENT: 'fulfillment',
    STORAGE: 'storage',
    CROSS_DOCK: 'cross_dock',
    COLD_STORAGE: 'cold_storage',
    HAZMAT: 'hazmat',
  } as const,

  // Demand Patterns
  DEMAND_PATTERNS: {
    STABLE: 'stable',
    SEASONAL: 'seasonal',
    TRENDING: 'trending',
    CYCLICAL: 'cyclical',
    ERRATIC: 'erratic',
    RANDOM: 'random',
  } as const,

  // Fulfillment Status
  FULFILLMENT_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    PICKING: 'picking',
    PACKING: 'packing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    COMPLETED: 'completed',
    PARTIALLY_FULFILLED: 'partially_fulfilled',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Product Movement Types
  MOVEMENT_TYPES: {
    INBOUND: 'inbound',
    OUTBOUND: 'outbound',
    TRANSFER: 'transfer',
    ADJUSTMENT: 'adjustment',
    DAMAGE: 'damage',
    RETURN: 'return',
  } as const,

  // Quality Status
  QUALITY_STATUS: {
    PASSED: 'passed',
    FAILED: 'failed',
    PENDING: 'pending',
    DAMAGED: 'damaged',
    DEFECTIVE: 'defective',
    RECALLED: 'recalled',
  } as const,

  // Cost Categories
  COST_CATEGORIES: {
    HOLDING: 'holding',
    ORDERING: 'ordering',
    SHORTAGE: 'shortage',
    TRANSPORTATION: 'transportation',
    WAREHOUSING: 'warehousing',
    INSURANCE: 'insurance',
    TAX: 'tax',
  } as const,

  // Inventory Performance Levels
  PERFORMANCE_LEVELS: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    BELOW_AVERAGE: 'below_average',
    POOR: 'poor',
    CRITICAL: 'critical',
  } as const,
} as const;

// Inventory Analytics Analysis Types
export type InventoryAnalyticsAnalysisType =
  (typeof INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Inventory Analytics Data Types
export type InventoryAnalyticsDataType =
  (typeof INVENTORY_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof INVENTORY_ANALYTICS_TYPE.DATA_TYPES];

// Inventory Analytics Stock Status
export type InventoryAnalyticsStockStatus =
  (typeof INVENTORY_ANALYTICS_TYPE.STOCK_STATUS)[keyof typeof INVENTORY_ANALYTICS_TYPE.STOCK_STATUS];

// Inventory Analytics Stock Types
export type InventoryAnalyticsStockType =
  (typeof INVENTORY_ANALYTICS_TYPE.STOCK_TYPES)[keyof typeof INVENTORY_ANALYTICS_TYPE.STOCK_TYPES];

// Inventory Analytics Warehouse Types
export type InventoryAnalyticsWarehouseType =
  (typeof INVENTORY_ANALYTICS_TYPE.WAREHOUSE_TYPES)[keyof typeof INVENTORY_ANALYTICS_TYPE.WAREHOUSE_TYPES];

// Inventory Analytics Demand Patterns
export type InventoryAnalyticsDemandPattern =
  (typeof INVENTORY_ANALYTICS_TYPE.DEMAND_PATTERNS)[keyof typeof INVENTORY_ANALYTICS_TYPE.DEMAND_PATTERNS];

// Inventory Analytics Fulfillment Status
export type InventoryAnalyticsFulfillmentStatus =
  (typeof INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS)[keyof typeof INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS];

// Inventory Analytics Movement Types
export type InventoryAnalyticsMovementType =
  (typeof INVENTORY_ANALYTICS_TYPE.MOVEMENT_TYPES)[keyof typeof INVENTORY_ANALYTICS_TYPE.MOVEMENT_TYPES];

// Inventory Analytics Quality Status
export type InventoryAnalyticsQualityStatus =
  (typeof INVENTORY_ANALYTICS_TYPE.QUALITY_STATUS)[keyof typeof INVENTORY_ANALYTICS_TYPE.QUALITY_STATUS];

// Inventory Analytics Cost Categories
export type InventoryAnalyticsCostCategory =
  (typeof INVENTORY_ANALYTICS_TYPE.COST_CATEGORIES)[keyof typeof INVENTORY_ANALYTICS_TYPE.COST_CATEGORIES];

// Inventory Analytics Performance Levels
export type InventoryAnalyticsPerformanceLevel =
  (typeof INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS)[keyof typeof INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS];

// Inventory Analytics Analysis Type Labels
export function getInventoryAnalyticsAnalysisTypeLabel(
  type: InventoryAnalyticsAnalysisType
): string {
  const labels: Record<InventoryAnalyticsAnalysisType, string> = {
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.STOCK_ANALYSIS]: 'Stock Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.STOCK_LEVEL_ANALYSIS]: 'Stock Level Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.STOCK_MOVEMENT_ANALYSIS]: 'Stock Movement Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.STOCK_TURNOVER_ANALYSIS]: 'Stock Turnover Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.WAREHOUSE_ANALYSIS]: 'Warehouse Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.WAREHOUSE_CAPACITY_ANALYSIS]:
      'Warehouse Capacity Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.WAREHOUSE_UTILIZATION_ANALYSIS]:
      'Warehouse Utilization Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMAND_ANALYSIS]: 'Demand Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMAND_FORECAST_ANALYSIS]: 'Demand Forecast Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMAND_PATTERN_ANALYSIS]: 'Demand Pattern Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.SUPPLY_CHAIN_ANALYSIS]: 'Supply Chain Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.SUPPLIER_ANALYSIS]: 'Supplier Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.PROCUREMENT_ANALYSIS]: 'Procurement Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.FULFILLMENT_ANALYSIS]: 'Fulfillment Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.ORDER_FULFILLMENT_ANALYSIS]:
      'Order Fulfillment Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.COST_ANALYSIS]: 'Cost Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.INVENTORY_COST_ANALYSIS]: 'Inventory Cost Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.QUALITY_ANALYSIS]: 'Quality Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.DAMAGE_ANALYSIS]: 'Damage Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
  };
  return labels[type] || 'Unknown';
}

// Inventory Analytics Data Type Labels
export function getInventoryAnalyticsDataTypeLabel(type: InventoryAnalyticsDataType): string {
  const labels: Record<InventoryAnalyticsDataType, string> = {
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.STOCK_DATA]: 'Stock Data',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.WAREHOUSE_DATA]: 'Warehouse Data',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.PRODUCT_DATA]: 'Product Data',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.SUPPLIER_DATA]: 'Supplier Data',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.DEMAND_DATA]: 'Demand Data',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.FULFILLMENT_DATA]: 'Fulfillment Data',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.COST_DATA]: 'Cost Data',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.QUALITY_DATA]: 'Quality Data',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
    [INVENTORY_ANALYTICS_TYPE.DATA_TYPES.REALTIME]: 'Real-time',
  };
  return labels[type] || 'Unknown';
}

// Inventory Analytics Stock Status Labels
export function getInventoryAnalyticsStockStatusLabel(
  status: InventoryAnalyticsStockStatus
): string {
  const labels: Record<InventoryAnalyticsStockStatus, string> = {
    [INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.IN_STOCK]: 'In Stock',
    [INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.LOW_STOCK]: 'Low Stock',
    [INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.CRITICAL_STOCK]: 'Critical Stock',
    [INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.OUT_OF_STOCK]: 'Out of Stock',
    [INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.OVERSTOCKED]: 'Overstocked',
    [INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.DISCONTINUED]: 'Discontinued',
    [INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.ON_ORDER]: 'On Order',
    [INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.BACK_ORDERED]: 'Back Ordered',
  };
  return labels[status] || 'Unknown';
}

// Inventory Analytics Stock Type Labels
export function getInventoryAnalyticsStockTypeLabel(type: InventoryAnalyticsStockType): string {
  const labels: Record<InventoryAnalyticsStockType, string> = {
    [INVENTORY_ANALYTICS_TYPE.STOCK_TYPES.RAW_MATERIAL]: 'Raw Material',
    [INVENTORY_ANALYTICS_TYPE.STOCK_TYPES.WORK_IN_PROGRESS]: 'Work in Progress',
    [INVENTORY_ANALYTICS_TYPE.STOCK_TYPES.FINISHED_GOODS]: 'Finished Goods',
    [INVENTORY_ANALYTICS_TYPE.STOCK_TYPES.PACKAGING]: 'Packaging',
    [INVENTORY_ANALYTICS_TYPE.STOCK_TYPES.SPARE_PARTS]: 'Spare Parts',
    [INVENTORY_ANALYTICS_TYPE.STOCK_TYPES.CONSUMABLES]: 'Consumables',
  };
  return labels[type] || 'Unknown';
}

// Inventory Analytics Warehouse Type Labels
export function getInventoryAnalyticsWarehouseTypeLabel(
  type: InventoryAnalyticsWarehouseType
): string {
  const labels: Record<InventoryAnalyticsWarehouseType, string> = {
    [INVENTORY_ANALYTICS_TYPE.WAREHOUSE_TYPES.DISTRIBUTION]: 'Distribution',
    [INVENTORY_ANALYTICS_TYPE.WAREHOUSE_TYPES.FULFILLMENT]: 'Fulfillment',
    [INVENTORY_ANALYTICS_TYPE.WAREHOUSE_TYPES.STORAGE]: 'Storage',
    [INVENTORY_ANALYTICS_TYPE.WAREHOUSE_TYPES.CROSS_DOCK]: 'Cross Dock',
    [INVENTORY_ANALYTICS_TYPE.WAREHOUSE_TYPES.COLD_STORAGE]: 'Cold Storage',
    [INVENTORY_ANALYTICS_TYPE.WAREHOUSE_TYPES.HAZMAT]: 'Hazmat',
  };
  return labels[type] || 'Unknown';
}

// Inventory Analytics Demand Pattern Labels
export function getInventoryAnalyticsDemandPatternLabel(
  pattern: InventoryAnalyticsDemandPattern
): string {
  const labels: Record<InventoryAnalyticsDemandPattern, string> = {
    [INVENTORY_ANALYTICS_TYPE.DEMAND_PATTERNS.STABLE]: 'Stable',
    [INVENTORY_ANALYTICS_TYPE.DEMAND_PATTERNS.SEASONAL]: 'Seasonal',
    [INVENTORY_ANALYTICS_TYPE.DEMAND_PATTERNS.TRENDING]: 'Trending',
    [INVENTORY_ANALYTICS_TYPE.DEMAND_PATTERNS.CYCLICAL]: 'Cyclical',
    [INVENTORY_ANALYTICS_TYPE.DEMAND_PATTERNS.ERRATIC]: 'Erratic',
    [INVENTORY_ANALYTICS_TYPE.DEMAND_PATTERNS.RANDOM]: 'Random',
  };
  return labels[pattern] || 'Unknown';
}

// Inventory Analytics Fulfillment Status Labels
export function getInventoryAnalyticsFulfillmentStatusLabel(
  status: InventoryAnalyticsFulfillmentStatus
): string {
  const labels: Record<InventoryAnalyticsFulfillmentStatus, string> = {
    [INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS.PENDING]: 'Pending',
    [INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS.PROCESSING]: 'Processing',
    [INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS.PICKING]: 'Picking',
    [INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS.PACKING]: 'Packing',
    [INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS.SHIPPED]: 'Shipped',
    [INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS.DELIVERED]: 'Delivered',
    [INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS.COMPLETED]: 'Completed',
    [INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS.PARTIALLY_FULFILLED]: 'Partially Fulfilled',
    [INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS.FAILED]: 'Failed',
    [INVENTORY_ANALYTICS_TYPE.FULFILLMENT_STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

// Inventory Analytics Movement Type Labels
export function getInventoryAnalyticsMovementTypeLabel(
  type: InventoryAnalyticsMovementType
): string {
  const labels: Record<InventoryAnalyticsMovementType, string> = {
    [INVENTORY_ANALYTICS_TYPE.MOVEMENT_TYPES.INBOUND]: 'Inbound',
    [INVENTORY_ANALYTICS_TYPE.MOVEMENT_TYPES.OUTBOUND]: 'Outbound',
    [INVENTORY_ANALYTICS_TYPE.MOVEMENT_TYPES.TRANSFER]: 'Transfer',
    [INVENTORY_ANALYTICS_TYPE.MOVEMENT_TYPES.ADJUSTMENT]: 'Adjustment',
    [INVENTORY_ANALYTICS_TYPE.MOVEMENT_TYPES.DAMAGE]: 'Damage',
    [INVENTORY_ANALYTICS_TYPE.MOVEMENT_TYPES.RETURN]: 'Return',
  };
  return labels[type] || 'Unknown';
}

// Inventory Analytics Quality Status Labels
export function getInventoryAnalyticsQualityStatusLabel(
  status: InventoryAnalyticsQualityStatus
): string {
  const labels: Record<InventoryAnalyticsQualityStatus, string> = {
    [INVENTORY_ANALYTICS_TYPE.QUALITY_STATUS.PASSED]: 'Passed',
    [INVENTORY_ANALYTICS_TYPE.QUALITY_STATUS.FAILED]: 'Failed',
    [INVENTORY_ANALYTICS_TYPE.QUALITY_STATUS.PENDING]: 'Pending',
    [INVENTORY_ANALYTICS_TYPE.QUALITY_STATUS.DAMAGED]: 'Damaged',
    [INVENTORY_ANALYTICS_TYPE.QUALITY_STATUS.DEFECTIVE]: 'Defective',
    [INVENTORY_ANALYTICS_TYPE.QUALITY_STATUS.RECALLED]: 'Recalled',
  };
  return labels[status] || 'Unknown';
}

// Inventory Analytics Cost Category Labels
export function getInventoryAnalyticsCostCategoryLabel(
  category: InventoryAnalyticsCostCategory
): string {
  const labels: Record<InventoryAnalyticsCostCategory, string> = {
    [INVENTORY_ANALYTICS_TYPE.COST_CATEGORIES.HOLDING]: 'Holding',
    [INVENTORY_ANALYTICS_TYPE.COST_CATEGORIES.ORDERING]: 'Ordering',
    [INVENTORY_ANALYTICS_TYPE.COST_CATEGORIES.SHORTAGE]: 'Shortage',
    [INVENTORY_ANALYTICS_TYPE.COST_CATEGORIES.TRANSPORTATION]: 'Transportation',
    [INVENTORY_ANALYTICS_TYPE.COST_CATEGORIES.WAREHOUSING]: 'Warehousing',
    [INVENTORY_ANALYTICS_TYPE.COST_CATEGORIES.INSURANCE]: 'Insurance',
    [INVENTORY_ANALYTICS_TYPE.COST_CATEGORIES.TAX]: 'Tax',
  };
  return labels[category] || 'Unknown';
}

// Inventory Analytics Performance Level Labels
export function getInventoryAnalyticsPerformanceLevelLabel(
  level: InventoryAnalyticsPerformanceLevel
): string {
  const labels: Record<InventoryAnalyticsPerformanceLevel, string> = {
    [INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT]: 'Excellent',
    [INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD]: 'Good',
    [INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE]: 'Average',
    [INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE]: 'Below Average',
    [INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR]: 'Poor',
    [INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL]: 'Critical',
  };
  return labels[level] || 'Unknown';
}

// Check if analysis is stock analysis
export function isInventoryAnalyticsStockAnalysis(type: InventoryAnalyticsAnalysisType): boolean {
  const stockTypes: InventoryAnalyticsAnalysisType[] = [
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.STOCK_ANALYSIS,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.STOCK_LEVEL_ANALYSIS,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.STOCK_MOVEMENT_ANALYSIS,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.STOCK_TURNOVER_ANALYSIS,
  ];
  return stockTypes.includes(type);
}

// Check if analysis is warehouse analysis
export function isInventoryAnalyticsWarehouseAnalysis(
  type: InventoryAnalyticsAnalysisType
): boolean {
  const warehouseTypes: InventoryAnalyticsAnalysisType[] = [
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.WAREHOUSE_ANALYSIS,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.WAREHOUSE_CAPACITY_ANALYSIS,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.WAREHOUSE_UTILIZATION_ANALYSIS,
  ];
  return warehouseTypes.includes(type);
}

// Check if analysis is demand analysis
export function isInventoryAnalyticsDemandAnalysis(type: InventoryAnalyticsAnalysisType): boolean {
  const demandTypes: InventoryAnalyticsAnalysisType[] = [
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMAND_ANALYSIS,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMAND_FORECAST_ANALYSIS,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMAND_PATTERN_ANALYSIS,
  ];
  return demandTypes.includes(type);
}

// Check if analysis is comparative
export function isInventoryAnalyticsComparative(type: InventoryAnalyticsAnalysisType): boolean {
  const comparativeTypes: InventoryAnalyticsAnalysisType[] = [
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isInventoryAnalyticsPredictive(type: InventoryAnalyticsAnalysisType): boolean {
  const predictiveTypes: InventoryAnalyticsAnalysisType[] = [
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    INVENTORY_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
  ];
  return predictiveTypes.includes(type);
}

// Get performance level from score
export function getInventoryAnalyticsPerformanceLevel(
  score: number
): InventoryAnalyticsPerformanceLevel {
  if (score >= 90) return INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.EXCELLENT;
  if (score >= 70) return INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.GOOD;
  if (score >= 50) return INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.AVERAGE;
  if (score >= 30) return INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.BELOW_AVERAGE;
  if (score >= 10) return INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.POOR;
  return INVENTORY_ANALYTICS_TYPE.PERFORMANCE_LEVELS.CRITICAL;
}

// Get stock status from level
export function getInventoryAnalyticsStockStatus(level: number): InventoryAnalyticsStockStatus {
  if (level <= 0) return INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.OUT_OF_STOCK;
  if (level < 10) return INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.CRITICAL_STOCK;
  if (level < 30) return INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.LOW_STOCK;
  if (level > 80) return INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.OVERSTOCKED;
  return INVENTORY_ANALYTICS_TYPE.STOCK_STATUS.IN_STOCK;
}
