/**
 * Schedule Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationScheduleTypeValue,
  NotificationScheduleStatusValue,
  NotificationScheduleRecurrenceValue,
} from '@vubon/shared-types/platform/notification';

export interface ScheduleResponseDTO {
  readonly id: string;
  readonly type: NotificationScheduleTypeValue;
  readonly status: NotificationScheduleStatusValue;
  readonly recurrence: NotificationScheduleRecurrenceValue;
  readonly scheduledAt: string;
  readonly timezone: string;
  readonly nextOccurrenceAt?: string;
  readonly occurrenceCount: number;
  readonly maxOccurrences?: number;
  readonly notificationTemplateId?: string;
  readonly userId?: string;
  readonly createdBy: string;
  readonly lastTriggeredAt?: string;
  readonly lastFailureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ScheduleListResponseDTO {
  readonly items: readonly ScheduleResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ScheduleTriggerResponseDTO {
  readonly scheduleId: string;
  readonly occurrence: number;
  readonly triggeredAt: string;
  readonly triggeredNotificationId?: string;
  readonly nextOccurrenceAt?: string;
}
