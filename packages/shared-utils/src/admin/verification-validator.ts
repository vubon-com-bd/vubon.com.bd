import { isVerificationExpired } from '../user/verification-validator';
import { AdminVerification } from '@vubon/shared-types';

export const validateAdminVerification = (verification: AdminVerification): boolean => {
  return !isVerificationExpired(verification.expiresAt) && verification.status === 'pending';
};
