import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { VERIFICATION } from '@vubon/shared-constants';
import { AUTH_VERIFICATION } from '@vubon/shared-constants';

export const AuthVerificationSchema = BaseSchema.extend({
  verificationId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(Object.keys(AUTH_VERIFICATION) as [string, ...string[]]),
  code: z.string().min(4).max(10),
  status: z.enum(Object.keys(VERIFICATION) as [string, ...string[]]),
  expiresAt: z.date(),
  verifiedAt: z.date().optional(),
  attempts: z.number().int().min(0).default(0),
  maxAttempts: z.number().int().min(1).default(5),
  metadata: z.record(z.unknown()).optional(),
});
