import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { USER_VERIFICATION } from '@vubon/shared-constants/src/user/user-verification.constants';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

const userVerificationValues = Object.values(USER_VERIFICATION) as [string, ...string[]];
const verificationStatusValues = Object.values(STATUS.VERIFICATION) as [string, ...string[]];

export const UserVerificationSchema = BaseSchema.extend({
  verificationId: z.string().uuid(),
  userId: z.string().uuid(),
  type: z.enum(userVerificationValues),
  status: z.enum(verificationStatusValues),
  documentId: z.string().optional(),
  verifiedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
