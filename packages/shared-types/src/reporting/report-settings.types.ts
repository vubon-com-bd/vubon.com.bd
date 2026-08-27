/**
 * Report Settings Types
 * Type definitions for report settings based on shared-constants
 * @module ReportSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting
// ============================================================
import {
  // Reporting Core
  ReportingCategory,
  ReportingDeliveryMethod,
  ReportingScheduleType,
  ReportingTimePeriod,
  ReportingGrouping,
  ReportingAggregation,
  ReportingChartType,
  ReportingDataSource,
  ReportingTimezone,
  ReportingLanguage,
  ReportingDefault,
  ReportingLimit,
} from '@vubon/shared-constants';

// ============================================================
// Report Settings Extended Types
// ============================================================

/**
 * Report Settings
 */
export interface ReportSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  defaultCategory: ReportingCategory;
  defaultDeliveryMethod: ReportingDeliveryMethod;
  defaultScheduleType: ReportingScheduleType;
  defaultTimePeriod: ReportingTimePeriod;
  defaultGrouping: ReportingGrouping;
  defaultAggregation: ReportingAggregation;
  defaultChartType: ReportingChartType;
  defaultDataSource: ReportingDataSource;
  timezone: ReportingTimezone;
  language: ReportingLanguage;
  pageSize: number;
  isActive: boolean;
  isDefault: boolean;
  metadata?: Metadata;
}

/**
 * Report Settings Filter
 */
export interface ReportSettingsFilter {
  ids?: ID[];
  userIds?: ID[];
  defaultCategories?: ReportingCategory[];
  defaultDeliveryMethods?: ReportingDeliveryMethod[];
  defaultScheduleTypes?: ReportingScheduleType[];
  defaultTimePeriods?: ReportingTimePeriod[];
  timezones?: ReportingTimezone[];
  languages?: ReportingLanguage[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  searchTerm?: string;
}

/**
 * Report Settings Statistics
 */
export interface ReportSettingsStatistics {
  userId: ID;
  totalSettings: number;
  activeSettings: number;
  defaultSettings: number;
  byDefaultCategory: Record<ReportingCategory, number>;
  byDefaultDeliveryMethod: Record<ReportingDeliveryMethod, number>;
  byDefaultScheduleType: Record<ReportingScheduleType, number>;
  byDefaultTimePeriod: Record<ReportingTimePeriod, number>;
  byTimezone: Record<ReportingTimezone, number>;
  byLanguage: Record<ReportingLanguage, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePageSize: number;
  maxPageSize: number;
  minPageSize: number;
  mostFrequentCategory: ReportingCategory;
  mostFrequentDeliveryMethod: ReportingDeliveryMethod;
  mostFrequentScheduleType: ReportingScheduleType;
}

/**
 * Report Settings Summary
 */
export interface ReportSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  active: number;
  default: number;
  byDefaultCategory: Record<ReportingCategory, number>;
  byDefaultDeliveryMethod: Record<ReportingDeliveryMethod, number>;
  byDefaultScheduleType: Record<ReportingScheduleType, number>;
  byDefaultTimePeriod: Record<ReportingTimePeriod, number>;
  byTimezone: Record<ReportingTimezone, number>;
  byLanguage: Record<ReportingLanguage, number>;
  settingsTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topCategories: {
    category: ReportingCategory;
    count: number;
    label: string;
  }[];
  topDeliveryMethods: {
    method: ReportingDeliveryMethod;
    count: number;
    label: string;
  }[];
  topScheduleTypes: {
    type: ReportingScheduleType;
    count: number;
    label: string;
  }[];
}

/**
 * Report Settings Configuration
 */
export interface ReportSettingsConfiguration {
  enabled: boolean;
  defaultCategory: ReportingCategory;
  defaultDeliveryMethod: ReportingDeliveryMethod;
  defaultScheduleType: ReportingScheduleType;
  defaultTimePeriod: ReportingTimePeriod;
  defaultGrouping: ReportingGrouping;
  defaultAggregation: ReportingAggregation;
  defaultChartType: ReportingChartType;
  defaultDataSource: ReportingDataSource;
  defaultTimezone: ReportingTimezone;
  defaultLanguage: ReportingLanguage;
  defaultPageSize: number;
  maxPageSize: number;
  maxSettingsPerUser: number;
  requireValidation: boolean;
  autoApplyDefaults: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: ReportSettingsAlertConfig;
}

/**
 * Report Settings Alert Configuration
 */
export interface ReportSettingsAlertConfig {
  enabled: boolean;
  invalidSettingsAlert: boolean;
  duplicateSettingsAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Report Settings History
 */
export interface ReportSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'set_default'
    | 'unset_default'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Report Settings Validation
 */
export interface ReportSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Report Settings Export
 */
export interface ReportSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: ReportSettingsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Report Settings Import
 */
export interface ReportSettingsImport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedSettings: number;
  failedSettings: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * Report Settings Default
 */
export interface ReportSettingsDefault {
  category: ReportingCategory;
  deliveryMethod: ReportingDeliveryMethod;
  scheduleType: ReportingScheduleType;
  timePeriod: ReportingTimePeriod;
  grouping: ReportingGrouping;
  aggregation: ReportingAggregation;
  chartType: ReportingChartType;
  dataSource: ReportingDataSource;
  timezone: ReportingTimezone;
  language: ReportingLanguage;
  pageSize: number;
  version: string;
  updatedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Reporting Core
  ReportingCategory,
  ReportingDeliveryMethod,
  ReportingScheduleType,
  ReportingTimePeriod,
  ReportingGrouping,
  ReportingAggregation,
  ReportingChartType,
  ReportingDataSource,
  ReportingTimezone,
  ReportingLanguage,
  ReportingDefault,
  ReportingLimit,
};
