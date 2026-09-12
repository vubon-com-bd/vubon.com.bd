import { z } from 'zod';
import { AuthVerificationSchema } from '../auth/auth-verification.schema';
import { AUTH_VERIFICATION } from '@vubon/shared-constants/src/auth/auth-verification.constants';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

/**
 * Admin verification types — merge AUTH_VERIFICATION values with
 * admin-specific 'background_check'.
 */
const baseVerificationValues: string[] = Object.values(AUTH_VERIFICATION);
const adminVerificationValues: string[] = [...baseVerificationValues, 'background_check'];
const adminVerificationTypes = adminVerificationValues as [string, ...string[]];

const verificationStatusValues = Object.values(STATUS.VERIFICATION) as [string, ...string[]];

/**
 * Internal Admin verification entity.
 * ⚠️ codeHash is @internal — never expose; use AdminVerificationPublicSchema.
 */
export const AdminVerificationSchema = AuthVerificationSchema.extend({
  adminId: z.string().uuid(),
  type: z.enum(adminVerificationTypes),
  status: z.enum(verificationStatusValues),
});

/**
 * Public-safe AdminVerification DTO.
 */
export const AdminVerificationPublicSchema = AdminVerificationSchema.omit({
  codeHash: true,
  metadata: true,
});
