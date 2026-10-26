/**
 * Create Digest Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import {
  NotificationDigestFrequencySchema,
  NotificationDigestTypeSchema,
} from './notification-digest.schema.js';

export const CreateNotificationDigestRequestSchema = z
  .object({
    userId: UuidSchema,
    frequency: NotificationDigestFrequencySchema,
    type: NotificationDigestTypeSchema,
    categories: z.array(z.string().min(1).max(50)).min(1).max(50),
    sendHour: z.number().int().min(0).max(23),
    timezone: z.string().min(1).max(64),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type CreateNotificationDigestRequestSchemaType = z.infer<
  typeof CreateNotificationDigestRequestSchema
>;
