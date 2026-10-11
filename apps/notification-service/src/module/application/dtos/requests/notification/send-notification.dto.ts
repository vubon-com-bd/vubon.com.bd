/**
 * Send Notification Request DTOs
 * @module notification-service/application/dtos/requests/notification
 */
import type {
  NotificationTypeValue,
  NotificationCategoryValue,
  NotificationChannelValue,
  NotificationPriorityValue,
} from '@vubon/shared-types/platform/notification';

export interface NotificationActionInputDTO {
  readonly action: string;
  readonly type: string;
  readonly label: string;
  readonly url?: string;
  readonly payload?: Readonly<Record<string, unknown>>;
}

export interface SendNotificationRequestDTO {
  readonly userId: string;
  readonly type: NotificationTypeValue;
  readonly category: NotificationCategoryValue;
  readonly channels: readonly NotificationChannelValue[];
  readonly priority?: NotificationPriorityValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actions?: readonly NotificationActionInputDTO[];
  readonly data?: Readonly<Record<string, unknown>>;
  readonly scheduledAt?: string;
  readonly expiresAt?: string;
  readonly reference?: {
    readonly type: string;
    readonly id: string;
    readonly url?: string;
  };
}

export interface SendNotificationToManyRequestDTO {
  readonly userIds: readonly string[];
  readonly type: NotificationTypeValue;
  readonly category: NotificationCategoryValue;
  readonly channels: readonly NotificationChannelValue[];
  readonly priority?: NotificationPriorityValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actions?: readonly NotificationActionInputDTO[];
  readonly data?: Readonly<Record<string, unknown>>;
  readonly scheduledAt?: string;
}

export interface ScheduleNotificationRequestDTO extends SendNotificationRequestDTO {
  readonly scheduledAt: string;
}
