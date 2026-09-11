import { AuthVerification } from '../auth/auth-verification.types';
import { AdminPublic } from './admin.types';

/**
 * Admin verification types
 */
export type AdminVerificationType = 'email' | 'phone' | 'document' | 'background_check';

export type AdminVerificationStatus = 'pending' | 'approved' | 'rejected';

/**
 * Admin verification interface
 * Note: `type` is Omitted from AuthVerification to allow admin-specific types.
 */
export interface AdminVerification extends Omit<AuthVerification, 'type'> {
  adminId: string;
  admin: AdminPublic;
  type: AdminVerificationType;
  status: AdminVerificationStatus;
}
