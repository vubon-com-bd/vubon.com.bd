/**
 * Notification Device Schema
 * @module shared-schemas/platform/notification
 *
 * Values আসে shared-constants/platform/notification-device.constants থেকে।
 */

import { z } from 'zod';
import {
  NOTIFICATION_DEVICE_TYPE,
  NOTIFICATION_DEVICE_STATUS,
} from '@vubon/shared-constants/platform';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const NotificationDeviceTypeSchema = z.enum(
  Object.values(NOTIFICATION_DEVICE_TYPE) as [string, ...string[]]
);

export const NotificationDeviceStatusSchema = z.enum(
  Object.values(NOTIFICATION_DEVICE_STATUS) as [string, ...string[]]
);

export const NotificationDeviceSchema = z.object({
  id: UuidSchema,
  userId: UuidSchema,
  type: NotificationDeviceTypeSchema,
  status: NotificationDeviceStatusSchema,
  token: z.string().min(1).max(500),
  appVersion: z.string().max(20).optional(),
  osVersion: z.string().max(50).optional(),
  deviceName: z.string().max(100).optional(),
  lastActiveAt: z.string().datetime(),
  registeredAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const DeviceRegisterInputSchema = z
  .object({
    userId: UuidSchema,
    type: NotificationDeviceTypeSchema,
    token: z.string().min(1).max(500),
    appVersion: z.string().max(20).optional(),
    osVersion: z.string().max(50).optional(),
    deviceName: z.string().max(100).optional(),
  })
  .strict();

export type NotificationDeviceTypeSchemaType = z.infer<typeof NotificationDeviceTypeSchema>;
export type NotificationDeviceStatusSchemaType = z.infer<typeof NotificationDeviceStatusSchema>;
export type NotificationDeviceSchemaType = z.infer<typeof NotificationDeviceSchema>;
