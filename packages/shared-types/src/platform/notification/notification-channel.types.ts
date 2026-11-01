/**
 * Notification Channel Value Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CHANNEL_PRIORITY,
} from '@vubon/shared-constants/platform';

export type NotificationChannelValue =
  (typeof NOTIFICATION_CHANNEL)[keyof typeof NOTIFICATION_CHANNEL];

export type NotificationChannelPriority = typeof NOTIFICATION_CHANNEL_PRIORITY;

export interface NotificationChannelMetadata {
  readonly value: NotificationChannelValue;
  readonly label: string;
  readonly priority: number;
  readonly isInstant: boolean;
}
