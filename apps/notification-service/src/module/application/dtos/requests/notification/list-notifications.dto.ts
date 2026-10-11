/**
 * List Notification Request DTOs
 * @module notification-service/application/dtos/requests/notification
 */
import type {
  NotificationTypeValue,
  NotificationCategoryValue,
  NotificationChannelValue,
  NotificationStatusValue,
  NotificationPriorityValue,
} from '@vubon/shared-types/platform/notification';

export interface NotificationListFilterDTO {
  readonly userId?: string;
  readonly type?: NotificationTypeValue;
  readonly category?: NotificationCategoryValue;
  readonly channel?: NotificationChannelValue;
  readonly status?: NotificationStatusValue;
  readonly priority?: NotificationPriorityValue;
  readonly isRead?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
  readonly referenceType?: string;
  readonly referenceId?: string;
}

export interface NotificationListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'sentAt' | 'priority';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: NotificationListFilterDTO;
}

export interface ListNotificationsByUserRequestDTO {
  readonly userId: string;
  readonly options: NotificationListOptionsDTO;
}

export interface GetNotificationRequestDTO {
  readonly notificationId: string;
}

export interface GetNotificationPublicRequestDTO {
  readonly notificationId: string;
}

export interface GetNotificationStatsRequestDTO {
  readonly userId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}
