import { COUNTRY } from '@vubon/shared-constants/src/common/country.constants';

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export const validateAddress = (
  address: Partial<Address>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!address.street) errors.push('Street is required');
  if (!address.city) errors.push('City is required');
  if (!address.postalCode) errors.push('Postal code is required');
  if (address.country && !Object.keys(COUNTRY).includes(address.country)) {
    errors.push('Invalid country');
  }
  return { isValid: errors.length === 0, errors };
};
