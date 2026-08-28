/**
 * In-App Types
 * Type definitions for in-app notifications based on shared-constants
 * @module InAppTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification in-app
// ============================================================
import {
  // In-App
  NOTIFICATIONINAPP,
  NotificationInAppType,
  NotificationInAppCategory,
  NotificationInAppPosition,
  NotificationInAppAnimation,
  NotificationInAppDefault,
  NotificationInAppLimit,
  NotificationInAppError,
  notificationinappGetTypeLabel,
  notificationinappGetCategoryLabel,
  notificationinappGetPositionLabel,
  notificationinappGetAnimationLabel,
  notificationinappGetErrorLabel,
  notificationinappGetDefaultDuration,
  notificationinappGetDefaultMaxStack,
  notificationinappIsBannerType,
  notificationinappIsModalType,
  // In-App Status
  NOTIFICATIONINAPP_STATUS,
  NotificationInAppStatusType,
  NotificationInAppStatusColor,
  NotificationInAppStatusCategory,
  NotificationInAppStatusOrder,
  NotificationInAppStatusTransition,
  notificationinappGetStatusLabel,
  notificationinappGetStatusColor,
  notificationinappGetStatusCategory,
  notificationinappIsDisplayed,
  notificationinappIsEngaged,
  notificationinappIsFailed,
  notificationinappIsPending,
  notificationinappCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// In-App Extended Types
// ============================================================

/**
 * In-App Notification
 */
export interface InAppNotification extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationInAppType;
  category: NotificationInAppCategory;
  position: NotificationInAppPosition;
  animation: NotificationInAppAnimation;
  status: NotificationInAppStatusType;
  title: string;
  body: string;
  icon?: string;
  image?: string;
  action?: {
    label: string;
    url?: string;
    payload?: Record<string, unknown>;
  };
  duration: number;
  isBanner: boolean;
  isModal: boolean;
  isDisplayed: boolean;
  isEngaged: boolean;
  isFailed: boolean;
  isPending: boolean;
  displayedAt?: Date;
  engagedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * In-App Filter
 */
export interface InAppFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationInAppType[];
  categories?: NotificationInAppCategory[];
  statuses?: NotificationInAppStatusType[];
  positions?: NotificationInAppPosition[];
  animations?: NotificationInAppAnimation[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isBanner?: boolean;
  isModal?: boolean;
  isDisplayed?: boolean;
  isEngaged?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  searchTerm?: string;
  title?: string;
}

/**
 * In-App Statistics
 */
export interface InAppStatistics {
  userId: ID;
  totalInApp: number;
  displayedInApp: number;
  engagedInApp: number;
  failedInApp: number;
  pendingInApp: number;
  byType: Record<NotificationInAppType, number>;
  byCategory: Record<NotificationInAppCategory, number>;
  byStatus: Record<NotificationInAppStatusType, number>;
  byPosition: Record<NotificationInAppPosition, number>;
  byAnimation: Record<NotificationInAppAnimation, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  displayRate: number;
  engagementRate: number;
  failureRate: number;
  mostFrequentType: NotificationInAppType;
  mostFrequentCategory: NotificationInAppCategory;
  mostFrequentPosition: NotificationInAppPosition;
  mostFrequentAnimation: NotificationInAppAnimation;
}

/**
 * In-App Summary
 */
export interface InAppSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalInApp: number;
  displayed: number;
  engaged: number;
  failed: number;
  pending: number;
  byType: Record<NotificationInAppType, number>;
  byCategory: Record<NotificationInAppCategory, number>;
  byStatus: Record<NotificationInAppStatusType, number>;
  byPosition: Record<NotificationInAppPosition, number>;
  byAnimation: Record<NotificationInAppAnimation, number>;
  inAppTrend: {
    date: Date;
    total: number;
    displayed: number;
    engaged: number;
  }[];
  topTypes: {
    type: NotificationInAppType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationInAppCategory;
    count: number;
    label: string;
  }[];
  topPositions: {
    position: NotificationInAppPosition;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    displayRate: number;
    engagementRate: number;
    failureRate: number;
  };
}

/**
 * In-App Configuration
 */
export interface InAppConfiguration {
  enabled: boolean;
  defaultType: NotificationInAppType;
  defaultCategory: NotificationInAppCategory;
  defaultPosition: NotificationInAppPosition;
  defaultAnimation: NotificationInAppAnimation;
  defaultDuration: number;
  defaultMaxStack: number;
  maxRetries: number;
  retryDelaySeconds: number;
  enableDisplayTracking: boolean;
  enableEngagementTracking: boolean;
  notificationOnDisplay: boolean;
  notificationOnEngagement: boolean;
  notificationOnFailure: boolean;
  alertConfig?: InAppAlertConfig;
}

/**
 * In-App Alert Configuration
 */
export interface InAppAlertConfig {
  enabled: boolean;
  displayFailureAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  lowEngagementRateAlert: boolean;
  lowEngagementRateThreshold: number;
  stackOverflowAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * In-App History
 */
export interface InAppHistory extends BaseEntity, Timestamp {
  id: ID;
  inAppId: ID;
  userId: ID;
  action: 'create' | 'display' | 'engage' | 'fail' | 'retry' | 'dismiss';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * In-App Validation
 */
export interface InAppValidation {
  isValid: boolean;
  inAppId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * In-App Export
 */
export interface InAppExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: InAppFilter;
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
  // In-App
  NOTIFICATIONINAPP,
  NotificationInAppType,
  NotificationInAppCategory,
  NotificationInAppPosition,
  NotificationInAppAnimation,
  NotificationInAppDefault,
  NotificationInAppLimit,
  NotificationInAppError,
  notificationinappGetTypeLabel,
  notificationinappGetCategoryLabel,
  notificationinappGetPositionLabel,
  notificationinappGetAnimationLabel,
  notificationinappGetErrorLabel,
  notificationinappGetDefaultDuration,
  notificationinappGetDefaultMaxStack,
  notificationinappIsBannerType,
  notificationinappIsModalType,
  // In-App Status
  NOTIFICATIONINAPP_STATUS,
  NotificationInAppStatusType,
  NotificationInAppStatusColor,
  NotificationInAppStatusCategory,
  NotificationInAppStatusOrder,
  NotificationInAppStatusTransition,
  notificationinappGetStatusLabel,
  notificationinappGetStatusColor,
  notificationinappGetStatusCategory,
  notificationinappIsDisplayed,
  notificationinappIsEngaged,
  notificationinappIsFailed,
  notificationinappIsPending,
  notificationinappCanTransition,
};
