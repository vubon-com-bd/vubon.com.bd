/**
 * Notification Category Schema
 * @module shared-schemas/platform/notification
 */

import { z } from 'zod';
import { NOTIFICATION_CATEGORY } from '@vubon/shared-constants/platform';

export const NotificationCategorySchema = z.enum(
  Object.values(NOTIFICATION_CATEGORY) as [string, ...string[]]
);

export type NotificationCategorySchemaType = z.infer<typeof NotificationCategorySchema>;
