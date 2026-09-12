import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants/src/auth/auth-login-attempt.constants';

const loginAttemptValues = Object.values(AUTH_LOGIN_ATTEMPT) as [string, ...string[]];

export const AuthLoginAttemptSchema = BaseSchema.extend({
  attemptId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  email: z.string().email(),
  /** @internal filled by server from request */
  ipAddress: z.string(),
  userAgent: z.string(),
  status: z.enum(loginAttemptValues),
  failureReason: z.string().optional(),
  attemptedAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
