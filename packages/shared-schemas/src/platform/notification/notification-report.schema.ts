/**
 * Notification Report Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-report.constants থেকে।
 */

import { z } from 'zod';
import {
  NOTIFICATION_REPORT_TYPE,
  NOTIFICATION_REPORT_FORMAT,
  NOTIFICATION_REPORT_SCHEDULE,
} from '@vubon/shared-constants/platform';

export const NotificationReportTypeSchema = z.enum(
  Object.values(NOTIFICATION_REPORT_TYPE) as [string, ...string[]]
);

export const NotificationReportFormatSchema = z.enum(
  Object.values(NOTIFICATION_REPORT_FORMAT) as [string, ...string[]]
);

export const NotificationReportScheduleSchema = z.enum(
  Object.values(NOTIFICATION_REPORT_SCHEDULE) as [string, ...string[]]
);

export const NotificationReportSchema = z.object({
  id: z.string().min(1),
  type: NotificationReportTypeSchema,
  format: NotificationReportFormatSchema,
  schedule: NotificationReportScheduleSchema.optional(),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  fileUrl: z.string().url().optional(),
  fileSize: z.number().int().nonnegative().optional(),
  generatedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
  generatedBy: z.string().optional(),
});

export type NotificationReportTypeSchemaType = z.infer<typeof NotificationReportTypeSchema>;
export type NotificationReportFormatSchemaType = z.infer<typeof NotificationReportFormatSchema>;
export type NotificationReportScheduleSchemaType = z.infer<typeof NotificationReportScheduleSchema>;
export type NotificationReportSchemaType = z.infer<typeof NotificationReportSchema>;
