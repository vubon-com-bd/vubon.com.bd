import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_MFA } from '@vubon/shared-constants/src/auth/auth-mfa.constants';

const authMfaKeys = Object.keys(AUTH_MFA) as [string, ...string[]];

export const AuthMfaSchema = BaseSchema.extend({
  mfaId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(authMfaKeys),
  secret: z.string(),
  backupCodes: z.array(z.string()).min(5).max(10),
  isEnabled: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});

export const MfaSetupSchema = z.object({
  type: z.enum(authMfaKeys),
  code: z.string().min(6).max(6).optional(),
});
