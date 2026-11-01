/**
 * Schedule Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationScheduleTypeValue,
  NotificationScheduleRecurrenceValue,
  NotificationScheduleStatusValue,
} from '@vubon/shared-types/platform';

export interface ScheduleResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly type: NotificationScheduleTypeValue;
  readonly recurrence: NotificationScheduleRecurrenceValue;
  readonly status: NotificationScheduleStatusValue;
  readonly scheduledAt?: string;
  readonly timezone: string;
  readonly cronExpression?: string;
  readonly templateId?: string;
  readonly recipientCount: number;
  readonly nextRunAt?: string;
  readonly lastRunAt?: string;
  readonly runCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ScheduleSummaryResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly status: NotificationScheduleStatusValue;
  readonly nextRunAt?: string;
  readonly runCount: number;
  readonly createdAt: string;
}

export interface ScheduleListResponseDTO {
  readonly items: readonly ScheduleSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
