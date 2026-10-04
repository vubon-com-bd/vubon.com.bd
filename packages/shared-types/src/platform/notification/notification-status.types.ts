/**
 * Notification Status Value Types
 * @module shared-types/platform/notification
 */

import type { NOTIFICATION_STATUS } from '@vubon/shared-constants/platform';

export type NotificationStatusValue =
  (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS];

export interface NotificationStatusMetadata {
  readonly value: NotificationStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
  readonly isSuccess: boolean;
}
