/**
 * Analytics Settings Types
 * Type definitions for analytics settings based on shared-constants
 * @module AnalyticsSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants analytics
// ============================================================
import {
  // Main Analytics
  AnalyticsType,
  AnalyticsStatus,
  AnalyticsTimeframe,
  AnalyticsInterval,
  AnalyticsAggregation,
  AnalyticsComparison,
  AnalyticsComparisonType,
  AnalyticsTrend,
  AnalyticsTrendType,
  AnalyticsEvent,
  AnalyticsDimension,
  AnalyticsMetric,
  AnalyticsFilter,
  AnalyticsPermission,
  // Aggregation
  AnalyticsAggregationType,
  AnalyticsAggregationCategory,
  AnalyticsAggregationLevel,
  AnalyticsAggregationScope,
  AnalyticsAggregationPrecision,
  // Dimension
  AnalyticsDimensionCategory,
  AnalyticsDimensionType,
  AnalyticsDimensionGranularity,
  // Metric
  AnalyticsMetricCategory,
  AnalyticsMetricType,
  AnalyticsMetricAggregation,
  AnalyticsMetricFormat,
  AnalyticsMetricPriority,
  // Period
  AnalyticsPeriodType,
  AnalyticsPeriodTypeEnum,
  AnalyticsPeriodGranularity,
  AnalyticsPeriodComparisonType,
  AnalyticsPeriodFormat,
  // Permission
  AnalyticsPermissionDetailType,
  AnalyticsPermissionResource,
  AnalyticsPermissionLevel,
  AnalyticsPermissionScope,
  AnalyticsPermissionAction,
  AnalyticsPermissionEffect,
  AnalyticsPermissionCondition,
} from '@vubon/shared-constants';

// ============================================================
// Analytics Settings Extended Types
// ============================================================

/**
 * Analytics settings
 */
export interface AnalyticsSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  defaultType: AnalyticsType;
  defaultStatus: AnalyticsStatus;
  defaultTimeframe: AnalyticsTimeframe;
  defaultInterval: AnalyticsInterval;
  defaultAggregation: AnalyticsAggregationType;
  defaultComparison: AnalyticsComparisonType;
  defaultTrend: AnalyticsTrendType;
  defaultDimension: AnalyticsDimension;
  defaultMetric: AnalyticsMetric;
  defaultFilter: AnalyticsFilter;
  defaultPermission: AnalyticsPermission;
  defaultPeriod: AnalyticsPeriodType;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnComplete: boolean;
  notificationOnError: boolean;
  notificationOnThreshold: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  metadata?: Metadata;
}

/**
 * Analytics settings configuration
 */
export interface AnalyticsSettingsConfiguration {
  /** Default analytics type */
  defaultType: AnalyticsType;
  /** Default analytics status */
  defaultStatus: AnalyticsStatus;
  /** Default timeframe */
  defaultTimeframe: AnalyticsTimeframe;
  /** Default interval */
  defaultInterval: AnalyticsInterval;
  /** Default aggregation type */
  defaultAggregation: AnalyticsAggregationType;
  /** Default comparison type */
  defaultComparison: AnalyticsComparisonType;
  /** Default trend type */
  defaultTrend: AnalyticsTrendType;
  /** Default dimension */
  defaultDimension: AnalyticsDimension;
  /** Default metric */
  defaultMetric: AnalyticsMetric;
  /** Default filter */
  defaultFilter: AnalyticsFilter;
  /** Default permission */
  defaultPermission: AnalyticsPermission;
  /** Default period type */
  defaultPeriod: AnalyticsPeriodType;
  /** Data retention in days */
  retentionDays: number;
  /** Auto refresh enabled */
  autoRefresh: boolean;
  /** Refresh interval in minutes */
  refreshInterval: number;
  /** Notification on complete */
  notificationOnComplete: boolean;
  /** Notification on error */
  notificationOnError: boolean;
  /** Notification on threshold */
  notificationOnThreshold: boolean;
  /** Threshold value */
  thresholdValue: number;
  /** Threshold operator */
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
}

/**
 * Analytics settings update
 */
export interface AnalyticsSettingsUpdate {
  /** Settings to update */
  settings: Partial<AnalyticsSettings>;
  /** Updated by user ID */
  updatedBy: ID;
  /** Reason for update */
  reason?: string;
  /** Timestamp */
  timestamp: Date;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics settings validation
 */
export interface AnalyticsSettingsValidation {
  /** Whether the settings are valid */
  isValid: boolean;
  /** Settings type */
  type: 'configuration' | 'user' | 'preferences';
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions for improvement */
  suggestions?: string[];
}

/**
 * Analytics user preferences
 */
export interface AnalyticsUserPreferences {
  /** User ID */
  userId: ID;
  /** Preferred analytics type */
  preferredType: AnalyticsType;
  /** Preferred timeframe */
  preferredTimeframe: AnalyticsTimeframe;
  /** Preferred interval */
  preferredInterval: AnalyticsInterval;
  /** Preferred aggregation */
  preferredAggregation: AnalyticsAggregationType;
  /** Preferred comparison */
  preferredComparison: AnalyticsComparisonType;
  /** Preferred trend */
  preferredTrend: AnalyticsTrendType;
  /** Preferred dimension */
  preferredDimension: AnalyticsDimension;
  /** Preferred metric */
  preferredMetric: AnalyticsMetric;
  /** Preferred period */
  preferredPeriod: AnalyticsPeriodType;
  /** Enable notifications */
  enableNotifications: boolean;
  /** Enable auto refresh */
  enableAutoRefresh: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Analytics settings history
 */
export interface AnalyticsSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  userId: ID;
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changedBy: ID;
  reason?: string;
  metadata?: Metadata;
}

/**
 * Analytics settings export
 */
export interface AnalyticsSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml';
  settings: Partial<AnalyticsSettings>;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Analytics settings default
 */
export interface AnalyticsSettingsDefault {
  /** Default configuration */
  config: AnalyticsSettingsConfiguration;
  /** User preferences default */
  preferences: AnalyticsUserPreferences;
  /** Settings version */
  version: string;
  /** Last updated */
  updatedAt: Date;
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Main Analytics
  AnalyticsType,
  AnalyticsStatus,
  AnalyticsTimeframe,
  AnalyticsInterval,
  AnalyticsAggregation,
  AnalyticsComparison,
  AnalyticsComparisonType,
  AnalyticsTrend,
  AnalyticsTrendType,
  AnalyticsEvent,
  AnalyticsDimension,
  AnalyticsMetric,
  AnalyticsFilter,
  AnalyticsPermission,
  // Aggregation
  AnalyticsAggregationType,
  AnalyticsAggregationCategory,
  AnalyticsAggregationLevel,
  AnalyticsAggregationScope,
  AnalyticsAggregationPrecision,
  // Dimension
  AnalyticsDimensionCategory,
  AnalyticsDimensionType,
  AnalyticsDimensionGranularity,
  // Metric
  AnalyticsMetricCategory,
  AnalyticsMetricType,
  AnalyticsMetricAggregation,
  AnalyticsMetricFormat,
  AnalyticsMetricPriority,
  // Period
  AnalyticsPeriodType,
  AnalyticsPeriodTypeEnum,
  AnalyticsPeriodGranularity,
  AnalyticsPeriodComparisonType,
  AnalyticsPeriodFormat,
  // Permission
  AnalyticsPermissionDetailType,
  AnalyticsPermissionResource,
  AnalyticsPermissionLevel,
  AnalyticsPermissionScope,
  AnalyticsPermissionAction,
  AnalyticsPermissionEffect,
  AnalyticsPermissionCondition,
};
