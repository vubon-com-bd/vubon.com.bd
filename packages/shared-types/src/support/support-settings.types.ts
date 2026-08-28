/**
 * Support Settings Types
 * Type definitions for support settings based on shared-constants
 * @module SupportSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support
// ============================================================
import {
  // Support Core
  SupportType,
  SupportChannel,
  SupportLanguage,
  // Support Permission
  SupportPermissionModule,
  SupportPermissionAction,
  SupportPermissionRole,
  SupportPermissionLevel,
  SupportPermissionScope,
} from '@vubon/shared-constants';

// ============================================================
// Support Settings Extended Types
// ============================================================

/**
 * Support settings
 */
export interface SupportSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  defaultType: SupportType;
  defaultChannel: SupportChannel;
  defaultSLA: string;
  defaultLanguage: SupportLanguage;
  notificationsEnabled: boolean;
  autoAssignEnabled: boolean;
  autoAssignStrategy: 'round_robin' | 'least_busy' | 'skill_based' | 'priority_based';
  maxTicketsPerAgent: number;
  ticketPriorityDefault: string;
  ticketCategoryDefault: string;
  ticketTagDefault: string[];
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  metadata?: Metadata;
}

/**
 * Support settings filter
 */
export interface SupportSettingsFilter {
  ids?: ID[];
  userIds?: ID[];
  defaultTypes?: SupportType[];
  defaultChannels?: SupportChannel[];
  defaultLanguages?: SupportLanguage[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  notificationsEnabled?: boolean;
  autoAssignEnabled?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  inAppNotifications?: boolean;
  searchTerm?: string;
}

/**
 * Support settings statistics
 */
export interface SupportSettingsStatistics {
  userId: ID;
  totalSettings: number;
  defaultTypeDistribution: Record<SupportType, number>;
  defaultChannelDistribution: Record<SupportChannel, number>;
  defaultLanguageDistribution: Record<SupportLanguage, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  notificationsEnabledCount: number;
  autoAssignEnabledCount: number;
  emailNotificationsCount: number;
  smsNotificationsCount: number;
  pushNotificationsCount: number;
  inAppNotificationsCount: number;
  mostFrequentDefaultType: SupportType;
  mostFrequentDefaultChannel: SupportChannel;
  mostFrequentDefaultLanguage: SupportLanguage;
}

/**
 * Support settings summary
 */
export interface SupportSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  defaultTypeDistribution: Record<SupportType, number>;
  defaultChannelDistribution: Record<SupportChannel, number>;
  defaultLanguageDistribution: Record<SupportLanguage, number>;
  settingsTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topDefaultTypes: {
    type: SupportType;
    count: number;
    label: string;
  }[];
  topDefaultChannels: {
    channel: SupportChannel;
    count: number;
    label: string;
  }[];
  topDefaultLanguages: {
    language: SupportLanguage;
    count: number;
    label: string;
  }[];
  notificationMetrics: {
    email: number;
    sms: number;
    push: number;
    inApp: number;
  };
}

/**
 * Support settings configuration
 */
export interface SupportSettingsConfiguration {
  enabled: boolean;
  defaultType: SupportType;
  defaultChannel: SupportChannel;
  defaultSLA: string;
  defaultLanguage: SupportLanguage;
  allowedTypes: SupportType[];
  allowedChannels: SupportChannel[];
  allowedLanguages: SupportLanguage[];
  notificationsEnabled: boolean;
  autoAssignEnabled: boolean;
  autoAssignStrategy: 'round_robin' | 'least_busy' | 'skill_based' | 'priority_based';
  maxTicketsPerAgent: number;
  ticketPriorityDefault: string;
  ticketCategoryDefault: string;
  ticketTagDefault: string[];
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  maxRetries: number;
  retryDelayMinutes: number;
  alertConfig?: SupportSettingsAlertConfig;
}

/**
 * Support settings alert configuration
 */
export interface SupportSettingsAlertConfig {
  enabled: boolean;
  invalidSettingsAlert: boolean;
  channelUnavailableAlert: boolean;
  typeUnavailableAlert: boolean;
  languageUnavailableAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support settings history
 */
export interface SupportSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  userId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Support settings validation
 */
export interface SupportSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support settings export
 */
export interface SupportSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportSettingsFilter;
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
  // Support Core
  SupportType,
  SupportChannel,
  SupportLanguage,
  // Support Permission
  SupportPermissionModule,
  SupportPermissionAction,
  SupportPermissionRole,
  SupportPermissionLevel,
  SupportPermissionScope,
};
