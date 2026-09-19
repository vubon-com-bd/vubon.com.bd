/**
 * Notification Priority Value Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_PRIORITY,
  NOTIFICATION_PRIORITY_WEIGHT,
  NOTIFICATION_PRIORITY_TTL,
} from '@vubon/shared-constants/platform';

export type NotificationPriorityValue =
  (typeof NOTIFICATION_PRIORITY)[keyof typeof NOTIFICATION_PRIORITY];

export type NotificationPriorityWeight = typeof NOTIFICATION_PRIORITY_WEIGHT;
export type NotificationPriorityTtl = typeof NOTIFICATION_PRIORITY_TTL;

export interface NotificationPriorityMetadata {
  readonly value: NotificationPriorityValue;
  readonly weight: number;
  readonly ttl: number;
  readonly isUrgent: boolean;
}
