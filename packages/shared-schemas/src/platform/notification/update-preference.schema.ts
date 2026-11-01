/**
 * Update Notification Preference Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { NotificationPreferenceFrequencySchema } from './notification-preference.schema.js';

export const UpdateNotificationPreferenceRequestSchema = z
  .object({
    userId: UuidSchema,
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
    timezone: z.string().min(1).max(64).optional(),
    locale: z.string().min(2).max(10).optional(),
  })
  .strict()
  .refine((d) => Object.keys(d).length > 1, {
    message: 'At least one field to update is required',
  })
  .refine(
    (d) =>
      d.quietHoursEnabled !== true ||
      (d.quietHoursStart !== undefined && d.quietHoursEnd !== undefined),
    { message: 'quietHoursEnabled requires start and end', path: ['quietHoursStart'] },
  );

export type UpdateNotificationPreferenceRequestSchemaType = z.infer<
  typeof UpdateNotificationPreferenceRequestSchema
>;
