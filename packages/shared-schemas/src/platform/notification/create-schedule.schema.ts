/**
 * Create Notification Schedule Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import {
  NotificationScheduleTypeSchema,
  NotificationScheduleRecurrenceSchema,
} from './notification-schedule.schema.js';

export const CreateNotificationScheduleRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(150),
    type: NotificationScheduleTypeSchema,
    recurrence: NotificationScheduleRecurrenceSchema,
    scheduledAt: z.string().datetime().optional(),
    timezone: z.string().min(1).max(64),
    cronExpression: z.string().max(100).optional(),
    templateId: UuidSchema.optional(),
    recipientIds: z.array(UuidSchema).min(1).max(1000000).optional(),
    segmentId: z.string().max(100).optional(),
    data: z.record(z.string(), z.unknown()).optional(),
    createdBy: UuidSchema.optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict()
  .refine(
    (d) => Boolean(d.templateId || d.data),
    { message: 'Either templateId or inline data is required', path: ['templateId'] },
  )
  .refine(
    (d) => Boolean(d.recipientIds || d.segmentId),
    { message: 'Either recipientIds or segmentId is required', path: ['recipientIds'] },
  );

export type CreateNotificationScheduleRequestSchemaType = z.infer<
  typeof CreateNotificationScheduleRequestSchema
>;
