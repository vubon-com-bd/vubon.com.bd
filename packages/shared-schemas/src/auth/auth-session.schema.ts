import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { SESSION } from '@vubon/shared-constants/src/common/session.constants';
import { AUTH_SESSION } from '@vubon/shared-constants/src/auth/auth-session.constants';
import { AUTH_DEVICE } from '@vubon/shared-constants/src/auth/auth-device.constants';

const authSessionValues = Object.values(AUTH_SESSION) as [string, ...string[]];
const sessionTypeValues = Object.values(SESSION.TYPE) as [string, ...string[]];
const deviceTypeValues = Object.values(AUTH_DEVICE) as [string, ...string[]];

/**
 * Internal AuthSession entity.
 * ⚠️ `token` is a raw secret — never serialize this to clients.
 */
export const AuthSessionSchema = BaseSchema.extend({
  sessionId: z.string().uuid(),
  userId: z.string().uuid(),
  token: z.string().min(20),
  status: z.enum(authSessionValues),
  type: z.enum(sessionTypeValues),
  expiresAt: z.date(),
  lastActivity: z.date(),
  deviceInfo: z.object({
    deviceId: z.string(),
    deviceName: z.string(),
    deviceType: z.enum(deviceTypeValues),
    browser: z.string(),
    os: z.string(),
  }),
  /** @internal filled by server from request */
  ipAddress: z.string(),
  userAgent: z.string(),
  metadata: z.record(z.unknown()).optional(),
});

export const AuthSessionCreateSchema = AuthSessionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Public-safe AuthSession DTO.
 */
export const AuthSessionPublicSchema = AuthSessionSchema.omit({ token: true }).extend({
  tokenPreview: z.string().max(12),
});
