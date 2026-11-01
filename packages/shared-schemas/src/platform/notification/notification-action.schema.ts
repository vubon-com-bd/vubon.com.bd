/**
 * Notification Action Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-action.constants থেকে।
 */

import { z } from 'zod';
import { NOTIFICATION_ACTION, NOTIFICATION_ACTION_TYPE } from '@vubon/shared-constants/platform';

export const NotificationActionValueSchema = z.enum(
  Object.values(NOTIFICATION_ACTION) as [string, ...string[]]
);

export const NotificationActionTypeSchema = z.enum(
  Object.values(NOTIFICATION_ACTION_TYPE) as [string, ...string[]]
);

export const NotificationActionSchema = z.object({
  action: NotificationActionValueSchema,
  type: NotificationActionTypeSchema,
  label: z.string().min(1).max(50),
  url: z.string().url().optional(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

export type NotificationActionValueSchemaType = z.infer<typeof NotificationActionValueSchema>;
export type NotificationActionTypeSchemaType = z.infer<typeof NotificationActionTypeSchema>;
export type NotificationActionSchemaType = z.infer<typeof NotificationActionSchema>;
