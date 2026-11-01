/**
 * Notification Action Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_ACTION,
  NOTIFICATION_ACTION_TYPE,
} from '@vubon/shared-constants/platform';

export type NotificationActionValue =
  (typeof NOTIFICATION_ACTION)[keyof typeof NOTIFICATION_ACTION];

export type NotificationActionTypeValue =
  (typeof NOTIFICATION_ACTION_TYPE)[keyof typeof NOTIFICATION_ACTION_TYPE];

export interface NotificationAction {
  readonly action: NotificationActionValue;
  readonly type: NotificationActionTypeValue;
  readonly label: string;
  readonly url?: string;
  readonly payload?: Readonly<Record<string, unknown>>;
}

export interface NotificationActionEvent {
  readonly notificationId: string;
  readonly action: NotificationActionValue;
  readonly userId?: string;
  readonly occurredAt: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}
