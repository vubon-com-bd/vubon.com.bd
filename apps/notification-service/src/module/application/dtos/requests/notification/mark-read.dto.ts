/**
 * Mark Read Request DTOs
 * @module notification-service/application/dtos/requests/notification
 */

export interface MarkNotificationReadRequestDTO {
  readonly notificationId: string;
  readonly userId: string;
}

export interface MarkNotificationsReadRequestDTO {
  readonly notificationIds: readonly string[];
  readonly userId: string;
}

export interface MarkAllReadRequestDTO {
  readonly userId: string;
  readonly filter?: {
    readonly type?: string;
    readonly category?: string;
    readonly channel?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
  };
}

export interface ArchiveNotificationRequestDTO {
  readonly notificationId: string;
  readonly userId: string;
}

export interface SnoozeNotificationRequestDTO {
  readonly notificationId: string;
  readonly userId: string;
  readonly snoozedUntil: string;
}

export interface StarNotificationRequestDTO {
  readonly notificationId: string;
  readonly userId: string;
}
