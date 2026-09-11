import { VENDOR_SUSPENSION } from '@vubon/shared-constants/src/business/vendor/vendor-suspension.constants';

export interface VendorSuspensionInput {
  reason: string;
  description: string;
}

export const validateVendorSuspension = (
  suspension: Partial<VendorSuspensionInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!suspension.reason) errors.push('Suspension reason is required');
  if (
    suspension.reason &&
    !Object.keys(VENDOR_SUSPENSION.SUSPENSION_REASONS).includes(suspension.reason)
  ) {
    errors.push('Invalid suspension reason');
  }
  if (!suspension.description) errors.push('Suspension description is required');
  return { isValid: errors.length === 0, errors };
};
