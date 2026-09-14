/**
 * Notification Priority Schema
 * @module shared-schemas/platform/notification
 */

import { z } from 'zod';
import { NOTIFICATION_PRIORITY } from '@vubon/shared-constants/platform';

export const NotificationPrioritySchema = z.enum(
  Object.values(NOTIFICATION_PRIORITY) as [string, ...string[]]
);

export type NotificationPrioritySchemaType = z.infer<typeof NotificationPrioritySchema>;
