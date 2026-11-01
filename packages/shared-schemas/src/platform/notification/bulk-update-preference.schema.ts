/**
 * Bulk Update Notification Preferences Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { NotificationPreferenceFrequencySchema } from './notification-preference.schema.js';

export const BulkUpdateNotificationPreferenceRequestSchema = z
  .object({
    userIds: z.array(UuidSchema).min(1).max(10000),
    updates: z
      .object({
        email: z.boolean().optional(),
        sms: z.boolean().optional(),
        push: z.boolean().optional(),
        inApp: z.boolean().optional(),
        webhook: z.boolean().optional(),
        whatsapp: z.boolean().optional(),
        frequency: NotificationPreferenceFrequencySchema.optional(),
        quietHoursEnabled: z.boolean().optional(),
        quietHoursStart: z.number().int().min(0).max(23).optional(),
        quietHoursEnd: z.number().int().min(0).max(23).optional(),
      })
      .strict(),
    reason: z.string().trim().max(500).optional(),
    actorId: UuidSchema.optional(),
  })
  .strict();

export type BulkUpdateNotificationPreferenceRequestSchemaType = z.infer<
  typeof BulkUpdateNotificationPreferenceRequestSchema
>;
