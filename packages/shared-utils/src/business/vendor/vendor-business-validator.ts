import { VENDOR_BUSINESS } from '@vubon/shared-constants/src/business/vendor/vendor-business.constants';

export interface VendorBusinessInput {
  name: string;
  registrationNumber: string;
  taxId: string;
  type: string;
  businessSize: string;
}

export const validateVendorBusiness = (
  business: Partial<VendorBusinessInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!business.name) errors.push('Business name is required');
  if (!business.registrationNumber) errors.push('Registration number is required');
  if (!business.taxId) errors.push('Tax ID is required');
  if (business.type && !Object.keys(VENDOR_BUSINESS.TYPES).includes(business.type)) {
    errors.push('Invalid business type');
  }
  if (
    business.businessSize &&
    !Object.keys(VENDOR_BUSINESS.BUSINESS_SIZE).includes(business.businessSize)
  ) {
    errors.push('Invalid business size');
  }
  return { isValid: errors.length === 0, errors };
};
