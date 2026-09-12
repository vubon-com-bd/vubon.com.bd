import { BILLING_ADDRESS } from '@vubon/shared-constants/src/business/checkout/billing-address.constants';

export interface BillingAddressInput {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  type: string;
}

const validateAddressBase = (address: Partial<BillingAddressInput>): string[] => {
  const errors: string[] = [];
  if (!address.street) errors.push('Street is required');
  if (!address.city) errors.push('City is required');
  if (!address.postalCode) errors.push('Postal code is required');
  if (!address.country) errors.push('Country is required');
  return errors;
};

export const validateBillingAddress = (
  address: Partial<BillingAddressInput>
): { isValid: boolean; errors: string[] } => {
  const errors = validateAddressBase(address);
  if (address.type && !Object.keys(BILLING_ADDRESS.TYPES).includes(address.type)) {
    errors.push('Invalid billing address type');
  }
  return { isValid: errors.length === 0, errors };
};
