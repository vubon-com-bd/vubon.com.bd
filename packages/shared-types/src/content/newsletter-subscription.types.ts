/**
 * Newsletter Subscription Types
 * Type definitions for newsletter subscriptions based on shared-constants
 * @module NewsletterSubscriptionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants newsletter
// ============================================================
import {
  // Newsletter Subscription
  CONTENT_NEWSLETTER_SUBSCRIPTION,
  ContentNewsletterSubscriptionType,
  ContentNewsletterSubscriptionStatus,
  ContentNewsletterSubscriptionSource,
  ContentNewsletterSubscriptionPreference,
  ContentNewsletterSubscriptionChannel,
  contentNewsletterSubscriptionGetTypeLabel,
  contentNewsletterSubscriptionGetStatusLabel,
  contentNewsletterSubscriptionGetSourceLabel,
  contentNewsletterSubscriptionGetPreferenceLabel,
  contentNewsletterSubscriptionGetChannelLabel,
  contentNewsletterSubscriptionIsActive,
  contentNewsletterSubscriptionIsUnsubscribed,
  contentNewsletterSubscriptionGetDefaultType,
  contentNewsletterSubscriptionGetDefaultStatus,
  contentNewsletterSubscriptionGetDefaultSource,
  contentNewsletterSubscriptionGetDefaultChannel,
  contentNewsletterSubscriptionIsValidType,
  contentNewsletterSubscriptionIsValidStatus,
  contentNewsletterSubscriptionIsValidSource,
  // Newsletter Subscription Status
  CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS,
  ContentNewsletterSubscriptionStatusType,
  ContentNewsletterSubscriptionStatusCategory,
  ContentNewsletterSubscriptionStatusColor,
  ContentNewsletterSubscriptionStatusPriority,
  ContentNewsletterSubscriptionState,
  ContentNewsletterSubscriptionAction,
  contentNewsletterSubscriptionStatusGetLabel,
  contentNewsletterSubscriptionStatusGetCategory,
  contentNewsletterSubscriptionStatusGetColor,
  contentNewsletterSubscriptionStatusGetPriority,
  contentNewsletterSubscriptionStatusIsActive,
  contentNewsletterSubscriptionStatusIsTerminated,
  contentNewsletterSubscriptionStatusCanTransitionTo,
  contentNewsletterSubscriptionStatusGetAvailableTransitions,
  contentNewsletterSubscriptionStatusGetStateLabel,
  contentNewsletterSubscriptionStatusGetActionLabel,
  contentNewsletterSubscriptionStatusIsValid,
  contentNewsletterSubscriptionStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Newsletter Subscription Extended Types
// ============================================================

/**
 * Newsletter Subscription
 */
export interface NewsletterSubscription extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  email: string;
  type: ContentNewsletterSubscriptionType;
  status: ContentNewsletterSubscriptionStatusType;
  source: ContentNewsletterSubscriptionSource;
  preference: ContentNewsletterSubscriptionPreference;
  channel: ContentNewsletterSubscriptionChannel;
  isActive: boolean;
  isUnsubscribed: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
  metadata?: Metadata;
}

/**
 * Newsletter Subscription Filter
 */
export interface NewsletterSubscriptionFilter {
  ids?: ID[];
  userIds?: ID[];
  emails?: string[];
  types?: ContentNewsletterSubscriptionType[];
  statuses?: ContentNewsletterSubscriptionStatusType[];
  sources?: ContentNewsletterSubscriptionSource[];
  preferences?: ContentNewsletterSubscriptionPreference[];
  channels?: ContentNewsletterSubscriptionChannel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isUnsubscribed?: boolean;
  searchTerm?: string;
}

/**
 * Newsletter Subscription Statistics
 */
export interface NewsletterSubscriptionStatistics {
  userId: ID;
  totalSubscriptions: number;
  activeSubscriptions: number;
  unsubscribedSubscriptions: number;
  byType: Record<ContentNewsletterSubscriptionType, number>;
  byStatus: Record<ContentNewsletterSubscriptionStatusType, number>;
  bySource: Record<ContentNewsletterSubscriptionSource, number>;
  byPreference: Record<ContentNewsletterSubscriptionPreference, number>;
  byChannel: Record<ContentNewsletterSubscriptionChannel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalEmails: number;
  uniqueEmails: number;
  averageSubscriptionsPerUser: number;
  mostFrequentType: ContentNewsletterSubscriptionType;
  mostFrequentSource: ContentNewsletterSubscriptionSource;
  mostFrequentChannel: ContentNewsletterSubscriptionChannel;
  mostFrequentStatus: ContentNewsletterSubscriptionStatusType;
}

/**
 * Newsletter Subscription Summary
 */
export interface NewsletterSubscriptionSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  unsubscribed: number;
  byType: Record<ContentNewsletterSubscriptionType, number>;
  byStatus: Record<ContentNewsletterSubscriptionStatusType, number>;
  bySource: Record<ContentNewsletterSubscriptionSource, number>;
  byPreference: Record<ContentNewsletterSubscriptionPreference, number>;
  byChannel: Record<ContentNewsletterSubscriptionChannel, number>;
  subscriptionTrend: {
    date: Date;
    total: number;
    active: number;
    unsubscribed: number;
  }[];
  topTypes: {
    type: ContentNewsletterSubscriptionType;
    count: number;
    label: string;
  }[];
  topSources: {
    source: ContentNewsletterSubscriptionSource;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: ContentNewsletterSubscriptionChannel;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentNewsletterSubscriptionStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Newsletter Subscription Configuration
 */
export interface NewsletterSubscriptionConfiguration {
  enabled: boolean;
  defaultType: ContentNewsletterSubscriptionType;
  defaultStatus: ContentNewsletterSubscriptionStatusType;
  defaultSource: ContentNewsletterSubscriptionSource;
  defaultPreference: ContentNewsletterSubscriptionPreference;
  defaultChannel: ContentNewsletterSubscriptionChannel;
  allowMultipleSubscriptions: boolean;
  allowAnonymousSubscriptions: boolean;
  requireConfirmation: boolean;
  confirmationExpiryHours: number;
  maxSubscriptionsPerUser: number;
  notificationOnSubscribe: boolean;
  notificationOnUnsubscribe: boolean;
  notificationOnUpdate: boolean;
  alertConfig?: NewsletterSubscriptionAlertConfig;
}

/**
 * Newsletter Subscription Alert Configuration
 */
export interface NewsletterSubscriptionAlertConfig {
  enabled: boolean;
  highUnsubscribeRateAlert: boolean;
  highUnsubscribeRateThreshold: number;
  spamSubscriptionAlert: boolean;
  confirmationFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Newsletter Subscription History
 */
export interface NewsletterSubscriptionHistory extends BaseEntity, Timestamp {
  id: ID;
  subscriptionId: ID;
  userId: ID;
  action: 'subscribe' | 'unsubscribe' | 'update' | 'confirm' | 'expire' | 'restore' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Newsletter Subscription Validation
 */
export interface NewsletterSubscriptionValidation {
  isValid: boolean;
  subscriptionId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Newsletter Subscription Export
 */
export interface NewsletterSubscriptionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: NewsletterSubscriptionFilter;
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
  // Newsletter Subscription
  CONTENT_NEWSLETTER_SUBSCRIPTION,
  ContentNewsletterSubscriptionType,
  ContentNewsletterSubscriptionStatus,
  ContentNewsletterSubscriptionSource,
  ContentNewsletterSubscriptionPreference,
  ContentNewsletterSubscriptionChannel,
  contentNewsletterSubscriptionGetTypeLabel,
  contentNewsletterSubscriptionGetStatusLabel,
  contentNewsletterSubscriptionGetSourceLabel,
  contentNewsletterSubscriptionGetPreferenceLabel,
  contentNewsletterSubscriptionGetChannelLabel,
  contentNewsletterSubscriptionIsActive,
  contentNewsletterSubscriptionIsUnsubscribed,
  contentNewsletterSubscriptionGetDefaultType,
  contentNewsletterSubscriptionGetDefaultStatus,
  contentNewsletterSubscriptionGetDefaultSource,
  contentNewsletterSubscriptionGetDefaultChannel,
  contentNewsletterSubscriptionIsValidType,
  contentNewsletterSubscriptionIsValidStatus,
  contentNewsletterSubscriptionIsValidSource,
  // Newsletter Subscription Status
  CONTENT_NEWSLETTER_SUBSCRIPTION_STATUS,
  ContentNewsletterSubscriptionStatusType,
  ContentNewsletterSubscriptionStatusCategory,
  ContentNewsletterSubscriptionStatusColor,
  ContentNewsletterSubscriptionStatusPriority,
  ContentNewsletterSubscriptionState,
  ContentNewsletterSubscriptionAction,
  contentNewsletterSubscriptionStatusGetLabel,
  contentNewsletterSubscriptionStatusGetCategory,
  contentNewsletterSubscriptionStatusGetColor,
  contentNewsletterSubscriptionStatusGetPriority,
  contentNewsletterSubscriptionStatusIsActive,
  contentNewsletterSubscriptionStatusIsTerminated,
  contentNewsletterSubscriptionStatusCanTransitionTo,
  contentNewsletterSubscriptionStatusGetAvailableTransitions,
  contentNewsletterSubscriptionStatusGetStateLabel,
  contentNewsletterSubscriptionStatusGetActionLabel,
  contentNewsletterSubscriptionStatusIsValid,
  contentNewsletterSubscriptionStatusIsValidState,
};
