/**
 * Notification Schedule Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_SCHEDULE_TYPE,
  NOTIFICATION_SCHEDULE_RECURRENCE,
  NOTIFICATION_SCHEDULE_STATUS,
} from '@vubon/shared-constants/platform';

export type NotificationScheduleTypeValue =
  (typeof NOTIFICATION_SCHEDULE_TYPE)[keyof typeof NOTIFICATION_SCHEDULE_TYPE];

export type NotificationScheduleRecurrenceValue =
  (typeof NOTIFICATION_SCHEDULE_RECURRENCE)[keyof typeof NOTIFICATION_SCHEDULE_RECURRENCE];

export type NotificationScheduleStatusValue =
  (typeof NOTIFICATION_SCHEDULE_STATUS)[keyof typeof NOTIFICATION_SCHEDULE_STATUS];

export interface NotificationSchedule {
  readonly id: string;
  readonly name: string;
  readonly type: NotificationScheduleTypeValue;
  readonly recurrence: NotificationScheduleRecurrenceValue;
  readonly status: NotificationScheduleStatusValue;
  readonly scheduledAt?: string;
  readonly timezone: string;
  readonly cronExpression?: string;
  readonly templateId?: string;
  readonly recipientIds?: readonly string[];
  readonly segmentId?: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly nextRunAt?: string;
  readonly lastRunAt?: string;
  readonly runCount: number;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface NotificationScheduleCreateInput {
  readonly name: string;
  readonly type: NotificationScheduleTypeValue;
  readonly recurrence: NotificationScheduleRecurrenceValue;
  readonly scheduledAt?: string;
  readonly timezone: string;
  readonly cronExpression?: string;
  readonly templateId?: string;
  readonly recipientIds?: readonly string[];
}
