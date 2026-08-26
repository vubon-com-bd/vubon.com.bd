/**
 * Product Analytics Types
 * Type definitions for product analytics based on shared-constants
 * @module ProductAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product analytics
// ============================================================
import {
  // Main Analytics Constants
  PRODUCT_ANALYTICS,
  ProductAnalyticsType,
  ProductAnalyticsStatus,
  ProductAnalyticsScope,
  ProductAnalyticsEvent,
  ProductAnalyticsDimension,
  ProductAnalyticsMetric,
  ProductAnalyticsSegment,
  ProductAnalyticsCohort,
  ProductAnalyticsGranularity,
  getProductAnalyticsStatusLabel,
  getProductAnalyticsEventLabel,
  getProductAnalyticsDimensionLabel,
  getProductAnalyticsSegmentLabel,
  getProductAnalyticsCohortLabel,
  getProductAnalyticsGranularityLabel,
  isProductAnalyticsActive,
  isProductAnalyticsCompleted,
  isProductAnalyticsFailed,
  isProductAnalyticsLifecycleEvent,
  isProductAnalyticsViewEvent,
  isProductAnalyticsCartEvent,
  isProductAnalyticsPurchaseEvent,
  // Analytics Type Constants
  PRODUCT_ANALYTICS_TYPE,
  ProductAnalyticsAnalysisType,
  ProductAnalyticsDataType,
  ProductAnalyticsProductCategory,
  ProductAnalyticsProductStatus,
  ProductAnalyticsProductType,
  ProductAnalyticsStockStatus,
  ProductAnalyticsPricingType,
  ProductAnalyticsPerformanceLevel,
  ProductAnalyticsReviewType,
  getProductAnalyticsAnalysisTypeLabel,
  getProductAnalyticsDataTypeLabel,
  getProductAnalyticsProductCategoryLabel,
  getProductAnalyticsProductStatusLabel,
  getProductAnalyticsProductTypeLabel,
  getProductAnalyticsStockStatusLabel,
  getProductAnalyticsPricingTypeLabel,
  getProductAnalyticsPerformanceLevelLabel,
  getProductAnalyticsReviewTypeLabel,
  isProductAnalyticsPerformanceAnalysis,
  isProductAnalyticsCategoryAnalysis,
  isProductAnalyticsInventoryAnalysis,
  isProductAnalyticsPredictive,
  getProductAnalyticsPerformanceLevel,
  // Analytics Metric Constants
  PRODUCT_ANALYTICS_METRIC,
  ProductAnalyticsCountMetric,
  ProductAnalyticsViewMetric,
  ProductAnalyticsEngagementMetric,
  ProductAnalyticsSalesMetric,
  ProductAnalyticsRevenueMetric,
  ProductAnalyticsProfitMetric,
  ProductAnalyticsInventoryMetric,
  ProductAnalyticsPerformanceMetric,
  ProductAnalyticsReviewMetric,
  ProductAnalyticsMetricCategory,
  ProductAnalyticsMetricType,
  ProductAnalyticsMetricFormat,
  ProductAnalyticsMetricPriority,
  getProductAnalyticsMetricLabel,
  getProductAnalyticsMetricCategoryLabel,
  getProductAnalyticsMetricTypeLabel,
  getProductAnalyticsMetricFormatLabel,
  getProductAnalyticsMetricPriorityLabel,
  getProductAnalyticsMetricCategory,
  getProductAnalyticsMetricType,
  getProductAnalyticsMetricFormat,
  calculateProductAnalyticsConversionRate,
  calculateProductAnalyticsReturnRate,
  calculateProductAnalyticsProfitMargin,
  calculateProductAnalyticsTurnoverRate,
} from '@vubon/shared-constants';

// ============================================================
// Product Analytics Extended Types
// ============================================================

/**
 * Product analytics
 */
export interface ProductAnalytics extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  type: ProductAnalyticsType;
  status: ProductAnalyticsStatus;
  scope: ProductAnalyticsScope;
  event: ProductAnalyticsEvent;
  dimension: ProductAnalyticsDimension;
  metric: ProductAnalyticsMetric;
  segment: ProductAnalyticsSegment;
  cohort: ProductAnalyticsCohort;
  granularity: ProductAnalyticsGranularity;
  analysisType: ProductAnalyticsAnalysisType;
  dataType: ProductAnalyticsDataType;
  productCategory: ProductAnalyticsProductCategory;
  productStatus: ProductAnalyticsProductStatus;
  productType: ProductAnalyticsProductType;
  stockStatus: ProductAnalyticsStockStatus;
  pricingType: ProductAnalyticsPricingType;
  performanceLevel: ProductAnalyticsPerformanceLevel;
  reviewType: ProductAnalyticsReviewType;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isLifecycleEvent: boolean;
  isViewEvent: boolean;
  isCartEvent: boolean;
  isPurchaseEvent: boolean;
  isPerformanceAnalysis: boolean;
  isCategoryAnalysis: boolean;
  isInventoryAnalysis: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Product analytics filter
 */
export interface ProductAnalyticsFilter {
  productIds?: ID[];
  types?: ProductAnalyticsType[];
  statuses?: ProductAnalyticsStatus[];
  scopes?: ProductAnalyticsScope[];
  events?: ProductAnalyticsEvent[];
  dimensions?: ProductAnalyticsDimension[];
  metrics?: ProductAnalyticsMetric[];
  segments?: ProductAnalyticsSegment[];
  cohorts?: ProductAnalyticsCohort[];
  granularities?: ProductAnalyticsGranularity[];
  analysisTypes?: ProductAnalyticsAnalysisType[];
  dataTypes?: ProductAnalyticsDataType[];
  productCategories?: ProductAnalyticsProductCategory[];
  productStatuses?: ProductAnalyticsProductStatus[];
  productTypes?: ProductAnalyticsProductType[];
  stockStatuses?: ProductAnalyticsStockStatus[];
  pricingTypes?: ProductAnalyticsPricingType[];
  performanceLevels?: ProductAnalyticsPerformanceLevel[];
  reviewTypes?: ProductAnalyticsReviewType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isLifecycleEvent?: boolean;
  isViewEvent?: boolean;
  isCartEvent?: boolean;
  isPurchaseEvent?: boolean;
  isPerformanceAnalysis?: boolean;
  isCategoryAnalysis?: boolean;
  isInventoryAnalysis?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Product analytics statistics
 */
export interface ProductAnalyticsStatistics {
  productId: ID;
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  lifecycleEvents: number;
  viewEvents: number;
  cartEvents: number;
  purchaseEvents: number;
  performanceAnalyses: number;
  categoryAnalyses: number;
  inventoryAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<ProductAnalyticsType, number>;
  byStatus: Record<ProductAnalyticsStatus, number>;
  byEvent: Record<ProductAnalyticsEvent, number>;
  byMetric: Record<ProductAnalyticsMetric, number>;
  bySegment: Record<ProductAnalyticsSegment, number>;
  byCohort: Record<ProductAnalyticsCohort, number>;
  byGranularity: Record<ProductAnalyticsGranularity, number>;
  byProductCategory: Record<ProductAnalyticsProductCategory, number>;
  byProductStatus: Record<ProductAnalyticsProductStatus, number>;
  byProductType: Record<ProductAnalyticsProductType, number>;
  byStockStatus: Record<ProductAnalyticsStockStatus, number>;
  byPricingType: Record<ProductAnalyticsPricingType, number>;
  byPerformanceLevel: Record<ProductAnalyticsPerformanceLevel, number>;
  byReviewType: Record<ProductAnalyticsReviewType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: ProductAnalyticsEvent;
  mostFrequentMetric: ProductAnalyticsMetric;
  mostFrequentSegment: ProductAnalyticsSegment;
}

/**
 * Product analytics summary
 */
export interface ProductAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  lifecycleEvents: number;
  viewEvents: number;
  cartEvents: number;
  purchaseEvents: number;
  performance: number;
  category: number;
  inventory: number;
  predictive: number;
  byType: Record<ProductAnalyticsType, number>;
  byStatus: Record<ProductAnalyticsStatus, number>;
  byEvent: Record<ProductAnalyticsEvent, number>;
  byMetric: Record<ProductAnalyticsMetric, number>;
  bySegment: Record<ProductAnalyticsSegment, number>;
  byCohort: Record<ProductAnalyticsCohort, number>;
  byGranularity: Record<ProductAnalyticsGranularity, number>;
  byProductCategory: Record<ProductAnalyticsProductCategory, number>;
  byProductStatus: Record<ProductAnalyticsProductStatus, number>;
  byProductType: Record<ProductAnalyticsProductType, number>;
  byStockStatus: Record<ProductAnalyticsStockStatus, number>;
  byPricingType: Record<ProductAnalyticsPricingType, number>;
  byPerformanceLevel: Record<ProductAnalyticsPerformanceLevel, number>;
  byReviewType: Record<ProductAnalyticsReviewType, number>;
  analyticsTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: ProductAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: ProductAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topProductCategories: {
    category: ProductAnalyticsProductCategory;
    count: number;
    label: string;
  }[];
}

/**
 * Product analytics configuration
 */
export interface ProductAnalyticsConfiguration {
  enabled: boolean;
  defaultType: ProductAnalyticsType;
  defaultScope: ProductAnalyticsScope;
  defaultGranularity: ProductAnalyticsGranularity;
  trackLifecycleEvents: boolean;
  trackViewEvents: boolean;
  trackCartEvents: boolean;
  trackPurchaseEvents: boolean;
  trackPerformanceAnalysis: boolean;
  trackCategoryAnalysis: boolean;
  trackInventoryAnalysis: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: ProductAnalyticsAlertConfig;
}

/**
 * Product analytics alert configuration
 */
export interface ProductAnalyticsAlertConfig {
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
 * Product analytics history
 */
export interface ProductAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  productId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Product analytics data point
 */
export interface ProductAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  analyticsId: ID;
  event: ProductAnalyticsEvent;
  dimension: ProductAnalyticsDimension;
  metric: ProductAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Product analytics export
 */
export interface ProductAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ProductAnalyticsFilter;
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
  // Main Analytics Constants
  PRODUCT_ANALYTICS,
  ProductAnalyticsType,
  ProductAnalyticsStatus,
  ProductAnalyticsScope,
  ProductAnalyticsEvent,
  ProductAnalyticsDimension,
  ProductAnalyticsMetric,
  ProductAnalyticsSegment,
  ProductAnalyticsCohort,
  ProductAnalyticsGranularity,
  getProductAnalyticsStatusLabel,
  getProductAnalyticsEventLabel,
  getProductAnalyticsDimensionLabel,
  getProductAnalyticsSegmentLabel,
  getProductAnalyticsCohortLabel,
  getProductAnalyticsGranularityLabel,
  isProductAnalyticsActive,
  isProductAnalyticsCompleted,
  isProductAnalyticsFailed,
  isProductAnalyticsLifecycleEvent,
  isProductAnalyticsViewEvent,
  isProductAnalyticsCartEvent,
  isProductAnalyticsPurchaseEvent,
  // Analytics Type Constants
  PRODUCT_ANALYTICS_TYPE,
  ProductAnalyticsAnalysisType,
  ProductAnalyticsDataType,
  ProductAnalyticsProductCategory,
  ProductAnalyticsProductStatus,
  ProductAnalyticsProductType,
  ProductAnalyticsStockStatus,
  ProductAnalyticsPricingType,
  ProductAnalyticsPerformanceLevel,
  ProductAnalyticsReviewType,
  getProductAnalyticsAnalysisTypeLabel,
  getProductAnalyticsDataTypeLabel,
  getProductAnalyticsProductCategoryLabel,
  getProductAnalyticsProductStatusLabel,
  getProductAnalyticsProductTypeLabel,
  getProductAnalyticsStockStatusLabel,
  getProductAnalyticsPricingTypeLabel,
  getProductAnalyticsPerformanceLevelLabel,
  getProductAnalyticsReviewTypeLabel,
  isProductAnalyticsPerformanceAnalysis,
  isProductAnalyticsCategoryAnalysis,
  isProductAnalyticsInventoryAnalysis,
  isProductAnalyticsPredictive,
  getProductAnalyticsPerformanceLevel,
  // Analytics Metric Constants
  PRODUCT_ANALYTICS_METRIC,
  ProductAnalyticsCountMetric,
  ProductAnalyticsViewMetric,
  ProductAnalyticsEngagementMetric,
  ProductAnalyticsSalesMetric,
  ProductAnalyticsRevenueMetric,
  ProductAnalyticsProfitMetric,
  ProductAnalyticsInventoryMetric,
  ProductAnalyticsPerformanceMetric,
  ProductAnalyticsReviewMetric,
  ProductAnalyticsMetricCategory,
  ProductAnalyticsMetricType,
  ProductAnalyticsMetricFormat,
  ProductAnalyticsMetricPriority,
  getProductAnalyticsMetricLabel,
  getProductAnalyticsMetricCategoryLabel,
  getProductAnalyticsMetricTypeLabel,
  getProductAnalyticsMetricFormatLabel,
  getProductAnalyticsMetricPriorityLabel,
  getProductAnalyticsMetricCategory,
  getProductAnalyticsMetricType,
  getProductAnalyticsMetricFormat,
  calculateProductAnalyticsConversionRate,
  calculateProductAnalyticsReturnRate,
  calculateProductAnalyticsProfitMargin,
  calculateProductAnalyticsTurnoverRate,
};
