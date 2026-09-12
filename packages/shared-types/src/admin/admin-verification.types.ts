import { AuthVerification } from '../auth/auth-verification.types';
import { AUTH_VERIFICATION } from '@vubon/shared-constants/src/auth/auth-verification.constants';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

/**
 * Admin verification types — extends AUTH_VERIFICATION with admin-specific
 */
export type AdminVerificationType =
  | typeof AUTH_VERIFICATION.EMAIL
  | typeof AUTH_VERIFICATION.PHONE
  | typeof AUTH_VERIFICATION.DOCUMENT
  | 'background_check';

/**
 * Admin verification status — derived from STATUS.VERIFICATION
 */
export type AdminVerificationStatus =
  (typeof STATUS.VERIFICATION)[keyof typeof STATUS.VERIFICATION];

/**
 * Admin verification interface (internal entity)
 *
 * ⚠️ SECURITY: `AuthVerification` carries `codeHash` (@internal).
 * NEVER return this type to clients — use `AdminVerificationPublic`.
 */
export interface AdminVerification extends Omit<AuthVerification, 'type'> {
  adminId: string;
  type: AdminVerificationType;
  status: AdminVerificationStatus;
}

/**
 * Public-safe AdminVerification DTO — omits codeHash and metadata.
 */
export type AdminVerificationPublic = Omit<AdminVerification, 'codeHash' | 'metadata'>;
