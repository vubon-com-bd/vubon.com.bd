/**
 * Notification Status Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-status.constants থেকে।
 */

import { z } from 'zod';
import { NOTIFICATION_STATUS } from '@vubon/shared-constants/platform';

export const NotificationStatusSchema = z.enum(
  Object.values(NOTIFICATION_STATUS) as [string, ...string[]]
);

export type NotificationStatusSchemaType = z.infer<typeof NotificationStatusSchema>;
