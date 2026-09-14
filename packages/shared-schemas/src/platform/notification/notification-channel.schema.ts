/**
 * Notification Channel Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-channel.constants থেকে।
 */

import { z } from 'zod';
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/platform';

export const NotificationChannelSchema = z.enum(
  Object.values(NOTIFICATION_CHANNEL) as [string, ...string[]]
);

export type NotificationChannelSchemaType = z.infer<typeof NotificationChannelSchema>;
