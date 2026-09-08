import { Address } from '@vubon/shared-types';
import { COUNTRY } from '@vubon/shared-constants';

export const validateAddress = (
  address: Partial<Address>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const addr = address?.value;

  if (!addr?.street) errors.push('Street is required');
  if (!addr?.city) errors.push('City is required');
  if (!addr?.postalCode) errors.push('Postal code is required');
  if (addr?.country && !Object.keys(COUNTRY).includes(addr.country)) {
    errors.push('Invalid country');
  }
  return { isValid: errors.length === 0, errors };
};
