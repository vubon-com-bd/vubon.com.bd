/**
 * Update Notification Schedule Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import {
  NotificationScheduleTypeSchema,
  NotificationScheduleRecurrenceSchema,
} from './notification-schedule.schema.js';

export const UpdateNotificationScheduleRequestSchema = z
  .object({
    scheduleId: UuidSchema,
    name: z.string().trim().min(1).max(150).optional(),
    type: NotificationScheduleTypeSchema.optional(),
    recurrence: NotificationScheduleRecurrenceSchema.optional(),
    scheduledAt: z.string().datetime().optional(),
    timezone: z.string().min(1).max(64).optional(),
    cronExpression: z.string().max(100).optional(),
    templateId: UuidSchema.optional(),
    recipientIds: z.array(UuidSchema).min(1).max(1000000).optional(),
    segmentId: z.string().max(100).optional(),
    data: z.record(z.string(), z.unknown()).optional(),
    updatedBy: UuidSchema.optional(),
  })
  .strict()
  .refine((d) => Object.keys(d).length > 1, {
    message: 'At least one field to update is required',
  });

export type UpdateNotificationScheduleRequestSchemaType = z.infer<
  typeof UpdateNotificationScheduleRequestSchema
>;
