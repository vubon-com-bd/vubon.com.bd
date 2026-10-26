/**
 * Register Notification Device Request Schema
 * @module shared-schemas/platform/notification
 */
import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema.js';
import { NotificationDeviceTypeSchema } from './notification-device.schema.js';

export const RegisterNotificationDeviceRequestSchema = z
  .object({
    userId: UuidSchema,
    type: NotificationDeviceTypeSchema,
    token: z.string().min(1).max(500),
    appVersion: z.string().max(20).optional(),
    osVersion: z.string().max(50).optional(),
    deviceName: z.string().max(100).optional(),
    idempotencyKey: z.string().min(1).max(128).optional(),
  })
  .strict();

export type RegisterNotificationDeviceRequestSchemaType = z.infer<
  typeof RegisterNotificationDeviceRequestSchema
>;
