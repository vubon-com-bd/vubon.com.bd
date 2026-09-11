import { VENDOR_APPROVAL } from '@vubon/shared-constants/src/business/vendor/vendor-approval.constants';

export interface VendorApprovalInput {
  status: string;
  reviewedBy: string;
}

export const validateVendorApproval = (
  approval: Partial<VendorApprovalInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!approval.status) errors.push('Approval status is required');
  if (approval.status && !Object.keys(VENDOR_APPROVAL.STATUS).includes(approval.status)) {
    errors.push('Invalid approval status');
  }
  if (!approval.reviewedBy) errors.push('Reviewer is required');
  return { isValid: errors.length === 0, errors };
};
