/**
 * Send Notification via Template Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { EmailSchema } from '../../common/primitives/email.schema.js';
import { PhoneSchema } from '../../common/primitives/phone.schema.js';
import { NotificationChannelSchema } from './notification-channel.schema.js';

export const SendNotificationTemplateRequestSchema = z
  .object({
    templateId: UuidSchema,
    channel: NotificationChannelSchema,
    userId: UuidSchema,
    email: EmailSchema.optional(),
    phone: PhoneSchema.optional(),
    deviceToken: z.string().min(1).max(500).optional(),
    webhookUrl: z.string().url().optional(),
    variables: z.record(z.string(), z.unknown()),
    locale: z.string().min(2).max(10).optional(),
    scheduledAt: z.string().datetime().optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type SendNotificationTemplateRequestSchemaType = z.infer<
  typeof SendNotificationTemplateRequestSchema
>;
