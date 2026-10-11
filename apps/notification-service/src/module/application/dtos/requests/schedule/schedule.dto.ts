/**
 * Schedule Request DTOs
 * @module notification-service/application/dtos/requests/schedule
 */
import type {
  NotificationScheduleTypeValue,
  NotificationScheduleRecurrenceValue,
} from '@vubon/shared-types/platform/notification';

export interface CreateScheduleRequestDTO {
  readonly type: NotificationScheduleTypeValue;
  readonly recurrence: NotificationScheduleRecurrenceValue;
  readonly scheduledAt: string;
  readonly timezone: string;
  readonly notificationTemplateId?: string;
  readonly userId?: string;
  readonly maxOccurrences?: number;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface UpdateScheduleRequestDTO {
  readonly scheduleId: string;
  readonly scheduledAt?: string;
  readonly recurrence?: NotificationScheduleRecurrenceValue;
  readonly timezone?: string;
  readonly maxOccurrences?: number;
}

export interface GetScheduleRequestDTO {
  readonly scheduleId: string;
}

export interface ListSchedulesRequestDTO {
  readonly filter?: {
    readonly userId?: string;
    readonly type?: string;
    readonly status?: string;
    readonly templateId?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
  };
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'scheduledAt' | 'nextOccurrenceAt';
  readonly sortDir?: 'asc' | 'desc';
}

export interface TriggerScheduleRequestDTO {
  readonly scheduleId: string;
  readonly triggeredNotificationId?: string;
}

export interface PauseScheduleRequestDTO {
  readonly scheduleId: string;
  readonly reason?: string;
}

export interface ResumeScheduleRequestDTO {
  readonly scheduleId: string;
}

export interface CancelScheduleRequestDTO {
  readonly scheduleId: string;
  readonly reason?: string;
}
