import { VENDOR_VERIFICATION } from '@vubon/shared-constants/src/business/vendor/vendor-verification.constants';

export interface VendorVerificationInput {
  level: string;
  status: string;
}

export const validateVendorVerification = (
  verification: Partial<VendorVerificationInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!verification.level) errors.push('Verification level is required');
  if (
    verification.level &&
    !Object.keys(VENDOR_VERIFICATION.VERIFICATION_LEVELS).includes(verification.level)
  ) {
    errors.push('Invalid verification level');
  }
  if (
    verification.status &&
    !Object.keys(VENDOR_VERIFICATION.STATUS).includes(verification.status)
  ) {
    errors.push('Invalid verification status');
  }
  return { isValid: errors.length === 0, errors };
};
