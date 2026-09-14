/**
 * Notification Preference Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-preference.constants থেকে।
 */

import { z } from 'zod';
import {
  NOTIFICATION_PREFERENCE_TYPE,
  NOTIFICATION_PREFERENCE_FREQUENCY,
} from '@vubon/shared-constants/platform';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const NotificationPreferenceTypeSchema = z.enum(
  Object.values(NOTIFICATION_PREFERENCE_TYPE) as [string, ...string[]]
);

export const NotificationPreferenceFrequencySchema = z.enum(
  Object.values(NOTIFICATION_PREFERENCE_FREQUENCY) as [string, ...string[]]
);

export const NotificationPreferenceSchema = z.object({
  userId: UuidSchema,
  type: NotificationPreferenceTypeSchema,
  email: z.boolean(),
  sms: z.boolean(),
  push: z.boolean(),
  inApp: z.boolean(),
  webhook: z.boolean(),
  whatsapp: z.boolean(),
  frequency: NotificationPreferenceFrequencySchema,
  quietHoursEnabled: z.boolean(),
  quietHoursStart: z.number().int().min(0).max(23).optional(),
  quietHoursEnd: z.number().int().min(0).max(23).optional(),
  timezone: z.string().min(1).max(64),
  locale: z.string().min(2).max(10),
  updatedAt: z.string().datetime(),
});

export type NotificationPreferenceTypeSchemaType = z.infer<typeof NotificationPreferenceTypeSchema>;
export type NotificationPreferenceFrequencySchemaType = z.infer<
  typeof NotificationPreferenceFrequencySchema
>;
export type NotificationPreferenceSchemaType = z.infer<typeof NotificationPreferenceSchema>;
