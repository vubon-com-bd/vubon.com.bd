/**
 * Notification Broadcast Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_BROADCAST_TYPE,
  NOTIFICATION_BROADCAST_STATUS,
  NOTIFICATION_BROADCAST_TARGET,
} from '@vubon/shared-constants/platform';

export type NotificationBroadcastTypeValue =
  (typeof NOTIFICATION_BROADCAST_TYPE)[keyof typeof NOTIFICATION_BROADCAST_TYPE];

export type NotificationBroadcastStatusValue =
  (typeof NOTIFICATION_BROADCAST_STATUS)[keyof typeof NOTIFICATION_BROADCAST_STATUS];

export type NotificationBroadcastTargetValue =
  (typeof NOTIFICATION_BROADCAST_TARGET)[keyof typeof NOTIFICATION_BROADCAST_TARGET];

export interface NotificationBroadcast {
  readonly id: string;
  readonly name: string;
  readonly type: NotificationBroadcastTypeValue;
  readonly target: NotificationBroadcastTargetValue;
  readonly status: NotificationBroadcastStatusValue;
  readonly channels: readonly string[];
  readonly templateId?: string;
  readonly content?: string;
  readonly recipientCount: number;
  readonly sentCount: number;
  readonly failedCount: number;
  readonly scheduledAt?: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly createdBy: string;
  readonly approvedBy?: string;
  readonly createdAt: string;
}

export interface BroadcastCreateInput {
  readonly name: string;
  readonly type: NotificationBroadcastTypeValue;
  readonly target: NotificationBroadcastTargetValue;
  readonly channels: readonly string[];
  readonly templateId?: string;
  readonly content?: string;
  readonly scheduledAt?: string;
}

export interface BroadcastStats {
  readonly broadcastId: string;
  readonly recipientCount: number;
  readonly sentCount: number;
  readonly deliveredCount: number;
  readonly failedCount: number;
  readonly openRate?: number;
  readonly clickRate?: number;
}
