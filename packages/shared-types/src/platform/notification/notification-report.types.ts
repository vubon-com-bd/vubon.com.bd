/**
 * Notification Report Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_REPORT_TYPE,
  NOTIFICATION_REPORT_FORMAT,
  NOTIFICATION_REPORT_SCHEDULE,
} from '@vubon/shared-constants/platform';

export type NotificationReportTypeValue =
  (typeof NOTIFICATION_REPORT_TYPE)[keyof typeof NOTIFICATION_REPORT_TYPE];

export type NotificationReportFormatValue =
  (typeof NOTIFICATION_REPORT_FORMAT)[keyof typeof NOTIFICATION_REPORT_FORMAT];

export type NotificationReportScheduleValue =
  (typeof NOTIFICATION_REPORT_SCHEDULE)[keyof typeof NOTIFICATION_REPORT_SCHEDULE];

export interface NotificationReport {
  readonly id: string;
  readonly type: NotificationReportTypeValue;
  readonly format: NotificationReportFormatValue;
  readonly schedule?: NotificationReportScheduleValue;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly fileUrl?: string;
  readonly fileSize?: number;
  readonly generatedAt: string;
  readonly expiresAt?: string;
  readonly generatedBy?: string;
}

export interface NotificationReportRequest {
  readonly type: NotificationReportTypeValue;
  readonly format: NotificationReportFormatValue;
  readonly periodStart: string;
  readonly periodEnd: string;
}
