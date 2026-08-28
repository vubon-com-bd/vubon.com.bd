/**
 * Notification Preferences Types
 * Type definitions for user notification preferences based on shared-constants
 * @module NotificationPreferencesTypes
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
  // Notification Frequency
  NotificationPreferenceFrequency,
} from '@vubon/shared-constants';

// ============================================================
// Notification Preferences Extended Types
// ============================================================

/**
 * Notification Preferences
 */
export interface NotificationPreferences extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  channels: {
    email: NotificationChannelPreference;
    sms: NotificationChannelPreference;
    push: NotificationChannelPreference;
    inApp: NotificationChannelPreference;
    webhook: NotificationChannelPreference;
  };
  categories: Record<NotificationCategoryTypeFromCategory, NotificationCategoryPreference>;
  digest: NotificationDigestPreference;
  quietHours: NotificationQuietHoursPreference;
  priority: NotificationPriorityLevel;
  metadata?: Metadata;
}

/**
 * Notification Channel Preference
 */
export interface NotificationChannelPreference {
  enabled: boolean;
  frequency: NotificationPreferenceFrequency;
  priority: NotificationPriorityLevel;
  metadata?: Metadata;
}

/**
 * Notification Category Preference
 */
export interface NotificationCategoryPreference {
  enabled: boolean;
  channelOverrides?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
    inApp?: boolean;
    webhook?: boolean;
  };
  priorityOverride?: NotificationPriorityLevel;
  metadata?: Metadata;
}

/**
 * Notification Digest Preference
 */
export interface NotificationDigestPreference {
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  timezone: string;
  categories: NotificationCategoryTypeFromCategory[];
  metadata?: Metadata;
}

/**
 * Notification Quiet Hours Preference
 */
export interface NotificationQuietHoursPreference {
  enabled: boolean;
  start: string;
  end: string;
  timezone: string;
  exceptions: NotificationQuietHoursException[];
  metadata?: Metadata;
}

/**
 * Notification Quiet Hours Exception
 */
export interface NotificationQuietHoursException {
  date: Date;
  start: string;
  end: string;
  reason?: string;
  metadata?: Metadata;
}

/**
 * Notification Preferences Filter
 */
export interface NotificationPreferencesFilter {
  ids?: ID[];
  userIds?: ID[];
  channels?: NotificationChannelType[];
  categories?: NotificationCategoryTypeFromCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  hasQuietHours?: boolean;
  hasDigest?: boolean;
  searchTerm?: string;
}

/**
 * Notification Preferences Statistics
 */
export interface NotificationPreferencesStatistics {
  userId: ID;
  totalPreferences: number;
  byChannel: Record<NotificationChannelType, number>;
  byCategory: Record<NotificationCategoryTypeFromCategory, number>;
  byFrequency: Record<NotificationPreferenceFrequency, number>;
  byPriority: Record<NotificationPriorityLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  quietHoursEnabled: number;
  digestEnabled: number;
  mostFrequentChannel: NotificationChannelType;
  mostFrequentFrequency: NotificationPreferenceFrequency;
  mostFrequentPriority: NotificationPriorityLevel;
}

/**
 * Notification Preferences Summary
 */
export interface NotificationPreferencesSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPreferences: number;
  byChannel: Record<NotificationChannelType, number>;
  byCategory: Record<NotificationCategoryTypeFromCategory, number>;
  byFrequency: Record<NotificationPreferenceFrequency, number>;
  byPriority: Record<NotificationPriorityLevel, number>;
  preferenceTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topChannels: {
    channel: NotificationChannelType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationCategoryTypeFromCategory;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: NotificationPreferenceFrequency;
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
 * Notification Preferences Configuration
 */
export interface NotificationPreferencesConfiguration {
  enabled: boolean;
  defaultChannel: NotificationChannelType;
  defaultFrequency: NotificationPreferenceFrequency;
  defaultPriority: NotificationPriorityLevel;
  defaultCategory: NotificationCategoryTypeFromCategory;
  allowChannelPreferences: boolean;
  allowCategoryPreferences: boolean;
  allowDigestPreferences: boolean;
  allowQuietHours: boolean;
  allowPriorityOverride: boolean;
  maxPreferencesPerUser: number;
  requireConfirmation: boolean;
  notificationOnUpdate: boolean;
  alertConfig?: NotificationPreferencesAlertConfig;
}

/**
 * Notification Preferences Alert Configuration
 */
export interface NotificationPreferencesAlertConfig {
  enabled: boolean;
  invalidPreferencesAlert: boolean;
  conflictAlert: boolean;
  maxLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Preferences History
 */
export interface NotificationPreferencesHistory extends BaseEntity, Timestamp {
  id: ID;
  preferencesId: ID;
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
 * Notification Preferences Validation
 */
export interface NotificationPreferencesValidation {
  isValid: boolean;
  preferencesId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Preferences Export
 */
export interface NotificationPreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: NotificationPreferencesFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Notification Preferences Default
 */
export interface NotificationPreferencesDefault {
  channels: {
    email: NotificationChannelPreference;
    sms: NotificationChannelPreference;
    push: NotificationChannelPreference;
    inApp: NotificationChannelPreference;
    webhook: NotificationChannelPreference;
  };
  categories: Record<NotificationCategoryTypeFromCategory, NotificationCategoryPreference>;
  digest: NotificationDigestPreference;
  quietHours: NotificationQuietHoursPreference;
  priority: NotificationPriorityLevel;
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
  // Notification Frequency
  NotificationPreferenceFrequency,
};
