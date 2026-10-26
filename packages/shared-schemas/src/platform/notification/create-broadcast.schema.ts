/**
 * Create Broadcast Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import {
  NotificationBroadcastTypeSchema,
  NotificationBroadcastTargetSchema,
} from './notification-broadcast.schema.js';
import { NotificationChannelSchema } from './notification-channel.schema.js';

export const CreateNotificationBroadcastRequestSchema = z
  .object({
    name: z.string().trim().min(1).max(150),
    type: NotificationBroadcastTypeSchema,
    target: NotificationBroadcastTargetSchema,
    channels: z.array(NotificationChannelSchema).min(1).max(5),
    templateId: UuidSchema.optional(),
    content: z.string().trim().max(500000).optional(),
    recipientIds: z.array(UuidSchema).max(1000000).optional(),
    segmentId: z.string().max(100).optional(),
    scheduledAt: z.string().datetime().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    createdBy: UuidSchema.optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict()
  .refine(
    (d) => Boolean(d.templateId) !== Boolean(d.content),
    { message: 'Exactly one of templateId or content is required' },
  );

export type CreateNotificationBroadcastRequestSchemaType = z.infer<
  typeof CreateNotificationBroadcastRequestSchema
>;
