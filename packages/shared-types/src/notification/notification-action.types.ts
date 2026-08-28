/**
 * Notification Action Types
 * Type definitions for notification actions based on shared-constants
 * @module NotificationActionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification
// ============================================================
import {
  // Notification Action
  NOTIFICATION_ACTION,
  NotificationActionType,
  NotificationActionCategory,
  NotificationActionStatus,
  NotificationActionIcon,
  NotificationActionColor,
  NotificationActionDefault,
  notificationActionGetActionLabel,
  notificationGetActionCategory,
  notificationGetActionIcon,
  notificationGetActionColor,
  notificationIsViewAction,
  notificationIsInteractAction,
  notificationIsModifyAction,
  notificationActionIsSocialAction,
  notificationGetDefaultAction,
} from '@vubon/shared-constants';

// ============================================================
// Notification Action Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Notification Action Filter
 */
export interface NotificationActionFilter {
  ids?: ID[];
  notificationIds?: ID[];
  userIds?: ID[];
  types?: NotificationActionType[];
  categories?: NotificationActionCategory[];
  statuses?: NotificationActionStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isView?: boolean;
  isInteract?: boolean;
  isModify?: boolean;
  isSocial?: boolean;
  isDefault?: boolean;
  searchTerm?: string;
}

/**
 * Notification Action Statistics
 */
export interface NotificationActionStatistics {
  notificationId: ID;
  totalActions: number;
  viewActions: number;
  interactActions: number;
  modifyActions: number;
  socialActions: number;
  defaultActions: number;
  byType: Record<NotificationActionType, number>;
  byCategory: Record<NotificationActionCategory, number>;
  byStatus: Record<NotificationActionStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: NotificationActionType;
  mostFrequentCategory: NotificationActionCategory;
  mostFrequentStatus: NotificationActionStatus;
}

/**
 * Notification Action Summary
 */
export interface NotificationActionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalActions: number;
  view: number;
  interact: number;
  modify: number;
  social: number;
  default: number;
  byType: Record<NotificationActionType, number>;
  byCategory: Record<NotificationActionCategory, number>;
  byStatus: Record<NotificationActionStatus, number>;
  actionTrend: {
    date: Date;
    total: number;
    view: number;
    interact: number;
  }[];
  topTypes: {
    type: NotificationActionType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: NotificationActionCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: NotificationActionStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Notification Action Configuration
 */
export interface NotificationActionConfiguration {
  enabled: boolean;
  defaultType: NotificationActionType;
  defaultCategory: NotificationActionCategory;
  defaultAction: NotificationActionDefault;
  maxActionsPerNotification: number;
  requireLabel: boolean;
  requireUrl: boolean;
  allowCustomPayload: boolean;
  allowSocialActions: boolean;
  notificationOnAction: boolean;
  notificationOnView: boolean;
  notificationOnInteract: boolean;
  alertConfig?: NotificationActionAlertConfig;
}

/**
 * Notification Action Alert Configuration
 */
export interface NotificationActionAlertConfig {
  enabled: boolean;
  highInteractRateAlert: boolean;
  highInteractRateThreshold: number;
  lowInteractRateAlert: boolean;
  lowInteractRateThreshold: number;
  suspiciousActionAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Action History
 */
export interface NotificationActionHistory extends BaseEntity, Timestamp {
  id: ID;
  actionId: ID;
  notificationId: ID;
  userId: ID;
  action: 'create' | 'update' | 'trigger' | 'view' | 'interact' | 'modify' | 'social' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Action Validation
 */
export interface NotificationActionValidation {
  isValid: boolean;
  actionId: ID;
  notificationId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Action Export
 */
export interface NotificationActionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: NotificationActionFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Notification Action Trigger
 */
export interface NotificationActionTrigger extends BaseEntity, Timestamp {
  id: ID;
  actionId: ID;
  notificationId: ID;
  userId: ID;
  triggeredAt: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: {
    type: string;
    name?: string;
    os?: string;
    browser?: string;
  };
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Notification Action
  NOTIFICATION_ACTION,
  NotificationActionType,
  NotificationActionCategory,
  NotificationActionStatus,
  NotificationActionIcon,
  NotificationActionColor,
  NotificationActionDefault,
  notificationActionGetActionLabel,
  notificationGetActionCategory,
  notificationGetActionIcon,
  notificationGetActionColor,
  notificationIsViewAction,
  notificationIsInteractAction,
  notificationIsModifyAction,
  notificationActionIsSocialAction,
  notificationGetDefaultAction,
};
