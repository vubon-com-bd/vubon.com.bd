/**
 * @fileoverview Inventory analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  InventoryAnalyticsMetric,
  InventoryAnalyticsMetricType,
  InventoryAnalyticsMetricFormat,
  // Constants
  INVENTORY_ANALYTICS_METRIC_CATEGORY_MAP,
  INVENTORY_ANALYTICS_METRIC_CONFIG,
  INVENTORY_DASHBOARD_METRICS,
  INVENTORY_PERFORMANCE_METRICS,
  INVENTORY_COST_METRICS,
  INVENTORY_TIME_METRICS,
  // Functions
  getInventoryMetricCategory,
  getInventoryMetricLabel,
  getInventoryMetricDescription,
  getInventoryMetricFormat,
  isInventoryMetricReversed,
  getInventoryMetricsByCategory,
  formatInventoryMetricValue,
  getInventoryMetricPriority,
  getHighPriorityInventoryMetrics,
  getInventoryMetricThreshold,
  evaluateInventoryMetricPerformance,
} from './inventory-analytics-metric.constants';

// Re-export from inventory-analytics-type.constants
export {
  // Enums
  InventoryAnalyticsType,
  InventoryAnalyticsCategory,
  InventoryAnalyticsTypeStatus,
  InventoryAnalyticsSubCategory,
  // Constants
  INVENTORY_ANALYTICS_TYPE_CATEGORY_MAP,
  INVENTORY_ANALYTICS_TYPE_CONFIG,
  INVENTORY_ANALYTICS_TYPE_DEFAULT_STATUS,
  INVENTORY_ANALYTICS_PRIORITY_LEVELS,
  INVENTORY_ANALYTICS_TYPE_SUB_CATEGORY_MAP,
  // Functions
  getInventoryAnalyticsTypeLabel,
  getInventoryAnalyticsTypeDescription,
  getInventoryAnalyticsTypeCategory,
  getInventoryAnalyticsTypesByCategory,
  inventoryAnalyticsTypeRequiresProductId,
  isInventoryAnalyticsTypeRealtime,
  getInventoryAnalyticsTypePriority,
  getInventoryAnalyticsTypeStatus,
  setInventoryAnalyticsTypeStatus,
  getInventoryAnalyticsTypesByPriority,
  getCriticalInventoryAnalyticsTypes,
  getInventoryAnalyticsTypeSubCategory,
  getInventoryAnalyticsTypesBySubCategory,
} from './inventory-analytics-type.constants';

// Re-export from inventory-analytics.constants
export {
  // Enums
  InventoryCategoryClass,
  InventoryAuditFrequency,
  // Constants
  DEFAULT_REORDER_POINT_SETTINGS,
  DEFAULT_SAFETY_STOCK_LEVELS,
  DEFAULT_INVENTORY_TURNOVER_THRESHOLDS,
  DEFAULT_STOCKOUT_ALERT_SETTINGS,
  DEFAULT_ABC_ANALYSIS_CONFIG,
  DEFAULT_WAREHOUSE_CAPACITY_LIMITS,
  DEFAULT_INVENTORY_SEASONALITY_FACTORS,
  DEFAULT_LEAD_TIME_CALCULATION_SETTINGS,
  DEFAULT_INVENTORY_RESERVE_SETTINGS,
  DEFAULT_INVENTORY_AUDIT_SETTINGS,
  INVENTORY_ANALYTICS_CONFIG,
  // Functions
  getInventoryCategoryLabel,
  getAuditFrequencyLabel,
} from './inventory-analytics.constants';

// Types - Import from inventory-analytics.constants
export type {
  ReorderPointSettings,
  SafetyStockLevels,
  InventoryTurnoverThresholds,
  StockoutAlertSettings,
  ABCAnalysisConfig,
  WarehouseCapacityLimits,
  InventorySeasonalityFactors,
  LeadTimeCalculationSettings,
  InventoryReserveSettings,
  InventoryAuditSettings,
} from './inventory-analytics.constants';

// Import InventoryAnalyticsTypeConfig from inventory-analytics-type.constants
export type { InventoryAnalyticsTypeConfig } from './inventory-analytics-type.constants';

// Import InventoryAnalyticsMetricConfig from inventory-analytics-metric.constants
export type { InventoryAnalyticsMetricConfig } from './inventory-analytics-metric.constants';
