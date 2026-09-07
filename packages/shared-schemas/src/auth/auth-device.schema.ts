import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_DEVICE } from '@vubon/shared-constants';

export const AuthDeviceSchema = BaseSchema.extend({
  deviceId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(Object.keys(AUTH_DEVICE) as [string, ...string[]]),
  name: z.string().min(1).max(100),
  model: z.string().optional(),
  os: z.string(),
  browser: z.string(),
  isTrusted: z.boolean().default(false),
  lastUsed: z.date(),
  registeredAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
