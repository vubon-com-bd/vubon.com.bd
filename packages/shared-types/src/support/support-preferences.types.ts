/**
 * Support Preferences Types
 * Type definitions for support preferences based on shared-constants
 * @module SupportPreferencesTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import SupportSLA from support-sla.types
// ============================================================
import type { SupportSLA } from './support-sla.types';

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
// Support Preferences Extended Types
// ============================================================

/**
 * Support preferences
 */
export interface SupportPreferences extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  preferredType: SupportType;
  preferredChannel: SupportChannel;
  preferredLanguage: SupportLanguage;
  preferredSLA: SupportSLA;
  notificationPreferences: SupportNotificationPreferences;
  displayPreferences: SupportDisplayPreferences;
  accessibilityPreferences: SupportAccessibilityPreferences;
  privacyPreferences: SupportPrivacyPreferences;
  metadata?: Metadata;
}

/**
 * Support notification preferences
 */
export interface SupportNotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
  categories: {
    ticket: boolean;
    assignment: boolean;
    escalation: boolean;
    resolution: boolean;
    feedback: boolean;
    survey: boolean;
    system: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
  digest: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';
  };
}

/**
 * Support display preferences
 */
export interface SupportDisplayPreferences {
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
  animations: boolean;
  fontSize: 'small' | 'medium' | 'large';
  density: 'compact' | 'comfortable' | 'spacious';
  listView: 'grid' | 'list' | 'cards';
  sortOrder: 'asc' | 'desc';
  sortBy: 'created_at' | 'updated_at' | 'priority' | 'status' | 'type';
  itemsPerPage: number;
}

/**
 * Support accessibility preferences
 */
export interface SupportAccessibilityPreferences {
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicator: boolean;
  fontSizeMultiplier: number;
  colorBlindMode: boolean;
  darkMode: boolean;
  descriptiveLinks: boolean;
}

/**
 * Support privacy preferences
 */
export interface SupportPrivacyPreferences {
  profileVisibility: 'public' | 'private' | 'team';
  showEmail: boolean;
  showPhone: boolean;
  showActivity: boolean;
  allowAnalytics: boolean;
  allowMarketing: boolean;
  allowDataSharing: boolean;
  dataRetention: '1m' | '3m' | '6m' | '1y' | 'forever';
  allowDataExport: boolean;
  allowDataDeletion: boolean;
}

/**
 * Support preferences filter
 */
export interface SupportPreferencesFilter {
  ids?: ID[];
  userIds?: ID[];
  preferredTypes?: SupportType[];
  preferredChannels?: SupportChannel[];
  preferredLanguages?: SupportLanguage[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

/**
 * Support preferences statistics
 */
export interface SupportPreferencesStatistics {
  userId: ID;
  totalPreferences: number;
  preferredTypeDistribution: Record<SupportType, number>;
  preferredChannelDistribution: Record<SupportChannel, number>;
  preferredLanguageDistribution: Record<SupportLanguage, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  notificationEnabledCount: number;
  emailNotificationsCount: number;
  smsNotificationsCount: number;
  pushNotificationsCount: number;
  inAppNotificationsCount: number;
  digestEnabledCount: number;
  quietHoursEnabledCount: number;
  mostFrequentPreferredType: SupportType;
  mostFrequentPreferredChannel: SupportChannel;
  mostFrequentPreferredLanguage: SupportLanguage;
}

/**
 * Support preferences summary
 */
export interface SupportPreferencesSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPreferences: number;
  preferredTypeDistribution: Record<SupportType, number>;
  preferredChannelDistribution: Record<SupportChannel, number>;
  preferredLanguageDistribution: Record<SupportLanguage, number>;
  preferencesTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topPreferredTypes: {
    type: SupportType;
    count: number;
    label: string;
  }[];
  topPreferredChannels: {
    channel: SupportChannel;
    count: number;
    label: string;
  }[];
  topPreferredLanguages: {
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
 * Support preferences configuration
 */
export interface SupportPreferencesConfiguration {
  enabled: boolean;
  defaultType: SupportType;
  defaultChannel: SupportChannel;
  defaultLanguage: SupportLanguage;
  defaultSLA: SupportSLA;
  allowedTypes: SupportType[];
  allowedChannels: SupportChannel[];
  allowedLanguages: SupportLanguage[];
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
  displayPreferences: {
    theme: 'light' | 'dark' | 'system';
    compactMode: boolean;
    animations: boolean;
    fontSize: 'small' | 'medium' | 'large';
    density: 'compact' | 'comfortable' | 'spacious';
    listView: 'grid' | 'list' | 'cards';
    sortOrder: 'asc' | 'desc';
    sortBy: 'created_at' | 'updated_at' | 'priority' | 'status' | 'type';
    itemsPerPage: number;
  };
  accessibilityPreferences: {
    highContrast: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
    keyboardNavigation: boolean;
    focusIndicator: boolean;
    fontSizeMultiplier: number;
    colorBlindMode: boolean;
    darkMode: boolean;
    descriptiveLinks: boolean;
  };
  privacyPreferences: {
    profileVisibility: 'public' | 'private' | 'team';
    showEmail: boolean;
    showPhone: boolean;
    showActivity: boolean;
    allowAnalytics: boolean;
    allowMarketing: boolean;
    allowDataSharing: boolean;
    dataRetention: '1m' | '3m' | '6m' | '1y' | 'forever';
    allowDataExport: boolean;
    allowDataDeletion: boolean;
  };
  alertConfig?: SupportPreferencesAlertConfig;
}

/**
 * Support preferences alert configuration
 */
export interface SupportPreferencesAlertConfig {
  enabled: boolean;
  invalidPreferencesAlert: boolean;
  channelUnavailableAlert: boolean;
  typeUnavailableAlert: boolean;
  languageUnavailableAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support preferences history
 */
export interface SupportPreferencesHistory extends BaseEntity, Timestamp {
  id: ID;
  preferencesId: ID;
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
 * Support preferences validation
 */
export interface SupportPreferencesValidation {
  isValid: boolean;
  preferencesId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support preferences export
 */
export interface SupportPreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportPreferencesFilter;
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
