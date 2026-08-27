/**
 * Report Preferences Types
 * Type definitions for report preferences based on shared-constants
 * @module ReportPreferencesTypes
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
} from '@vubon/shared-constants';

// ============================================================
// Report Preferences Extended Types
// ============================================================

/**
 * Report Preferences
 */
export interface ReportPreferences extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  preferredCategory: ReportingCategory;
  preferredDeliveryMethod: ReportingDeliveryMethod;
  preferredScheduleType: ReportingScheduleType;
  preferredTimePeriod: ReportingTimePeriod;
  preferredGrouping: ReportingGrouping;
  preferredAggregation: ReportingAggregation;
  preferredChartType: ReportingChartType;
  preferredDataSource: ReportingDataSource;
  preferredTimezone: ReportingTimezone;
  preferredLanguage: ReportingLanguage;
  preferredPageSize: number;
  preferredExportFormat: string;
  preferredEmailFormat: string;
  notificationEnabled: boolean;
  dashboardWidgets: string[];
  isActive: boolean;
  isDefault: boolean;
  metadata?: Metadata;
}

/**
 * Report Preferences Filter
 */
export interface ReportPreferencesFilter {
  ids?: ID[];
  userIds?: ID[];
  preferredCategories?: ReportingCategory[];
  preferredDeliveryMethods?: ReportingDeliveryMethod[];
  preferredScheduleTypes?: ReportingScheduleType[];
  preferredTimePeriods?: ReportingTimePeriod[];
  preferredTimezones?: ReportingTimezone[];
  preferredLanguages?: ReportingLanguage[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  notificationEnabled?: boolean;
  searchTerm?: string;
}

/**
 * Report Preferences Statistics
 */
export interface ReportPreferencesStatistics {
  userId: ID;
  totalPreferences: number;
  activePreferences: number;
  defaultPreferences: number;
  notificationEnabled: number;
  byPreferredCategory: Record<ReportingCategory, number>;
  byPreferredDeliveryMethod: Record<ReportingDeliveryMethod, number>;
  byPreferredScheduleType: Record<ReportingScheduleType, number>;
  byPreferredTimePeriod: Record<ReportingTimePeriod, number>;
  byPreferredTimezone: Record<ReportingTimezone, number>;
  byPreferredLanguage: Record<ReportingLanguage, number>;
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
 * Report Preferences Summary
 */
export interface ReportPreferencesSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPreferences: number;
  active: number;
  default: number;
  notificationEnabled: number;
  byPreferredCategory: Record<ReportingCategory, number>;
  byPreferredDeliveryMethod: Record<ReportingDeliveryMethod, number>;
  byPreferredScheduleType: Record<ReportingScheduleType, number>;
  byPreferredTimePeriod: Record<ReportingTimePeriod, number>;
  byPreferredTimezone: Record<ReportingTimezone, number>;
  byPreferredLanguage: Record<ReportingLanguage, number>;
  preferencesTrend: {
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
 * Report Preferences Configuration
 */
export interface ReportPreferencesConfiguration {
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
  defaultExportFormat: string;
  defaultEmailFormat: string;
  maxPreferencesPerUser: number;
  allowCustomization: boolean;
  autoApplyDefaults: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: ReportPreferencesAlertConfig;
}

/**
 * Report Preferences Alert Configuration
 */
export interface ReportPreferencesAlertConfig {
  enabled: boolean;
  duplicatePreferencesAlert: boolean;
  invalidPreferencesAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Report Preferences History
 */
export interface ReportPreferencesHistory extends BaseEntity, Timestamp {
  id: ID;
  preferencesId: ID;
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
 * Report Preferences Validation
 */
export interface ReportPreferencesValidation {
  isValid: boolean;
  preferencesId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Report Preferences Export
 */
export interface ReportPreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: ReportPreferencesFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Report Preferences Import
 */
export interface ReportPreferencesImport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedPreferences: number;
  failedPreferences: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * Report Preferences Default
 */
export interface ReportPreferencesDefault {
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
  exportFormat: string;
  emailFormat: string;
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
};
