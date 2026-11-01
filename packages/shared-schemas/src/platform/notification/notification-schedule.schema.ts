/**
 * Notification Schedule Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-schedule.constants থেকে।
 */

import { z } from 'zod';
import {
  NOTIFICATION_SCHEDULE_TYPE,
  NOTIFICATION_SCHEDULE_RECURRENCE,
  NOTIFICATION_SCHEDULE_STATUS,
} from '@vubon/shared-constants/platform';

export const NotificationScheduleTypeSchema = z.enum(
  Object.values(NOTIFICATION_SCHEDULE_TYPE) as [string, ...string[]]
);

export const NotificationScheduleRecurrenceSchema = z.enum(
  Object.values(NOTIFICATION_SCHEDULE_RECURRENCE) as [string, ...string[]]
);

export const NotificationScheduleStatusSchema = z.enum(
  Object.values(NOTIFICATION_SCHEDULE_STATUS) as [string, ...string[]]
);

export const NotificationScheduleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(150),
  type: NotificationScheduleTypeSchema,
  recurrence: NotificationScheduleRecurrenceSchema,
  status: NotificationScheduleStatusSchema,
  scheduledAt: z.string().datetime().optional(),
  timezone: z.string().min(1).max(64),
  cronExpression: z.string().max(100).optional(),
  templateId: z.string().max(100).optional(),
  recipientIds: z.array(z.string()).max(1000000).optional(),
  segmentId: z.string().max(100).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  nextRunAt: z.string().datetime().optional(),
  lastRunAt: z.string().datetime().optional(),
  runCount: z.number().int().nonnegative(),
  createdBy: z.string().min(1),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const NotificationScheduleCreateInputSchema = z
  .object({
    name: z.string().trim().min(1).max(150),
    type: NotificationScheduleTypeSchema,
    recurrence: NotificationScheduleRecurrenceSchema,
    scheduledAt: z.string().datetime().optional(),
    timezone: z.string().min(1).max(64),
    cronExpression: z.string().max(100).optional(),
    templateId: z.string().max(100).optional(),
    recipientIds: z.array(z.string()).max(1000000).optional(),
  })
  .strict();

export type NotificationScheduleTypeSchemaType = z.infer<typeof NotificationScheduleTypeSchema>;
export type NotificationScheduleRecurrenceSchemaType = z.infer<
  typeof NotificationScheduleRecurrenceSchema
>;
export type NotificationScheduleStatusSchemaType = z.infer<typeof NotificationScheduleStatusSchema>;
export type NotificationScheduleSchemaType = z.infer<typeof NotificationScheduleSchema>;
