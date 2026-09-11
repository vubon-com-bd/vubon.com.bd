import { VENDOR_ADDRESS } from '@vubon/shared-constants/src/business/vendor/vendor-address.constants';

export interface VendorAddressInput {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  type: string;
}

export const validateVendorAddress = (
  address: Partial<VendorAddressInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!address.street) errors.push('Street is required');
  if (!address.city) errors.push('City is required');
  if (!address.postalCode) errors.push('Postal code is required');
  if (!address.country) errors.push('Country is required');
  if (address.type && !Object.keys(VENDOR_ADDRESS.TYPES).includes(address.type)) {
    errors.push('Invalid address type');
  }
  return { isValid: errors.length === 0, errors };
};
