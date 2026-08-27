/**
 * Flash Sale Preferences Types
 * Type definitions for flash sale preferences based on shared-constants
 * @module FlashSalePreferencesTypes
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
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Preferences Extended Types
// ============================================================

/**
 * Flash Sale Preferences
 */
export interface FlashSalePreferences extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  preferredType: FlashSaleType;
  preferredStatus: FlashSaleStatus;
  preferredPriority: FlashSalePriority;
  preferredTimeframe: FlashSaleTimeframe;
  preferredFrequency: FlashSaleFrequency;
  preferredVisibility: FlashSaleVisibility;
  preferredDuration: number;
  preferredMaxDiscount: number;
  preferredMaxProducts: number;
  notificationEnabled: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnCancel: boolean;
  notificationOnLowStock: boolean;
  notificationOnHighDemand: boolean;
  isActive: boolean;
  isDefault: boolean;
  metadata?: Metadata;
}

/**
 * Flash Sale Preferences Filter
 */
export interface FlashSalePreferencesFilter {
  ids?: ID[];
  userIds?: ID[];
  preferredTypes?: FlashSaleType[];
  preferredStatuses?: FlashSaleStatus[];
  preferredPriorities?: FlashSalePriority[];
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
 * Flash Sale Preferences Statistics
 */
export interface FlashSalePreferencesStatistics {
  userId: ID;
  totalPreferences: number;
  activePreferences: number;
  defaultPreferences: number;
  byPreferredType: Record<FlashSaleType, number>;
  byPreferredStatus: Record<FlashSaleStatus, number>;
  byPreferredPriority: Record<FlashSalePriority, number>;
  byPreferredTimeframe: Record<FlashSaleTimeframe, number>;
  byPreferredFrequency: Record<FlashSaleFrequency, number>;
  byPreferredVisibility: Record<FlashSaleVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePreferredDuration: number;
  maxPreferredDuration: number;
  minPreferredDuration: number;
  averagePreferredMaxDiscount: number;
  maxPreferredMaxDiscount: number;
  minPreferredMaxDiscount: number;
  averagePreferredMaxProducts: number;
  maxPreferredMaxProducts: number;
  minPreferredMaxProducts: number;
  mostFrequentType: FlashSaleType;
  mostFrequentStatus: FlashSaleStatus;
  mostFrequentPriority: FlashSalePriority;
}

/**
 * Flash Sale Preferences Summary
 */
export interface FlashSalePreferencesSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPreferences: number;
  active: number;
  default: number;
  byPreferredType: Record<FlashSaleType, number>;
  byPreferredStatus: Record<FlashSaleStatus, number>;
  byPreferredPriority: Record<FlashSalePriority, number>;
  byPreferredTimeframe: Record<FlashSaleTimeframe, number>;
  byPreferredFrequency: Record<FlashSaleFrequency, number>;
  byPreferredVisibility: Record<FlashSaleVisibility, number>;
  preferencesTrend: {
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
  notificationMetrics: {
    notificationEnabled: number;
    notificationOnStart: number;
    notificationOnComplete: number;
    notificationOnCancel: number;
    notificationOnLowStock: number;
    notificationOnHighDemand: number;
  };
}

/**
 * Flash Sale Preferences Configuration
 */
export interface FlashSalePreferencesConfiguration {
  enabled: boolean;
  defaultType: FlashSaleType;
  defaultStatus: FlashSaleStatus;
  defaultPriority: FlashSalePriority;
  defaultTimeframe: FlashSaleTimeframe;
  defaultFrequency: FlashSaleFrequency;
  defaultVisibility: FlashSaleVisibility;
  defaultDuration: number;
  defaultMaxDiscount: number;
  defaultMaxProducts: number;
  notificationEnabled: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnCancel: boolean;
  notificationOnLowStock: boolean;
  notificationOnHighDemand: boolean;
  maxPreferencesPerUser: number;
  allowCustomPreferences: boolean;
  autoApplyDefaults: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: FlashSalePreferencesAlertConfig;
}

/**
 * Flash Sale Preferences Alert Configuration
 */
export interface FlashSalePreferencesAlertConfig {
  enabled: boolean;
  duplicatePreferencesAlert: boolean;
  invalidPreferencesAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Preferences History
 */
export interface FlashSalePreferencesHistory extends BaseEntity, Timestamp {
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
 * Flash Sale Preferences Validation
 */
export interface FlashSalePreferencesValidation {
  isValid: boolean;
  preferencesId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Preferences Export
 */
export interface FlashSalePreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: FlashSalePreferencesFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Preferences Import
 */
export interface FlashSalePreferencesImport extends BaseEntity, Timestamp {
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
 * Flash Sale Preferences Default
 */
export interface FlashSalePreferencesDefault {
  type: FlashSaleType;
  status: FlashSaleStatus;
  priority: FlashSalePriority;
  timeframe: FlashSaleTimeframe;
  frequency: FlashSaleFrequency;
  visibility: FlashSaleVisibility;
  duration: number;
  maxDiscount: number;
  maxProducts: number;
  notificationEnabled: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnCancel: boolean;
  notificationOnLowStock: boolean;
  notificationOnHighDemand: boolean;
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
};
