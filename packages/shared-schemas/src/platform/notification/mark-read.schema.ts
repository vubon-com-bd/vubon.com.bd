/**
 * Mark Notification as Read Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';

export const MarkNotificationReadRequestSchema = z
  .object({
    notificationIds: z.array(UuidSchema).min(1).max(100),
    readAt: z.string().datetime().optional(),
  })
  .strict();

export const MarkNotificationUnreadRequestSchema = z
  .object({
    notificationIds: z.array(UuidSchema).min(1).max(100),
  })
  .strict();

export type MarkNotificationReadRequestSchemaType = z.infer<
  typeof MarkNotificationReadRequestSchema
>;
export type MarkNotificationUnreadRequestSchemaType = z.infer<
  typeof MarkNotificationUnreadRequestSchema
>;
