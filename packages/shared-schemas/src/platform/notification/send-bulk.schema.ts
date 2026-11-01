/**
 * Send Bulk Notifications Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { NotificationTypeSchema } from './notification-type.schema.js';
import { NotificationChannelSchema } from './notification-channel.schema.js';
import { NotificationPrioritySchema } from './notification-priority.schema.js';
import { NotificationCategorySchema } from './notification-category.schema.js';

export const SendBulkNotificationRequestSchema = z
  .object({
    userIds: z.array(UuidSchema).min(1).max(10000),
    type: NotificationTypeSchema,
    category: NotificationCategorySchema,
    channels: z.array(NotificationChannelSchema).min(1).max(5),
    priority: NotificationPrioritySchema.optional(),
    subject: z.string().trim().min(1).max(200),
    body: z.string().trim().min(1).max(50000),
    data: z.record(z.string(), z.unknown()).optional(),
    scheduledAt: z.string().datetime().optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type SendBulkNotificationRequestSchemaType = z.infer<
  typeof SendBulkNotificationRequestSchema
>;
