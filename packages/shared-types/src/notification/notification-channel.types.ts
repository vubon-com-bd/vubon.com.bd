/**
 * Notification Channel Types
 * Type definitions for notification channels based on shared-constants
 * @module NotificationChannelTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification
// ============================================================
import {
  // Notification Channel
  NOTIFICATION_CHANNEL,
  NotificationChannelType,
  NotificationChannelCategory,
  NotificationChannelProvider,
  NotificationChannelCapability,
  NotificationChannelDefault,
  NotificationChannelLimit,
  notificationChannelGetChannelLabel,
  notificationGetChannelCategory,
  notificationGetChannelProvider,
  notificationIsEmailChannel,
  notificationIsSMSChannel,
  notificationIsPushChannel,
  notificationIsInAppChannel,
  notificationIsSocialChannel,
  notificationIsWebChannel,
  notificationIsMobileChannel,
  notificationGetDefaultChannel,
} from '@vubon/shared-constants';

// ============================================================
// Notification Channel Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Notification Channel Filter
 */
export interface NotificationChannelFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationChannelType[];
  categories?: NotificationChannelCategory[];
  providers?: NotificationChannelProvider[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  isEmail?: boolean;
  isSMS?: boolean;
  isPush?: boolean;
  isInApp?: boolean;
  isSocial?: boolean;
  isWeb?: boolean;
  isMobile?: boolean;
  searchTerm?: string;
}

/**
 * Notification Channel Statistics
 */
export interface NotificationChannelStatistics {
  userId: ID;
  totalChannels: number;
  activeChannels: number;
  defaultChannels: number;
  byType: Record<NotificationChannelType, number>;
  byCategory: Record<NotificationChannelCategory, number>;
  byProvider: Record<NotificationChannelProvider, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  emailChannels: number;
  smsChannels: number;
  pushChannels: number;
  inAppChannels: number;
  socialChannels: number;
  webChannels: number;
  mobileChannels: number;
  mostFrequentType: NotificationChannelType;
  mostFrequentCategory: NotificationChannelCategory;
  mostFrequentProvider: NotificationChannelProvider;
}

/**
 * Notification Channel Summary
 */
export interface NotificationChannelSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalChannels: number;
  active: number;
  default: number;
  byType: Record<NotificationChannelType, number>;
  byCategory: Record<NotificationChannelCategory, number>;
  byProvider: Record<NotificationChannelProvider, number>;
  channelTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: NotificationChannelType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationChannelCategory;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: NotificationChannelProvider;
    count: number;
    label: string;
  }[];
}

/**
 * Notification Channel Configuration
 */
export interface NotificationChannelConfiguration {
  enabled: boolean;
  defaultType: NotificationChannelType;
  defaultCategory: NotificationChannelCategory;
  defaultProvider: NotificationChannelProvider;
  maxChannelsPerUser: number;
  requireVerification: boolean;
  allowMultipleChannels: boolean;
  allowCustomConfig: boolean;
  notificationOnAdd: boolean;
  notificationOnRemove: boolean;
  notificationOnUpdate: boolean;
  alertConfig?: NotificationChannelAlertConfig;
}

/**
 * Notification Channel Alert Configuration
 */
export interface NotificationChannelAlertConfig {
  enabled: boolean;
  duplicateChannelAlert: boolean;
  inactiveChannelAlert: boolean;
  verificationFailureAlert: boolean;
  providerUnavailableAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Channel History
 */
export interface NotificationChannelHistory extends BaseEntity, Timestamp {
  id: ID;
  channelId: ID;
  userId: ID;
  action:
    | 'add'
    | 'update'
    | 'remove'
    | 'activate'
    | 'deactivate'
    | 'set_default'
    | 'unset_default'
    | 'verify'
    | 'unverify';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Channel Validation
 */
export interface NotificationChannelValidation {
  isValid: boolean;
  channelId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Channel Verification
 */
export interface NotificationChannelVerification extends BaseEntity, Timestamp {
  id: ID;
  channelId: ID;
  userId: ID;
  method: 'code' | 'link' | 'otp' | 'manual';
  status: 'pending' | 'verified' | 'failed' | 'expired';
  verifiedAt?: Date;
  expiresAt?: Date;
  attempts: number;
  maxAttempts: number;
  metadata?: Metadata;
}

/**
 * Notification Channel Export
 */
export interface NotificationChannelExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: NotificationChannelFilter;
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
  // Notification Channel
  NOTIFICATION_CHANNEL,
  NotificationChannelType,
  NotificationChannelCategory,
  NotificationChannelProvider,
  NotificationChannelCapability,
  NotificationChannelDefault,
  NotificationChannelLimit,
  notificationChannelGetChannelLabel,
  notificationGetChannelCategory,
  notificationGetChannelProvider,
  notificationIsEmailChannel,
  notificationIsSMSChannel,
  notificationIsPushChannel,
  notificationIsInAppChannel,
  notificationIsSocialChannel,
  notificationIsWebChannel,
  notificationIsMobileChannel,
  notificationGetDefaultChannel,
};
