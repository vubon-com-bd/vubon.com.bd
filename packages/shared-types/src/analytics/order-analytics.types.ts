/**
 * Order Analytics Types
 * Type definitions for order analytics based on shared-constants
 * @module OrderAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants order analytics
// ============================================================
import {
  // Main Order Analytics Constants
  ORDER_ANALYTICS,
  OrderAnalyticsType,
  OrderAnalyticsStatus,
  OrderAnalyticsScope,
  OrderAnalyticsEvent,
  OrderAnalyticsDimension,
  OrderAnalyticsMetric,
  OrderAnalyticsSegment,
  OrderAnalyticsCohort,
  OrderAnalyticsGranularity,
  getOrderAnalyticsStatusLabel,
  getOrderAnalyticsEventLabel,
  getOrderAnalyticsDimensionLabel,
  getOrderAnalyticsSegmentLabel,
  getOrderAnalyticsCohortLabel,
  getOrderAnalyticsGranularityLabel,
  isOrderAnalyticsActive,
  isOrderAnalyticsCompleted,
  isOrderAnalyticsFailed,
  isOrderAnalyticsLifecycleEvent,
  isOrderAnalyticsFulfillmentEvent,
  isOrderAnalyticsDeliveryEvent,
  isOrderAnalyticsReturnEvent,
  // Order Analytics Type Constants
  ORDER_ANALYTICS_TYPE,
  OrderAnalyticsAnalysisType,
  OrderAnalyticsDataType,
  OrderAnalyticsOrderStatus,
  OrderAnalyticsOrderType,
  OrderAnalyticsOrderPriority,
  OrderAnalyticsFulfillmentStatus,
  OrderAnalyticsDeliveryStatus,
  OrderAnalyticsReturnStatus,
  OrderAnalyticsDeliveryMethod,
  OrderAnalyticsOrderChannel,
  OrderAnalyticsPerformanceLevel,
  OrderAnalyticsCompletionRate,
  getOrderAnalyticsAnalysisTypeLabel,
  getOrderAnalyticsDataTypeLabel,
  getOrderAnalyticsOrderStatusLabel,
  getOrderAnalyticsOrderTypeLabel,
  getOrderAnalyticsOrderPriorityLabel,
  getOrderAnalyticsFulfillmentStatusLabel,
  getOrderAnalyticsDeliveryStatusLabel,
  getOrderAnalyticsReturnStatusLabel,
  getOrderAnalyticsDeliveryMethodLabel,
  getOrderAnalyticsOrderChannelLabel,
  getOrderAnalyticsPerformanceLevelLabel,
  getOrderAnalyticsCompletionRateLabel,
  isOrderAnalyticsPerformanceAnalysis,
  isOrderAnalyticsComparative,
  isOrderAnalyticsPredictive,
  getOrderAnalyticsPerformanceLevel,
  getOrderAnalyticsCompletionRate,
  // Order Analytics Metric Constants
  ORDER_ANALYTICS_METRIC,
  OrderAnalyticsCountMetric,
  OrderAnalyticsValueMetric,
  OrderAnalyticsVolumeMetric,
  OrderAnalyticsTimeMetric,
  OrderAnalyticsQualityMetric,
  OrderAnalyticsChannelMetric,
  OrderAnalyticsComparisonMetric,
  OrderAnalyticsMetricCategory,
  OrderAnalyticsMetricType,
  OrderAnalyticsMetricFormat,
  OrderAnalyticsMetricPriority,
  getOrderAnalyticsMetricLabel,
  getOrderAnalyticsMetricCategoryLabel,
  getOrderAnalyticsMetricTypeLabel,
  getOrderAnalyticsMetricFormatLabel,
  getOrderAnalyticsMetricPriorityLabel,
  getOrderAnalyticsMetricCategory,
  getOrderAnalyticsMetricType,
  getOrderAnalyticsMetricFormat,
  calculateOrderAnalyticsAverageOrderValue,
  calculateOrderAnalyticsCompletionRate,
  calculateOrderAnalyticsOnTimeDeliveryRate,
  calculateOrderAnalyticsReturnRate,
  calculateOrderAnalyticsCancellationRate,
  calculateOrderAnalyticsSuccessRate,
  calculateOrderAnalyticsAverageTime,
  calculateOrderAnalyticsAccuracyRate,
  calculateOrderAnalyticsSatisfactionScore,
} from '@vubon/shared-constants';

// ============================================================
// Order Analytics Extended Types
// ============================================================

/**
 * Order analytics
 */
export interface OrderAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: OrderAnalyticsType;
  status: OrderAnalyticsStatus;
  scope: OrderAnalyticsScope;
  event: OrderAnalyticsEvent;
  dimension: OrderAnalyticsDimension;
  metric: OrderAnalyticsMetric;
  segment: OrderAnalyticsSegment;
  cohort: OrderAnalyticsCohort;
  granularity: OrderAnalyticsGranularity;
  analysisType: OrderAnalyticsAnalysisType;
  dataType: OrderAnalyticsDataType;
  orderStatus: OrderAnalyticsOrderStatus;
  orderType: OrderAnalyticsOrderType;
  orderPriority: OrderAnalyticsOrderPriority;
  fulfillmentStatus: OrderAnalyticsFulfillmentStatus;
  deliveryStatus: OrderAnalyticsDeliveryStatus;
  returnStatus: OrderAnalyticsReturnStatus;
  deliveryMethod: OrderAnalyticsDeliveryMethod;
  orderChannel: OrderAnalyticsOrderChannel;
  performanceLevel: OrderAnalyticsPerformanceLevel;
  completionRate: OrderAnalyticsCompletionRate;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isLifecycleEvent: boolean;
  isFulfillmentEvent: boolean;
  isDeliveryEvent: boolean;
  isReturnEvent: boolean;
  isPerformanceAnalysis: boolean;
  isComparative: boolean;
  isPredictive: boolean;
  metadata?: Metadata;
}

/**
 * Order analytics filter
 */
export interface OrderAnalyticsFilter {
  ids?: ID[];
  types?: OrderAnalyticsType[];
  statuses?: OrderAnalyticsStatus[];
  scopes?: OrderAnalyticsScope[];
  events?: OrderAnalyticsEvent[];
  dimensions?: OrderAnalyticsDimension[];
  metrics?: OrderAnalyticsMetric[];
  segments?: OrderAnalyticsSegment[];
  cohorts?: OrderAnalyticsCohort[];
  granularities?: OrderAnalyticsGranularity[];
  analysisTypes?: OrderAnalyticsAnalysisType[];
  dataTypes?: OrderAnalyticsDataType[];
  orderStatuses?: OrderAnalyticsOrderStatus[];
  orderTypes?: OrderAnalyticsOrderType[];
  orderPriorities?: OrderAnalyticsOrderPriority[];
  fulfillmentStatuses?: OrderAnalyticsFulfillmentStatus[];
  deliveryStatuses?: OrderAnalyticsDeliveryStatus[];
  returnStatuses?: OrderAnalyticsReturnStatus[];
  deliveryMethods?: OrderAnalyticsDeliveryMethod[];
  orderChannels?: OrderAnalyticsOrderChannel[];
  performanceLevels?: OrderAnalyticsPerformanceLevel[];
  completionRates?: OrderAnalyticsCompletionRate[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isLifecycleEvent?: boolean;
  isFulfillmentEvent?: boolean;
  isDeliveryEvent?: boolean;
  isReturnEvent?: boolean;
  isPerformanceAnalysis?: boolean;
  isComparative?: boolean;
  isPredictive?: boolean;
  minValue?: number;
  maxValue?: number;
  searchTerm?: string;
}

/**
 * Order analytics statistics
 */
export interface OrderAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  failedAnalytics: number;
  lifecycleEvents: number;
  fulfillmentEvents: number;
  deliveryEvents: number;
  returnEvents: number;
  performanceAnalyses: number;
  comparativeAnalyses: number;
  predictiveAnalyses: number;
  byType: Record<OrderAnalyticsType, number>;
  byStatus: Record<OrderAnalyticsStatus, number>;
  byEvent: Record<OrderAnalyticsEvent, number>;
  byMetric: Record<OrderAnalyticsMetric, number>;
  bySegment: Record<OrderAnalyticsSegment, number>;
  byCohort: Record<OrderAnalyticsCohort, number>;
  byGranularity: Record<OrderAnalyticsGranularity, number>;
  byOrderStatus: Record<OrderAnalyticsOrderStatus, number>;
  byOrderType: Record<OrderAnalyticsOrderType, number>;
  byOrderPriority: Record<OrderAnalyticsOrderPriority, number>;
  byFulfillmentStatus: Record<OrderAnalyticsFulfillmentStatus, number>;
  byDeliveryStatus: Record<OrderAnalyticsDeliveryStatus, number>;
  byReturnStatus: Record<OrderAnalyticsReturnStatus, number>;
  byDeliveryMethod: Record<OrderAnalyticsDeliveryMethod, number>;
  byOrderChannel: Record<OrderAnalyticsOrderChannel, number>;
  byPerformanceLevel: Record<OrderAnalyticsPerformanceLevel, number>;
  byCompletionRate: Record<OrderAnalyticsCompletionRate, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentEvent: OrderAnalyticsEvent;
  mostFrequentMetric: OrderAnalyticsMetric;
  mostFrequentSegment: OrderAnalyticsSegment;
}

/**
 * Order analytics summary
 */
export interface OrderAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  failed: number;
  lifecycleEvents: number;
  fulfillmentEvents: number;
  deliveryEvents: number;
  returnEvents: number;
  performance: number;
  comparative: number;
  predictive: number;
  byType: Record<OrderAnalyticsType, number>;
  byStatus: Record<OrderAnalyticsStatus, number>;
  byEvent: Record<OrderAnalyticsEvent, number>;
  byMetric: Record<OrderAnalyticsMetric, number>;
  bySegment: Record<OrderAnalyticsSegment, number>;
  byCohort: Record<OrderAnalyticsCohort, number>;
  byGranularity: Record<OrderAnalyticsGranularity, number>;
  byOrderStatus: Record<OrderAnalyticsOrderStatus, number>;
  byOrderType: Record<OrderAnalyticsOrderType, number>;
  byOrderPriority: Record<OrderAnalyticsOrderPriority, number>;
  byFulfillmentStatus: Record<OrderAnalyticsFulfillmentStatus, number>;
  byDeliveryStatus: Record<OrderAnalyticsDeliveryStatus, number>;
  byReturnStatus: Record<OrderAnalyticsReturnStatus, number>;
  byDeliveryMethod: Record<OrderAnalyticsDeliveryMethod, number>;
  byOrderChannel: Record<OrderAnalyticsOrderChannel, number>;
  byPerformanceLevel: Record<OrderAnalyticsPerformanceLevel, number>;
  byCompletionRate: Record<OrderAnalyticsCompletionRate, number>;
  orderTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topEvents: {
    event: OrderAnalyticsEvent;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: OrderAnalyticsMetric;
    count: number;
    label: string;
  }[];
  topOrderStatuses: {
    status: OrderAnalyticsOrderStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Order analytics configuration
 */
export interface OrderAnalyticsConfiguration {
  enabled: boolean;
  defaultType: OrderAnalyticsType;
  defaultScope: OrderAnalyticsScope;
  defaultGranularity: OrderAnalyticsGranularity;
  trackLifecycleEvents: boolean;
  trackFulfillmentEvents: boolean;
  trackDeliveryEvents: boolean;
  trackReturnEvents: boolean;
  trackPerformanceAnalysis: boolean;
  trackComparative: boolean;
  trackPredictive: boolean;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: OrderAnalyticsAlertConfig;
}

/**
 * Order analytics alert configuration
 */
export interface OrderAnalyticsAlertConfig {
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
 * Order analytics history
 */
export interface OrderAnalyticsHistory extends BaseEntity, Timestamp {
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
 * Order analytics data point
 */
export interface OrderAnalyticsDataPoint extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  event: OrderAnalyticsEvent;
  dimension: OrderAnalyticsDimension;
  metric: OrderAnalyticsMetric;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Order analytics export
 */
export interface OrderAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: OrderAnalyticsFilter;
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
  // Main Order Analytics Constants
  ORDER_ANALYTICS,
  OrderAnalyticsType,
  OrderAnalyticsStatus,
  OrderAnalyticsScope,
  OrderAnalyticsEvent,
  OrderAnalyticsDimension,
  OrderAnalyticsMetric,
  OrderAnalyticsSegment,
  OrderAnalyticsCohort,
  OrderAnalyticsGranularity,
  getOrderAnalyticsStatusLabel,
  getOrderAnalyticsEventLabel,
  getOrderAnalyticsDimensionLabel,
  getOrderAnalyticsSegmentLabel,
  getOrderAnalyticsCohortLabel,
  getOrderAnalyticsGranularityLabel,
  isOrderAnalyticsActive,
  isOrderAnalyticsCompleted,
  isOrderAnalyticsFailed,
  isOrderAnalyticsLifecycleEvent,
  isOrderAnalyticsFulfillmentEvent,
  isOrderAnalyticsDeliveryEvent,
  isOrderAnalyticsReturnEvent,
  // Order Analytics Type Constants
  ORDER_ANALYTICS_TYPE,
  OrderAnalyticsAnalysisType,
  OrderAnalyticsDataType,
  OrderAnalyticsOrderStatus,
  OrderAnalyticsOrderType,
  OrderAnalyticsOrderPriority,
  OrderAnalyticsFulfillmentStatus,
  OrderAnalyticsDeliveryStatus,
  OrderAnalyticsReturnStatus,
  OrderAnalyticsDeliveryMethod,
  OrderAnalyticsOrderChannel,
  OrderAnalyticsPerformanceLevel,
  OrderAnalyticsCompletionRate,
  getOrderAnalyticsAnalysisTypeLabel,
  getOrderAnalyticsDataTypeLabel,
  getOrderAnalyticsOrderStatusLabel,
  getOrderAnalyticsOrderTypeLabel,
  getOrderAnalyticsOrderPriorityLabel,
  getOrderAnalyticsFulfillmentStatusLabel,
  getOrderAnalyticsDeliveryStatusLabel,
  getOrderAnalyticsReturnStatusLabel,
  getOrderAnalyticsDeliveryMethodLabel,
  getOrderAnalyticsOrderChannelLabel,
  getOrderAnalyticsPerformanceLevelLabel,
  getOrderAnalyticsCompletionRateLabel,
  isOrderAnalyticsPerformanceAnalysis,
  isOrderAnalyticsComparative,
  isOrderAnalyticsPredictive,
  getOrderAnalyticsPerformanceLevel,
  getOrderAnalyticsCompletionRate,
  // Order Analytics Metric Constants
  ORDER_ANALYTICS_METRIC,
  OrderAnalyticsCountMetric,
  OrderAnalyticsValueMetric,
  OrderAnalyticsVolumeMetric,
  OrderAnalyticsTimeMetric,
  OrderAnalyticsQualityMetric,
  OrderAnalyticsChannelMetric,
  OrderAnalyticsComparisonMetric,
  OrderAnalyticsMetricCategory,
  OrderAnalyticsMetricType,
  OrderAnalyticsMetricFormat,
  OrderAnalyticsMetricPriority,
  getOrderAnalyticsMetricLabel,
  getOrderAnalyticsMetricCategoryLabel,
  getOrderAnalyticsMetricTypeLabel,
  getOrderAnalyticsMetricFormatLabel,
  getOrderAnalyticsMetricPriorityLabel,
  getOrderAnalyticsMetricCategory,
  getOrderAnalyticsMetricType,
  getOrderAnalyticsMetricFormat,
  calculateOrderAnalyticsAverageOrderValue,
  calculateOrderAnalyticsCompletionRate,
  calculateOrderAnalyticsOnTimeDeliveryRate,
  calculateOrderAnalyticsReturnRate,
  calculateOrderAnalyticsCancellationRate,
  calculateOrderAnalyticsSuccessRate,
  calculateOrderAnalyticsAverageTime,
  calculateOrderAnalyticsAccuracyRate,
  calculateOrderAnalyticsSatisfactionScore,
};
