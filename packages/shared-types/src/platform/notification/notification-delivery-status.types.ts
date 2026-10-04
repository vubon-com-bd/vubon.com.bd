/**
 * Notification Delivery Status Value Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_DELIVERY_STATUS,
  NOTIFICATION_DELIVERY_FAILURE_REASON,
} from '@vubon/shared-constants/platform';

export type NotificationDeliveryStatusValue =
  (typeof NOTIFICATION_DELIVERY_STATUS)[keyof typeof NOTIFICATION_DELIVERY_STATUS];

export type NotificationDeliveryFailureReasonValue =
  (typeof NOTIFICATION_DELIVERY_FAILURE_REASON)[keyof typeof NOTIFICATION_DELIVERY_FAILURE_REASON];

export interface NotificationDeliveryMetadata {
  readonly status: NotificationDeliveryStatusValue;
  readonly failureReason?: NotificationDeliveryFailureReasonValue;
  readonly attemptCount: number;
  readonly deliveredAt?: string;
}
