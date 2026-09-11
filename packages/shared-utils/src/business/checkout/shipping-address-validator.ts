import { SHIPPING_ADDRESS } from '@vubon/shared-constants/src/business/checkout/shipping-address.constants';

export interface ShippingAddressInput {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  type: string;
}

const validateAddressBase = (address: Partial<ShippingAddressInput>): string[] => {
  const errors: string[] = [];
  if (!address.street) errors.push('Street is required');
  if (!address.city) errors.push('City is required');
  if (!address.postalCode) errors.push('Postal code is required');
  if (!address.country) errors.push('Country is required');
  return errors;
};

export const validateShippingAddress = (
  address: Partial<ShippingAddressInput>
): { isValid: boolean; errors: string[] } => {
  const errors = validateAddressBase(address);
  if (address.type && !Object.keys(SHIPPING_ADDRESS.TYPES).includes(address.type)) {
    errors.push('Invalid shipping address type');
  }
  return { isValid: errors.length === 0, errors };
};
