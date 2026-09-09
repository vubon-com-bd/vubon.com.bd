import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { VERIFICATION } from '@vubon/shared-constants/src/common/verification.constants';
import { AUTH_VERIFICATION } from '@vubon/shared-constants/src/auth/auth-verification.constants';

const verificationKeys = Object.keys(VERIFICATION) as [string, ...string[]];
const authVerificationKeys = Object.keys(AUTH_VERIFICATION) as [string, ...string[]];

export const AuthVerificationSchema = BaseSchema.extend({
  verificationId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(authVerificationKeys),
  code: z.string().min(4).max(10),
  status: z.enum(verificationKeys),
  expiresAt: z.date(),
  verifiedAt: z.date().optional(),
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().min(1).default(5),
  metadata: z.record(z.unknown()).optional(),
});
