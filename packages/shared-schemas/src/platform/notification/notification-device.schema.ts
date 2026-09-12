import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { NOTIFICATION_DEVICE } from '@vubon/shared-constants/src/platform/notification/notification-device.constants';

const notificationDeviceStatusKeys = Object.keys(NOTIFICATION_DEVICE.STATUS) as [
  string,
  ...string[],
];
const notificationDeviceTypeKeys = Object.keys(NOTIFICATION_DEVICE.TYPES) as [string, ...string[]];

export const NotificationDeviceSchema = BaseSchema.extend({
  deviceId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  status: z.enum(notificationDeviceStatusKeys),
  type: z.enum(notificationDeviceTypeKeys),
  token: z.string(),
  name: z.string().min(1).max(100),
  model: z.string().optional(),
  os: z.string(),
  osVersion: z.string(),
  browser: z.string(),
  browserVersion: z.string(),
  isActive: z.boolean().default(true),
  isRegistered: z.boolean().default(false),
  registeredAt: z.date(),
  lastUsed: z.date(),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
