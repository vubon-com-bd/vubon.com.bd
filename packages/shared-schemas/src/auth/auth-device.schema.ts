import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_DEVICE } from '@vubon/shared-constants/src/auth/auth-device.constants';

const authDeviceKeys = Object.keys(AUTH_DEVICE) as [string, ...string[]];

export const AuthDeviceSchema = BaseSchema.extend({
  deviceId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(authDeviceKeys),
  name: z.string().min(1).max(100),
  model: z.string().optional(),
  os: z.string(),
  browser: z.string(),
  isTrusted: z.boolean().default(false),
  lastUsed: z.date(),
  registeredAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
