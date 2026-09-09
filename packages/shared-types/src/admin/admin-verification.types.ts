import { AuthVerification } from '../auth/auth-verification.types';
import { Admin } from './admin.types';

/**
 * Admin verification interface
 */
export interface AdminVerification extends AuthVerification {
  verificationId: string;
  adminId: string;
  admin: Admin;
  type: 'email' | 'phone' | 'document' | 'background_check' | string;
  status: 'pending' | 'approved' | 'rejected' | string;
  metadata: Record<string, unknown>;
}
