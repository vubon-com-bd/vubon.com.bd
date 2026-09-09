import { isVerificationExpired } from '../user/verification-validator';

export interface AdminVerification {
  type: 'email' | 'phone' | 'document' | 'background_check';
  status: 'pending' | 'approved' | 'rejected';
  expiresAt: Date;
  metadata: Record<string, unknown>;
}

export const validateAdminVerification = (verification: AdminVerification): boolean => {
  return (
    !isVerificationExpired(verification.expiresAt) &&
    verification.status === 'pending' &&
    ['email', 'phone', 'document', 'background_check'].includes(verification.type)
  );
};
