/**
 * Notification Read Status Value Types
 * @module shared-types/platform/notification
 */

import type { NOTIFICATION_READ_STATUS } from '@vubon/shared-constants/platform';

export type NotificationReadStatusValue =
  (typeof NOTIFICATION_READ_STATUS)[keyof typeof NOTIFICATION_READ_STATUS];

export interface NotificationReadMetadata {
  readonly status: NotificationReadStatusValue;
  readonly readAt?: string;
  readonly archivedAt?: string;
  readonly snoozedUntil?: string;
}
