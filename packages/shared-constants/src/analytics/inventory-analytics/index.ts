/**
 * Inventory Analytics Constants Index
 * Export all inventory analytics constants and types for easy importing
 */

// Inventory Analytics Main Constants
export {
  INVENTORY_ANALYTICS,
  getInventoryAnalyticsStatusLabel,
  getInventoryAnalyticsEventLabel,
  getInventoryAnalyticsDimensionLabel,
  getInventoryAnalyticsSegmentLabel,
  getInventoryAnalyticsCohortLabel,
  getInventoryAnalyticsGranularityLabel,
  isInventoryAnalyticsActive,
  isInventoryAnalyticsCompleted,
  isInventoryAnalyticsFailed,
  isInventoryAnalyticsStockEvent,
  isInventoryAnalyticsStockLevelEvent,
  isInventoryAnalyticsWarehouseEvent,
} from './inventory-analytics.constants';

export type {
  InventoryAnalyticsType,
  InventoryAnalyticsStatus,
  InventoryAnalyticsScope,
  InventoryAnalyticsEvent,
  InventoryAnalyticsDimension,
  InventoryAnalyticsMetric,
  InventoryAnalyticsSegment,
  InventoryAnalyticsCohort,
  InventoryAnalyticsGranularity,
} from './inventory-analytics.constants';

// Inventory Analytics Type Constants
export {
  INVENTORY_ANALYTICS_TYPE,
  getInventoryAnalyticsAnalysisTypeLabel,
  getInventoryAnalyticsDataTypeLabel,
  getInventoryAnalyticsStockStatusLabel,
  getInventoryAnalyticsStockTypeLabel,
  getInventoryAnalyticsWarehouseTypeLabel,
  getInventoryAnalyticsDemandPatternLabel,
  getInventoryAnalyticsFulfillmentStatusLabel,
  getInventoryAnalyticsMovementTypeLabel,
  getInventoryAnalyticsQualityStatusLabel,
  getInventoryAnalyticsCostCategoryLabel,
  getInventoryAnalyticsPerformanceLevelLabel,
  isInventoryAnalyticsStockAnalysis,
  isInventoryAnalyticsWarehouseAnalysis,
  isInventoryAnalyticsDemandAnalysis,
  isInventoryAnalyticsComparative,
  isInventoryAnalyticsPredictive,
  getInventoryAnalyticsPerformanceLevel,
  getInventoryAnalyticsStockStatus,
} from './inventory-analytics-type.constants';

export type {
  InventoryAnalyticsAnalysisType,
  InventoryAnalyticsDataType,
  InventoryAnalyticsStockStatus,
  InventoryAnalyticsStockType,
  InventoryAnalyticsWarehouseType,
  InventoryAnalyticsDemandPattern,
  InventoryAnalyticsFulfillmentStatus,
  InventoryAnalyticsMovementType,
  InventoryAnalyticsQualityStatus,
  InventoryAnalyticsCostCategory,
  InventoryAnalyticsPerformanceLevel,
} from './inventory-analytics-type.constants';

// Inventory Analytics Metric Constants
export {
  INVENTORY_ANALYTICS_METRIC,
  getInventoryAnalyticsMetricLabel,
  getInventoryAnalyticsMetricCategoryLabel,
  getInventoryAnalyticsMetricTypeLabel,
  getInventoryAnalyticsMetricFormatLabel,
  getInventoryAnalyticsMetricPriorityLabel,
  getInventoryAnalyticsMetricCategory,
  getInventoryAnalyticsMetricType,
  getInventoryAnalyticsMetricFormat,
  calculateInventoryAnalyticsTurnoverRate,
  calculateInventoryAnalyticsStockDays,
  calculateInventoryAnalyticsStockAvailability,
  calculateInventoryAnalyticsStockAccuracy,
  calculateInventoryAnalyticsWarehouseUtilization,
  calculateInventoryAnalyticsDemandAccuracy,
  calculateInventoryAnalyticsHoldingCostRatio,
  calculateInventoryAnalyticsFulfillmentRate,
} from './inventory-analytics-metric.constants';

export type {
  InventoryAnalyticsStockLevelMetric,
  InventoryAnalyticsMovementMetric,
  InventoryAnalyticsHealthMetric,
  InventoryAnalyticsWarehouseMetric,
  InventoryAnalyticsSupplyChainMetric,
  InventoryAnalyticsDemandMetric,
  InventoryAnalyticsCostMetric,
  InventoryAnalyticsFulfillmentMetric,
  InventoryAnalyticsComparisonMetric,
  InventoryAnalyticsMetricCategory,
  InventoryAnalyticsMetricType,
  InventoryAnalyticsMetricFormat,
  InventoryAnalyticsMetricPriority,
} from './inventory-analytics-metric.constants';
