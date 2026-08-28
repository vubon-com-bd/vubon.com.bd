/**
 * Notification Preference Types
 * Type definitions for notification preferences based on shared-constants
 * @module NotificationPreferenceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification preference
// ============================================================
import {
  // Notification Preference
  NOTIFICATIONPREFERENCE,
  NotificationPreferenceType,
  NotificationPreferenceCategory,
  NotificationPreferenceChannel,
  NotificationPreferenceFrequency,
  NotificationPreferencePriority,
  NotificationPreferenceDNDStatus,
  NotificationPreferenceDefault,
  NotificationPreferenceLimit,
  NotificationPreferenceError,
  notificationpreferenceGetTypeLabel,
  notificationpreferenceGetCategoryLabel,
  notificationpreferenceGetChannelLabel,
  notificationpreferenceGetFrequencyLabel,
  notificationpreferenceGetPriorityLabel,
  notificationpreferenceGetDNDStatusLabel,
  notificationpreferenceGetErrorLabel,
  notificationpreferenceGetDefaultChannel,
  notificationpreferenceGetDefaultFrequency,
  notificationpreferenceIsChannelPreference,
  notificationpreferenceIsFrequencyPreference,
  notificationpreferenceIsCategoryPreference,
  notificationpreferenceIsDNDPreference,
  notificationpreferenceIsDigestPreference,
  // Notification Preference Type
  NOTIFICATIONPREFERENCE_TYPE,
  NotificationPreferenceCategoryType,
  NotificationPreferenceSubType,
  NotificationPreferenceScope,
  NotificationPreferenceOverride,
  NotificationPreferenceComplexity,
  notificationPreferenceTypeGetCategoryLabel,
  notificationpreferenceGetSubTypeLabel,
  notificationpreferenceGetScopeLabel,
  notificationpreferenceGetOverrideLabel,
  notificationpreferenceGetComplexityLabel,
  notificationpreferenceIsMarketingCategory,
  notificationpreferenceIsTransactionalCategory,
  notificationpreferenceIsSystemCategory,
  notificationpreferenceIsSecurityCategory,
  // Notification Preference Status
  NOTIFICATIONPREFERENCE_STATUS,
  NotificationPreferenceStatusType,
  NotificationPreferenceStatusColor,
  NotificationPreferenceStatusCategory,
  NotificationPreferenceStatusOrder,
  NotificationPreferenceStatusTransition,
  notificationpreferenceGetStatusLabel,
  notificationpreferenceGetStatusColor,
  notificationpreferenceGetStatusCategory,
  notificationpreferenceIsActive,
  notificationpreferenceIsPending,
  notificationpreferenceIsInactive,
  notificationpreferenceIsOverridden,
  notificationpreferenceCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Notification Preference Extended Types
// ============================================================

/**
 * Notification Preference
 */
export interface NotificationPreference extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationPreferenceType;
  category: NotificationPreferenceCategory;
  channel: NotificationPreferenceChannel;
  frequency: NotificationPreferenceFrequency;
  priority: NotificationPreferencePriority;
  dndStatus: NotificationPreferenceDNDStatus;
  status: NotificationPreferenceStatusType;
  isChannelPreference: boolean;
  isFrequencyPreference: boolean;
  isCategoryPreference: boolean;
  isDNDPreference: boolean;
  isDigestPreference: boolean;
  isActive: boolean;
  isPending: boolean;
  isInactive: boolean;
  isOverridden: boolean;
  metadata?: Metadata;
}

/**
 * Notification Preference Filter
 */
export interface NotificationPreferenceFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationPreferenceType[];
  categories?: NotificationPreferenceCategory[];
  channels?: NotificationPreferenceChannel[];
  frequencies?: NotificationPreferenceFrequency[];
  priorities?: NotificationPreferencePriority[];
  dndStatuses?: NotificationPreferenceDNDStatus[];
  statuses?: NotificationPreferenceStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isChannelPreference?: boolean;
  isFrequencyPreference?: boolean;
  isCategoryPreference?: boolean;
  isDNDPreference?: boolean;
  isDigestPreference?: boolean;
  isActive?: boolean;
  isPending?: boolean;
  isInactive?: boolean;
  isOverridden?: boolean;
  searchTerm?: string;
}

/**
 * Notification Preference Statistics
 */
export interface NotificationPreferenceStatistics {
  userId: ID;
  totalPreferences: number;
  activePreferences: number;
  pendingPreferences: number;
  inactivePreferences: number;
  overriddenPreferences: number;
  byType: Record<NotificationPreferenceType, number>;
  byCategory: Record<NotificationPreferenceCategory, number>;
  byChannel: Record<NotificationPreferenceChannel, number>;
  byFrequency: Record<NotificationPreferenceFrequency, number>;
  byPriority: Record<NotificationPreferencePriority, number>;
  byDNDStatus: Record<NotificationPreferenceDNDStatus, number>;
  byStatus: Record<NotificationPreferenceStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  channelPreferences: number;
  frequencyPreferences: number;
  categoryPreferences: number;
  dndPreferences: number;
  digestPreferences: number;
  mostFrequentType: NotificationPreferenceType;
  mostFrequentCategory: NotificationPreferenceCategory;
  mostFrequentChannel: NotificationPreferenceChannel;
  mostFrequentFrequency: NotificationPreferenceFrequency;
  mostFrequentPriority: NotificationPreferencePriority;
  mostFrequentDNDStatus: NotificationPreferenceDNDStatus;
  mostFrequentStatus: NotificationPreferenceStatusType;
}

/**
 * Notification Preference Summary
 */
export interface NotificationPreferenceSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPreferences: number;
  active: number;
  pending: number;
  inactive: number;
  overridden: number;
  byType: Record<NotificationPreferenceType, number>;
  byCategory: Record<NotificationPreferenceCategory, number>;
  byChannel: Record<NotificationPreferenceChannel, number>;
  byFrequency: Record<NotificationPreferenceFrequency, number>;
  byPriority: Record<NotificationPreferencePriority, number>;
  byDNDStatus: Record<NotificationPreferenceDNDStatus, number>;
  byStatus: Record<NotificationPreferenceStatusType, number>;
  preferenceTrend: {
    date: Date;
    total: number;
    active: number;
    pending: number;
  }[];
  topTypes: {
    type: NotificationPreferenceType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationPreferenceCategory;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: NotificationPreferenceChannel;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: NotificationPreferenceFrequency;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: NotificationPreferencePriority;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: NotificationPreferenceStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Notification Preference Configuration
 */
export interface NotificationPreferenceConfiguration {
  enabled: boolean;
  defaultType: NotificationPreferenceType;
  defaultCategory: NotificationPreferenceCategory;
  defaultChannel: NotificationPreferenceChannel;
  defaultFrequency: NotificationPreferenceFrequency;
  defaultPriority: NotificationPreferencePriority;
  defaultDNDStatus: NotificationPreferenceDNDStatus;
  maxPreferencesPerUser: number;
  allowChannelPreference: boolean;
  allowFrequencyPreference: boolean;
  allowCategoryPreference: boolean;
  allowDNDPreference: boolean;
  allowDigestPreference: boolean;
  allowOverride: boolean;
  requireConfirmation: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: NotificationPreferenceAlertConfig;
}

/**
 * Notification Preference Alert Configuration
 */
export interface NotificationPreferenceAlertConfig {
  enabled: boolean;
  preferenceConflictAlert: boolean;
  highOverrideAlert: boolean;
  highOverrideThreshold: number;
  inactivePreferenceAlert: boolean;
  maxLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Preference History
 */
export interface NotificationPreferenceHistory extends BaseEntity, Timestamp {
  id: ID;
  preferenceId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'override'
    | 'unoverride'
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
 * Notification Preference Validation
 */
export interface NotificationPreferenceValidation {
  isValid: boolean;
  preferenceId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Preference Export
 */
export interface NotificationPreferenceExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: NotificationPreferenceFilter;
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
  // Notification Preference
  NOTIFICATIONPREFERENCE,
  NotificationPreferenceType,
  NotificationPreferenceCategory,
  NotificationPreferenceChannel,
  NotificationPreferenceFrequency,
  NotificationPreferencePriority,
  NotificationPreferenceDNDStatus,
  NotificationPreferenceDefault,
  NotificationPreferenceLimit,
  NotificationPreferenceError,
  notificationpreferenceGetTypeLabel,
  notificationpreferenceGetCategoryLabel,
  notificationpreferenceGetChannelLabel,
  notificationpreferenceGetFrequencyLabel,
  notificationpreferenceGetPriorityLabel,
  notificationpreferenceGetDNDStatusLabel,
  notificationpreferenceGetErrorLabel,
  notificationpreferenceGetDefaultChannel,
  notificationpreferenceGetDefaultFrequency,
  notificationpreferenceIsChannelPreference,
  notificationpreferenceIsFrequencyPreference,
  notificationpreferenceIsCategoryPreference,
  notificationpreferenceIsDNDPreference,
  notificationpreferenceIsDigestPreference,
  // Notification Preference Type
  NOTIFICATIONPREFERENCE_TYPE,
  NotificationPreferenceCategoryType,
  NotificationPreferenceSubType,
  NotificationPreferenceScope,
  NotificationPreferenceOverride,
  NotificationPreferenceComplexity,
  notificationPreferenceTypeGetCategoryLabel,
  notificationpreferenceGetSubTypeLabel,
  notificationpreferenceGetScopeLabel,
  notificationpreferenceGetOverrideLabel,
  notificationpreferenceGetComplexityLabel,
  notificationpreferenceIsMarketingCategory,
  notificationpreferenceIsTransactionalCategory,
  notificationpreferenceIsSystemCategory,
  notificationpreferenceIsSecurityCategory,
  // Notification Preference Status
  NOTIFICATIONPREFERENCE_STATUS,
  NotificationPreferenceStatusType,
  NotificationPreferenceStatusColor,
  NotificationPreferenceStatusCategory,
  NotificationPreferenceStatusOrder,
  NotificationPreferenceStatusTransition,
  notificationpreferenceGetStatusLabel,
  notificationpreferenceGetStatusColor,
  notificationpreferenceGetStatusCategory,
  notificationpreferenceIsActive,
  notificationpreferenceIsPending,
  notificationpreferenceIsInactive,
  notificationpreferenceIsOverridden,
  notificationpreferenceCanTransition,
};
