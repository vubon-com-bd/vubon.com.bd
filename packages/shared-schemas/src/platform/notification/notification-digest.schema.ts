/**
 * Notification Digest Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-digest.constants থেকে।
 */

import { z } from 'zod';
import {
  NOTIFICATION_DIGEST_FREQUENCY,
  NOTIFICATION_DIGEST_TYPE,
  NOTIFICATION_DIGEST_STATUS,
} from '@vubon/shared-constants/platform';

export const NotificationDigestFrequencySchema = z.enum(
  Object.values(NOTIFICATION_DIGEST_FREQUENCY) as [string, ...string[]]
);

export const NotificationDigestTypeSchema = z.enum(
  Object.values(NOTIFICATION_DIGEST_TYPE) as [string, ...string[]]
);

export const NotificationDigestStatusSchema = z.enum(
  Object.values(NOTIFICATION_DIGEST_STATUS) as [string, ...string[]]
);

export const NotificationDigestSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  frequency: NotificationDigestFrequencySchema,
  type: NotificationDigestTypeSchema,
  status: NotificationDigestStatusSchema,
  categories: z.array(z.string()).max(50),
  sendHour: z.number().int().min(0).max(23),
  timezone: z.string().min(1).max(64),
  itemCount: z.number().int().nonnegative(),
  generatedAt: z.string().datetime().optional(),
  sentAt: z.string().datetime().optional(),
  lastDeliveredAt: z.string().datetime().optional(),
});

export type NotificationDigestFrequencySchemaType = z.infer<
  typeof NotificationDigestFrequencySchema
>;
export type NotificationDigestTypeSchemaType = z.infer<typeof NotificationDigestTypeSchema>;
export type NotificationDigestStatusSchemaType = z.infer<typeof NotificationDigestStatusSchema>;
export type NotificationDigestSchemaType = z.infer<typeof NotificationDigestSchema>;
