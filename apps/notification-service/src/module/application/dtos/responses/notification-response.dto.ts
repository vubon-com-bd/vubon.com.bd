/**
 * Notification Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationTypeValue,
  NotificationCategoryValue,
  NotificationChannelValue,
  NotificationStatusValue,
  NotificationPriorityValue,
  NotificationDeliveryStatusValue,
  NotificationReadStatusValue,
} from '@vubon/shared-types/platform/notification';

export interface NotificationActionDTO {
  readonly action: string;
  readonly type: string;
  readonly label: string;
  readonly url?: string;
  readonly payload?: Readonly<Record<string, unknown>>;
}

export interface NotificationRecipientDTO {
  readonly userId: string;
  readonly email?: string;
  readonly phone?: string;
  readonly deviceToken?: string;
}

export interface NotificationDeliveryDTO {
  readonly status: NotificationDeliveryStatusValue;
  readonly attemptCount: number;
  readonly provider?: string;
  readonly providerMessageId?: string;
  readonly failureReason?: string;
  readonly deliveredAt?: string;
  readonly sentAt?: string;
}

export interface NotificationReadDTO {
  readonly status: NotificationReadStatusValue;
  readonly readAt?: string;
  readonly archivedAt?: string;
  readonly snoozedUntil?: string;
}

export interface NotificationResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: NotificationTypeValue;
  readonly category: NotificationCategoryValue;
  readonly channel: NotificationChannelValue;
  readonly status: NotificationStatusValue;
  readonly priority: NotificationPriorityValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actions?: readonly NotificationActionDTO[];
  readonly data?: Readonly<Record<string, unknown>>;
  readonly delivery?: NotificationDeliveryDTO;
  readonly read?: NotificationReadDTO;
  readonly reference?: {
    readonly type: string;
    readonly id: string;
    readonly url?: string;
  };
  readonly scheduledAt?: string;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly readAt?: string;
  readonly expiresAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface NotificationPublicResponseDTO {
  readonly id: string;
  readonly type: NotificationTypeValue;
  readonly category: NotificationCategoryValue;
  readonly channel: NotificationChannelValue;
  readonly priority: NotificationPriorityValue;
  readonly status: NotificationStatusValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly actions?: readonly NotificationActionDTO[];
  readonly read?: NotificationReadDTO;
  readonly createdAt: string;
}

export interface NotificationSummaryResponseDTO {
  readonly id: string;
  readonly title: string;
  readonly type: NotificationTypeValue;
  readonly channel: NotificationChannelValue;
  readonly status: NotificationStatusValue;
  readonly isRead: boolean;
  readonly createdAt: string;
}

export interface NotificationListResponseDTO {
  readonly items: readonly NotificationSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly unreadCount: number;
}

export interface NotificationSendResponseDTO {
  readonly success: boolean;
  readonly notificationId: string;
  readonly status: NotificationStatusValue;
  readonly channel: NotificationChannelValue;
  readonly provider?: string;
  readonly providerMessageId?: string;
  readonly scheduledAt?: string;
  readonly error?: string;
}

export interface NotificationDetailResponseDTO {
  readonly notification: NotificationResponseDTO;
  readonly attempts: readonly {
    readonly attempt: number;
    readonly provider: string;
    readonly startedAt: string;
    readonly completedAt?: string;
    readonly durationMs?: number;
    readonly success: boolean;
    readonly error?: string;
  }[];
}

export interface NotificationStatsResponseDTO {
  readonly total: number;
  readonly unread: number;
  readonly delivered: number;
  readonly failed: number;
  readonly byChannel: Readonly<Record<string, number>>;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byCategory: Readonly<Record<string, number>>;
}

export interface NotificationUnreadCountResponseDTO {
  readonly userId: string;
  readonly unreadCount: number;
}
