import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { VERIFICATION } from '@vubon/shared-constants/src/common/verification.constants';
import { USER_VERIFICATION } from '@vubon/shared-constants/src/user/user-verification.constants';

const verificationKeys = Object.keys(VERIFICATION) as [string, ...string[]];
const userVerificationKeys = Object.keys(USER_VERIFICATION) as [string, ...string[]];

export const UserVerificationSchema = BaseSchema.extend({
  verificationId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(userVerificationKeys),
  status: z.enum(verificationKeys),
  documentId: z.string().optional(),
  verifiedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
