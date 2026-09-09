import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants/src/auth/auth-login-attempt.constants';

const authLoginAttemptKeys = Object.keys(AUTH_LOGIN_ATTEMPT) as [string, ...string[]];

export const AuthLoginAttemptSchema = BaseSchema.extend({
  attemptId: z.string().uuid(),
  userId: z.string().uuid(),
  email: z.string().email(),
  ipAddress: z.string(),
  userAgent: z.string(),
  status: z.enum(authLoginAttemptKeys),
  failureReason: z.string().optional(),
  attemptedAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
