/**
 * Abandoned Cart Types
 * Type definitions for abandoned carts based on shared-constants
 * @module AbandonedCartTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants cart
// ============================================================
import {
  // Abandoned Cart
  ABANDONED_CART,
  AbandonedCartStatus,
  AbandonedCartReminderType,
  AbandonedCartRecoveryChannel,
  AbandonedCartRecoveryStatus,
  AbandonedCartReason,
  AbandonedCartDefault,
  AbandonedCartLimit,
  AbandonedCartError,
  abandonedcartGetStatusLabel,
  abandonedcartGetReminderTypeLabel,
  abandonedcartGetRecoveryChannelLabel,
  abandonedcartGetRecoveryStatusLabel,
  abandonedcartGetReasonLabel,
  abandonedcartGetErrorLabel,
  abandonedcartIsRecovered,
  abandonedcartIsActive,
  abandonedcartGetDefaultAbandonmentThreshold,
  abandonedcartGetDefaultFirstReminder,
  abandonedcartGetDefaultMaxReminders,
} from '@vubon/shared-constants';

// ============================================================
// Abandoned Cart Extended Types
// ============================================================

/**
 * Abandoned cart
 */
export interface AbandonedCart extends BaseEntity, Timestamp {
  id: ID;
  cartId: ID;
  userId: ID;
  status: AbandonedCartStatus;
  reason: AbandonedCartReason;
  isRecovered: boolean;
  isActive: boolean;
  abandonmentThreshold: number;
  abandonedAt: Date;
  recoveredAt?: Date;
  reminders: AbandonedCartReminder[];
  metadata?: Metadata;
}

/**
 * Abandoned cart reminder
 */
export interface AbandonedCartReminder extends BaseEntity, Timestamp {
  id: ID;
  abandonedCartId: ID;
  userId: ID;
  type: AbandonedCartReminderType;
  channel: AbandonedCartRecoveryChannel;
  status: AbandonedCartRecoveryStatus;
  sentAt: Date;
  openedAt?: Date;
  clickedAt?: Date;
  convertedAt?: Date;
  message: string;
  subject?: string;
  metadata?: Metadata;
}

/**
 * Abandoned cart filter
 */
export interface AbandonedCartFilter {
  cartIds?: ID[];
  userIds?: ID[];
  statuses?: AbandonedCartStatus[];
  reasons?: AbandonedCartReason[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isRecovered?: boolean;
  isActive?: boolean;
  hasReminders?: boolean;
  minReminders?: number;
  maxReminders?: number;
  searchTerm?: string;
}

/**
 * Abandoned cart statistics
 */
export interface AbandonedCartStatistics {
  userId: ID;
  totalAbandonedCarts: number;
  recoveredCarts: number;
  activeCarts: number;
  byStatus: Record<AbandonedCartStatus, number>;
  byReason: Record<AbandonedCartReason, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  recoveryRate: number;
  averageAbandonmentTime: number;
  maxAbandonmentTime: number;
  minAbandonmentTime: number;
  averageRecoveryTime: number;
  maxRecoveryTime: number;
  minRecoveryTime: number;
  mostFrequentReason: AbandonedCartReason;
  mostFrequentStatus: AbandonedCartStatus;
  totalRemindersSent: number;
  remindersPerCart: number;
}

/**
 * Abandoned cart summary
 */
export interface AbandonedCartSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAbandoned: number;
  recovered: number;
  active: number;
  byStatus: Record<AbandonedCartStatus, number>;
  byReason: Record<AbandonedCartReason, number>;
  abandonedTrend: {
    date: Date;
    total: number;
    recovered: number;
    active: number;
  }[];
  topReasons: {
    reason: AbandonedCartReason;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AbandonedCartStatus;
    count: number;
    label: string;
  }[];
  recoveryMetrics: {
    recoveryRate: number;
    averageRecoveryTime: number;
    remindersPerRecovery: number;
  };
}

/**
 * Abandoned cart configuration
 */
export interface AbandonedCartConfiguration {
  enabled: boolean;
  abandonmentThreshold: number;
  maxReminders: number;
  reminderIntervals: number[];
  reminderTypes: AbandonedCartReminderType[];
  recoveryChannels: AbandonedCartRecoveryChannel[];
  autoRecovery: boolean;
  recoveryTimeout: number;
  notificationOnAbandon: boolean;
  notificationOnRecovery: boolean;
  notificationOnReminder: boolean;
  alertConfig?: AbandonedCartAlertConfig;
}

/**
 * Abandoned cart alert configuration
 */
export interface AbandonedCartAlertConfig {
  enabled: boolean;
  highAbandonmentRateAlert: boolean;
  highAbandonmentRateThreshold: number;
  recoveryFailureAlert: boolean;
  recoveryFailureThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Abandoned cart history
 */
export interface AbandonedCartHistory extends BaseEntity, Timestamp {
  id: ID;
  abandonedCartId: ID;
  cartId: ID;
  userId: ID;
  action:
    | 'abandon'
    | 'reminder_sent'
    | 'reminder_opened'
    | 'reminder_clicked'
    | 'recover'
    | 'expire'
    | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Abandoned cart validation
 */
export interface AbandonedCartValidation {
  isValid: boolean;
  abandonedCartId: ID;
  cartId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Abandoned cart export
 */
export interface AbandonedCartExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AbandonedCartFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Abandoned cart analytics
 */
export interface AbandonedCartAnalytics extends BaseEntity, Timestamp {
  id: ID;
  period: {
    start: Date;
    end: Date;
  };
  totalAbandoned: number;
  recoveryRate: number;
  averageAbandonmentValue: number;
  averageRecoveryValue: number;
  totalLostRevenue: number;
  totalRecoveredRevenue: number;
  byReason: {
    reason: AbandonedCartReason;
    count: number;
    percentage: number;
    lostRevenue: number;
  }[];
  byChannel: {
    channel: AbandonedCartRecoveryChannel;
    count: number;
    successRate: number;
    recoveredRevenue: number;
  }[];
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Abandoned Cart
  ABANDONED_CART,
  AbandonedCartStatus,
  AbandonedCartReminderType,
  AbandonedCartRecoveryChannel,
  AbandonedCartRecoveryStatus,
  AbandonedCartReason,
  AbandonedCartDefault,
  AbandonedCartLimit,
  AbandonedCartError,
  abandonedcartGetStatusLabel,
  abandonedcartGetReminderTypeLabel,
  abandonedcartGetRecoveryChannelLabel,
  abandonedcartGetRecoveryStatusLabel,
  abandonedcartGetReasonLabel,
  abandonedcartGetErrorLabel,
  abandonedcartIsRecovered,
  abandonedcartIsActive,
  abandonedcartGetDefaultAbandonmentThreshold,
  abandonedcartGetDefaultFirstReminder,
  abandonedcartGetDefaultMaxReminders,
};
