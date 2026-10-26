/**
 * Resend Notification Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { NotificationChannelSchema } from './notification-channel.schema.js';

export const ResendNotificationRequestSchema = z
  .object({
    notificationId: UuidSchema,
    channels: z.array(NotificationChannelSchema).min(1).max(5).optional(),
    forceResend: z.boolean().optional(),
    reason: z.string().trim().max(500).optional(),
  })
  .strict();

export type ResendNotificationRequestSchemaType = z.infer<
  typeof ResendNotificationRequestSchema
>;
