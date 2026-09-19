/**
 * Notification Type Schema
 * @module shared-schemas/platform/notification
 */

import { z } from 'zod';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/platform';

export const NotificationTypeSchema = z.enum(
  Object.values(NOTIFICATION_TYPE) as [string, ...string[]]
);

export type NotificationTypeSchemaType = z.infer<typeof NotificationTypeSchema>;
