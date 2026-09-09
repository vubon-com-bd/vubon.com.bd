import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SESSION } from '@vubon/shared-constants/src/common/session.constants';
import { AUTH_SESSION } from '@vubon/shared-constants/src/auth/auth-session.constants';

const sessionKeys = Object.keys(SESSION) as [string, ...string[]];
const authSessionKeys = Object.keys(AUTH_SESSION) as [string, ...string[]];

export const AuthSessionSchema = BaseSchema.extend({
  sessionId: z.string().uuid(),
  userId: z.string().uuid(),
  token: z.string(),
  status: z.enum(authSessionKeys),
  type: z.enum(sessionKeys),
  expiresAt: z.date(),
  lastActivity: z.date(),
  deviceInfo: z.object({
    deviceId: z.string(),
    deviceName: z.string(),
    deviceType: z.enum(['mobile', 'tablet', 'desktop', 'other']),
    browser: z.string(),
    os: z.string(),
  }),
  ipAddress: z.string(),
  userAgent: z.string(),
  metadata: z.record(z.unknown()).optional(),
});

export const AuthSessionCreateSchema = AuthSessionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
