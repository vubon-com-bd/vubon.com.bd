import { AuthVerification } from '../auth/auth-verification.types';
import { Admin } from './admin.types';

export type AdminVerificationType = 'email' | 'phone' | 'document' | 'background_check';
export type AdminVerificationStatus = 'pending' | 'approved' | 'rejected';

export interface AdminVerification extends Omit<AuthVerification, 'type' | 'status'> {
  verificationId: string;
  adminId: string;
  admin: Admin;
  type: AdminVerificationType;
  status: AdminVerificationStatus;
  metadata: Record<string, unknown>;
}
