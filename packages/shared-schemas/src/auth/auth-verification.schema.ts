import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AUTH_VERIFICATION } from '@vubon/shared-constants/src/auth/auth-verification.constants';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

const authVerificationValues = Object.values(AUTH_VERIFICATION) as [string, ...string[]];
const verificationStatusValues = Object.values(STATUS.VERIFICATION) as [string, ...string[]];

/**
 * Internal AuthVerification entity.
 * ⚠️ codeHash is bcrypt — plain code is never stored.
 */
export const AuthVerificationSchema = BaseSchema.extend({
  verificationId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(authVerificationValues),
  /** @internal bcrypt hash of code */
  codeHash: z.string().min(20).max(512),
  status: z.enum(verificationStatusValues),
  expiresAt: z.date(),
  verifiedAt: z.date().optional(),
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().min(1).default(5),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * INPUT schema — client sends the raw code (server hashes and compares).
 */
export const AuthVerificationInputSchema = z.object({
  userId: z.string().uuid(),
  type: z.enum(authVerificationValues),
  code: z.string().min(4).max(10),
});
