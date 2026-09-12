import { VENDOR_SUPPORT } from '@vubon/shared-constants/src/business/vendor/vendor-support.constants';

export interface SupportInput {
  vendorId: string;
  subject: string;
  description: string;
  type: string;
}

export const validateSupport = (
  support: Partial<SupportInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!support.vendorId) errors.push('Vendor ID is required');
  if (!support.subject) errors.push('Subject is required');
  if (!support.description) errors.push('Description is required');
  if (support.type && !Object.keys(VENDOR_SUPPORT.TYPES).includes(support.type)) {
    errors.push('Invalid support type');
  }
  return { isValid: errors.length === 0, errors };
};
