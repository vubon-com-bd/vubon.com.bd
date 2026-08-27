/**
 * Flash Sale Settings Types
 * Type definitions for flash sale settings based on shared-constants
 * @module FlashSaleSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales
// ============================================================
import {
  // Flash Sale Core
  FlashSaleType,
  FlashSaleStatus,
  FlashSalePriority,
  FlashSaleTimeframe,
  FlashSaleFrequency,
  FlashSaleVisibility,
  FlashSaleFeature,
  FlashSaleCondition,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Settings Extended Types
// ============================================================

/**
 * Flash Sale Settings
 */
export interface FlashSaleSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  defaultType: FlashSaleType;
  defaultStatus: FlashSaleStatus;
  defaultPriority: FlashSalePriority;
  defaultTimeframe: FlashSaleTimeframe;
  defaultFrequency: FlashSaleFrequency;
  defaultVisibility: FlashSaleVisibility;
  defaultFeature: FlashSaleFeature;
  defaultCondition: FlashSaleCondition;
  defaultDuration: number;
  maxDiscount: number;
  maxProducts: number;
  maxFlashSalesPerDay: number;
  requireApproval: boolean;
  autoPublish: boolean;
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnCancel: boolean;
  isActive: boolean;
  isDefault: boolean;
  metadata?: Metadata;
}

/**
 * Flash Sale Settings Filter
 */
export interface FlashSaleSettingsFilter {
  ids?: ID[];
  userIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  searchTerm?: string;
}

/**
 * Flash Sale Settings Statistics
 */
export interface FlashSaleSettingsStatistics {
  userId: ID;
  totalSettings: number;
  activeSettings: number;
  defaultSettings: number;
  byDefaultType: Record<FlashSaleType, number>;
  byDefaultStatus: Record<FlashSaleStatus, number>;
  byDefaultPriority: Record<FlashSalePriority, number>;
  byDefaultTimeframe: Record<FlashSaleTimeframe, number>;
  byDefaultFrequency: Record<FlashSaleFrequency, number>;
  byDefaultVisibility: Record<FlashSaleVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  averageMaxDiscount: number;
  maxMaxDiscount: number;
  minMaxDiscount: number;
  averageMaxProducts: number;
  maxMaxProducts: number;
  minMaxProducts: number;
  mostFrequentType: FlashSaleType;
  mostFrequentStatus: FlashSaleStatus;
  mostFrequentPriority: FlashSalePriority;
}

/**
 * Flash Sale Settings Summary
 */
export interface FlashSaleSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  active: number;
  default: number;
  byDefaultType: Record<FlashSaleType, number>;
  byDefaultStatus: Record<FlashSaleStatus, number>;
  byDefaultPriority: Record<FlashSalePriority, number>;
  byDefaultTimeframe: Record<FlashSaleTimeframe, number>;
  byDefaultFrequency: Record<FlashSaleFrequency, number>;
  byDefaultVisibility: Record<FlashSaleVisibility, number>;
  settingsTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: FlashSaleType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: FlashSaleStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: FlashSalePriority;
    count: number;
    label: string;
  }[];
  parametersSummary: {
    averageDuration: number;
    averageMaxDiscount: number;
    averageMaxProducts: number;
  };
}

/**
 * Flash Sale Settings Configuration
 */
export interface FlashSaleSettingsConfiguration {
  enabled: boolean;
  defaultType: FlashSaleType;
  defaultStatus: FlashSaleStatus;
  defaultPriority: FlashSalePriority;
  defaultTimeframe: FlashSaleTimeframe;
  defaultFrequency: FlashSaleFrequency;
  defaultVisibility: FlashSaleVisibility;
  defaultFeature: FlashSaleFeature;
  defaultCondition: FlashSaleCondition;
  defaultDuration: number;
  maxDiscount: number;
  maxProducts: number;
  maxFlashSalesPerDay: number;
  requireApproval: boolean;
  autoPublish: boolean;
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnCancel: boolean;
  maxSettingsPerUser: number;
  requireValidation: boolean;
  autoApplyDefaults: boolean;
  notificationOnCreateSettings: boolean;
  notificationOnUpdateSettings: boolean;
  notificationOnDeleteSettings: boolean;
  alertConfig?: FlashSaleSettingsAlertConfig;
}

/**
 * Flash Sale Settings Alert Configuration
 */
export interface FlashSaleSettingsAlertConfig {
  enabled: boolean;
  invalidSettingsAlert: boolean;
  duplicateSettingsAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Settings History
 */
export interface FlashSaleSettingsHistory extends BaseEntity, Timestamp {
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
 * Flash Sale Settings Validation
 */
export interface FlashSaleSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Settings Export
 */
export interface FlashSaleSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: FlashSaleSettingsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Settings Import
 */
export interface FlashSaleSettingsImport extends BaseEntity, Timestamp {
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
 * Flash Sale Settings Default
 */
export interface FlashSaleSettingsDefault {
  type: FlashSaleType;
  status: FlashSaleStatus;
  priority: FlashSalePriority;
  timeframe: FlashSaleTimeframe;
  frequency: FlashSaleFrequency;
  visibility: FlashSaleVisibility;
  feature: FlashSaleFeature;
  condition: FlashSaleCondition;
  duration: number;
  maxDiscount: number;
  maxProducts: number;
  maxFlashSalesPerDay: number;
  requireApproval: boolean;
  autoPublish: boolean;
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnCancel: boolean;
  version: string;
  updatedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Flash Sale Core
  FlashSaleType,
  FlashSaleStatus,
  FlashSalePriority,
  FlashSaleTimeframe,
  FlashSaleFrequency,
  FlashSaleVisibility,
  FlashSaleFeature,
  FlashSaleCondition,
};
