/**
 * Notification Settings Types
 * Type definitions for notification settings based on shared-constants
 * @module NotificationSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification
// ============================================================
import {
  // Notification Channel
  NotificationChannelType,
  NotificationChannelCategory,
  // Notification Priority
  NotificationPriorityLevel,
  // Notification Category
  NotificationCategoryTypeFromCategory,
} from '@vubon/shared-constants';

// ============================================================
// Notification Settings Extended Types
// ============================================================

/**
 * Notification Settings
 */
export interface NotificationSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  defaultChannel: NotificationChannelType;
  defaultPriority: NotificationPriorityLevel;
  defaultCategory: NotificationCategoryTypeFromCategory;
  enabled: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
  digest: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
  };
  preferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
    webhook: boolean;
  };
  categories: Record<string, boolean>;
  metadata?: Metadata;
}

/**
 * Notification Settings Filter
 */
export interface NotificationSettingsFilter {
  ids?: ID[];
  userIds?: ID[];
  defaultChannels?: NotificationChannelType[];
  defaultPriorities?: NotificationPriorityLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isEnabled?: boolean;
  hasQuietHours?: boolean;
  hasDigest?: boolean;
  searchTerm?: string;
}

/**
 * Notification Settings Statistics
 */
export interface NotificationSettingsStatistics {
  userId: ID;
  totalSettings: number;
  enabledSettings: number;
  byDefaultChannel: Record<NotificationChannelType, number>;
  byDefaultPriority: Record<NotificationPriorityLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  quietHoursEnabled: number;
  digestEnabled: number;
  mostFrequentChannel: NotificationChannelType;
  mostFrequentPriority: NotificationPriorityLevel;
}

/**
 * Notification Settings Summary
 */
export interface NotificationSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  enabled: number;
  byDefaultChannel: Record<NotificationChannelType, number>;
  byDefaultPriority: Record<NotificationPriorityLevel, number>;
  settingsTrend: {
    date: Date;
    total: number;
    enabled: number;
  }[];
  topChannels: {
    channel: NotificationChannelType;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: NotificationPriorityLevel;
    count: number;
    label: string;
  }[];
}

/**
 * Notification Settings Configuration
 */
export interface NotificationSettingsConfiguration {
  enabled: boolean;
  defaultChannel: NotificationChannelType;
  defaultPriority: NotificationPriorityLevel;
  defaultCategory: NotificationCategoryTypeFromCategory;
  allowQuietHours: boolean;
  allowDigest: boolean;
  allowCustomPreferences: boolean;
  allowCategoryPreferences: boolean;
  maxSettingsPerUser: number;
  requireConfirmation: boolean;
  notificationOnUpdate: boolean;
  alertConfig?: NotificationSettingsAlertConfig;
}

/**
 * Notification Settings Alert Configuration
 */
export interface NotificationSettingsAlertConfig {
  enabled: boolean;
  invalidSettingsAlert: boolean;
  conflictAlert: boolean;
  maxLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Settings History
 */
export interface NotificationSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  userId: ID;
  action: 'create' | 'update' | 'enable' | 'disable' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Settings Validation
 */
export interface NotificationSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Settings Export
 */
export interface NotificationSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: NotificationSettingsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Notification Settings Default
 */
export interface NotificationSettingsDefault {
  defaultChannel: NotificationChannelType;
  defaultPriority: NotificationPriorityLevel;
  defaultCategory: NotificationCategoryTypeFromCategory;
  enabled: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
  digest: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
  };
  preferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
    webhook: boolean;
  };
  categories: Record<string, boolean>;
  version: string;
  updatedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Notification Channel
  NotificationChannelType,
  NotificationChannelCategory,
  // Notification Priority
  NotificationPriorityLevel,
  // Notification Category
  NotificationCategoryTypeFromCategory,
};
