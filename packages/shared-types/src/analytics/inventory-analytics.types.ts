/**
 * Inventory Analytics Types
 * Type definitions for inventory analytics based on shared-constants
 * @module InventoryAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants inventory analytics
// ============================================================
import {
  // Main Inventory Analytics Constants
  INVENTORY_ANALYTICS,
  InventoryAnalyticsType,
  InventoryAnalyticsStatus,
  InventoryAnalyticsScope,
  InventoryAnalyticsEvent,
  InventoryAnalyticsDimension,
  InventoryAnalyticsMetric,
  InventoryAnalyticsSegment,
  InventoryAnalyticsCohort,
  InventoryAnalyticsGranularity,
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
  // Inventory Analytics Type Constants
  INVENTORY_ANALYTICS_TYPE,
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
  // Inventory Analytics Metric Constants
  INVENTORY_ANALYTICS_METRIC,
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
} from '@vubon/shared-constants';

// ============================================================
// Inventory Analytics Extended Types
// ============================================================

/**
 * Inventory analytics
 */
export interface InventoryAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: InventoryAnalyticsType;
  status: InventoryAnalyticsStatus;
  scope: InventoryAnalyticsScope;
  event: InventoryAnalyticsEvent;
  dimension: InventoryAnalyticsDimension;
  metric: InventoryAnalyticsMetric;
  segment: InventoryAnalyticsSegment;
  cohort: InventoryAnalyticsCohort;
  granularity: InventoryAnalyticsGranularity;
  analysisType: InventoryAnalyticsAnalysisType;
  dataType: InventoryAnalyticsDataType;
  stockStatus: InventoryAnalyticsStockStatus;
  stockType: InventoryAnalyticsStockType;
  warehouseType: InventoryAnalyticsWarehouseType;
  demandPattern: InventoryAnalyticsDemandPattern;
  fulfillmentStatus: InventoryAnalyticsFulfillmentStatus;
  movementType: InventoryAnalyticsMovementType;
  qualityStatus: InventoryAnalyticsQualityStatus;
  costCategory: InventoryAnalyticsCostCategory;
  performanceLevel: InventoryAnalyticsPerformanceLevel;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isStockEvent: boolean;
  isStockLevelEvent: boolean;
  isWarehouseEvent: boolean;
  isStockAnalysis: boolean;
  isWarehouseAnalysis: boolean;
  isDemandAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Inventory analytics filter
 */
export interface InventoryAnalyticsFilter {
  ids?: ID[];
  types?: InventoryAnalyticsType[];
  statuses?: InventoryAnalyticsStatus[];
  scopes?: InventoryAnalyticsScope[];
  events?: InventoryAnalyticsEvent[];
  dimensions?: InventoryAnalyticsDimension[];
  metrics?: InventoryAnalyticsMetric[];
  segments?: InventoryAnalyticsSegment[];
  cohorts?: InventoryAnalyticsCohort[];
  granularities?: InventoryAnalyticsGranularity[];
  analysisTypes?: InventoryAnalyticsAnalysisType[];
  dataTypes?: InventoryAnalyticsDataType[];
  stockStatuses?: InventoryAnalyticsStockStatus[];
  stockTypes?: InventoryAnalyticsStockType[];
  warehouseTypes?: InventoryAnalyticsWarehouseType[];
  demandPatterns?: InventoryAnalyticsDemandPattern[];
  fulfillmentStatuses?: InventoryAnalyticsFulfillmentStatus[];
  movementTypes?: InventoryAnalyticsMovementType[];
  qualityStatuses?: InventoryAnalyticsQualityStatus[];
  costCategories?: InventoryAnalyticsCostCategory[];
  performanceLevels?: InventoryAnalyticsPerformanceLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isStockEvent?: boolean;
  isStockLevelEvent?: boolean;
  isWarehouseEvent?: boolean;
  isStockAnalysis?: boolean;
  isWarehouseAnalysis?: boolean;
  isDemandAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Inventory analytics statistics
 */
export interface InventoryAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  stockEvents: number;
  stockLevelEvents: number;
  warehouseEvents: number;
  stockAnalyses: number;
  warehouseAnalyses: number;
  demandAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<InventoryAnalyticsType, number>;
  byStatus: Record<InventoryAnalyticsStatus, number>;
  byEvent: Record<InventoryAnalyticsEvent, number>;
  byMetric: Record<InventoryAnalyticsMetric, number>;
  bySegment: Record<InventoryAnalyticsSegment, number>;
  byCohort: Record<InventoryAnalyticsCohort, number>;
  byGranularity: Record<InventoryAnalyticsGranularity, number>;
  byStockStatus: Record<InventoryAnalyticsStockStatus, number>;
  byStockType: Record<InventoryAnalyticsStockType, number>;
  byWarehouseType: Record<InventoryAnalyticsWarehouseType, number>;
  byDemandPattern: Record<InventoryAnalyticsDemandPattern, number>;
  byFulfillmentStatus: Record<InventoryAnalyticsFulfillmentStatus, number>;
  byMovementType: Record<InventoryAnalyticsMovementType, number>;
  byQualityStatus: Record<InventoryAnalyticsQualityStatus, number>;
  byCostCategory: Record<InventoryAnalyticsCostCategory, number>;
  byPerformanceLevel: Record<InventoryAnalyticsPerformanceLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: InventoryAnalyticsEvent;
  mostFrequentMetric: InventoryAnalyticsMetric;
  mostFrequentSegment: InventoryAnalyticsSegment;
}

/**
 * Inventory analytics summary
 */
export interface InventoryAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  stockEvents: number;
  stockLevelEvents: number;
  warehouseEvents: number;
  stockAnalyses: number;
  warehouseAnalyses: number;
  demandAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<InventoryAnalyticsType, number>;
  byStatus: Record<InventoryAnalyticsStatus, number>;
  byEvent: Record<InventoryAnalyticsEvent, number>;
  byMetric: Record<InventoryAnalyticsMetric, number>;
  bySegment: Record<InventoryAnalyticsSegment, number>;
  byCohort: Record<InventoryAnalyticsCohort, number>;
  byGranularity: Record<InventoryAnalyticsGranularity, number>;
  byStockStatus: Record<InventoryAnalyticsStockStatus, number>;
  byStockType: Record<InventoryAnalyticsStockType, number>;
  byWarehouseType: Record<InventoryAnalyticsWarehouseType, number>;
  byDemandPattern: Record<InventoryAnalyticsDemandPattern, number>;
  byFulfillmentStatus: Record<InventoryAnalyticsFulfillmentStatus, number>;
  byMovementType: Record<InventoryAnalyticsMovementType, number>;
  byQualityStatus: Record<InventoryAnalyticsQualityStatus, number>;
  byCostCategory: Record<InventoryAnalyticsCostCategory, number>;
  byPerformanceLevel: Record<InventoryAnalyticsPerformanceLevel, number>;
  inventoryTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: InventoryAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: InventoryAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topStockStatuses: {
    status: InventoryAnalyticsStockStatus;
    count: number;
    label: string;
  }[];
  topWarehouseTypes: {
    type: InventoryAnalyticsWarehouseType;
    count: number;
    label: string;
  }[];
}

/**
 * Inventory analytics configuration
 */
export interface InventoryAnalyticsConfiguration {
  enabled: boolean;
  defaultType: InventoryAnalyticsType;
  defaultScope: InventoryAnalyticsScope;
  defaultGranularity: InventoryAnalyticsGranularity;
  trackStockEvents: boolean;
  trackStockLevelEvents: boolean;
  trackWarehouseEvents: boolean;
  trackStockAnalysis: boolean;
  trackWarehouseAnalysis: boolean;
  trackDemandAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: InventoryAnalyticsAlertConfig;
}

/**
 * Inventory analytics alert configuration
 */
export interface InventoryAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  failedAnalyticsAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
}

/**
 * Inventory analytics history
 */
export interface InventoryAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Inventory analytics data point
 */
export interface InventoryAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: InventoryAnalyticsEvent;
  dimension: InventoryAnalyticsDimension;
  metric: InventoryAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Inventory analytics export
 */
export interface InventoryAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: InventoryAnalyticsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Main Inventory Analytics Constants
  INVENTORY_ANALYTICS,
  InventoryAnalyticsType,
  InventoryAnalyticsStatus,
  InventoryAnalyticsScope,
  InventoryAnalyticsEvent,
  InventoryAnalyticsDimension,
  InventoryAnalyticsMetric,
  InventoryAnalyticsSegment,
  InventoryAnalyticsCohort,
  InventoryAnalyticsGranularity,
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
  // Inventory Analytics Type Constants
  INVENTORY_ANALYTICS_TYPE,
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
  // Inventory Analytics Metric Constants
  INVENTORY_ANALYTICS_METRIC,
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
};
