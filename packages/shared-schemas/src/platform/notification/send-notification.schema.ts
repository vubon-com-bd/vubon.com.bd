/**
 * Send Notification Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { EmailSchema } from '../../common/primitives/email.schema.js';
import { PhoneSchema } from '../../common/primitives/phone.schema.js';
import { UrlSchema } from '../../common/primitives/url.schema.js';
import { NotificationTypeSchema } from './notification-type.schema.js';
import { NotificationChannelSchema } from './notification-channel.schema.js';
import { NotificationPrioritySchema } from './notification-priority.schema.js';
import { NotificationCategorySchema } from './notification-category.schema.js';
import { NotificationActionSchema } from './notification-action.schema.js';

// ─── Recipient ───────────────────────────
export const NotificationRecipientInputSchema = z
  .object({
    userId: UuidSchema,
    email: EmailSchema.optional(),
    phone: PhoneSchema.optional(),
    deviceToken: z.string().min(1).max(500).optional(),
    webhookUrl: UrlSchema.optional(),
  })
  .strict();

// ─── Main request ────────────────────────
export const SendNotificationRequestSchema = z
  .object({
    userId: UuidSchema,
    type: NotificationTypeSchema,
    category: NotificationCategorySchema,
    channels: z.array(NotificationChannelSchema).min(1).max(5),
    priority: NotificationPrioritySchema.optional(),
    subject: z.string().trim().min(1).max(200),
    body: z.string().trim().min(1).max(50000),
    html: z.string().max(500000).optional(),
    imageUrl: UrlSchema.optional(),
    iconUrl: UrlSchema.optional(),
    actionUrl: UrlSchema.optional(),
    actions: z.array(NotificationActionSchema).max(5).optional(),
    data: z.record(z.string(), z.unknown()).optional(),
    scheduledAt: z.string().datetime().optional(),
    expiresAt: z.string().datetime().optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),

    // ─── Recipient hints (optional) ────
    // If provided → used directly (dev/test, memory mode)
    // If absent → resolved via identity-service (production)
    email: EmailSchema.optional(),
    phone: PhoneSchema.optional(),
    deviceToken: z.string().min(1).max(500).optional(),
    webhookUrl: UrlSchema.optional(),
  })
  .strict()
  .refine(
    (data) => !data.expiresAt || new Date(data.expiresAt) > new Date(),
    { message: 'expiresAt must be in the future', path: ['expiresAt'] },
  );

export type SendNotificationRequestSchemaType = z.infer<typeof SendNotificationRequestSchema>;
export type NotificationRecipientInputSchemaType = z.infer<
  typeof NotificationRecipientInputSchema
>;
