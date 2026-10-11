/**
 * Update / Delete Notification Request DTOs
 * @module notification-service/application/dtos/requests/notification
 */
import type { NotificationPriorityValue } from '@vubon/shared-types/platform/notification';

export interface UpdateNotificationRequestDTO {
  readonly notificationId: string;
  readonly title?: string;
  readonly body?: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly priority?: NotificationPriorityValue;
  readonly scheduledAt?: string;
  readonly expiresAt?: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface CancelNotificationRequestDTO {
  readonly notificationId: string;
  readonly reason?: string;
}

export interface DeleteNotificationRequestDTO {
  readonly notificationId: string;
  readonly softDelete?: boolean;
}

export interface RetryNotificationRequestDTO {
  readonly notificationId: string;
  readonly force?: boolean;
}
