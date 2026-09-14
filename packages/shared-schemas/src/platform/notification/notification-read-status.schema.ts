/**
 * Notification Read Status Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-read-status.constants থেকে।
 */

import { z } from 'zod';
import { NOTIFICATION_READ_STATUS } from '@vubon/shared-constants/platform';

export const NotificationReadStatusSchema = z.enum(
  Object.values(NOTIFICATION_READ_STATUS) as [string, ...string[]]
);

export const NotificationReadMetadataSchema = z.object({
  status: NotificationReadStatusSchema,
  readAt: z.string().datetime().optional(),
  archivedAt: z.string().datetime().optional(),
  snoozedUntil: z.string().datetime().optional(),
});

export type NotificationReadStatusSchemaType = z.infer<typeof NotificationReadStatusSchema>;
export type NotificationReadMetadataSchemaType = z.infer<typeof NotificationReadMetadataSchema>;
