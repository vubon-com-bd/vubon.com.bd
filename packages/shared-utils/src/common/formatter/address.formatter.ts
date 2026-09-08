import { Address } from '@vubon/shared-types';

export const formatAddress = (address: Address): string => {
  const parts = [
    address.value.street,
    address.value.city,
    address.value.state,
    address.value.postalCode,
    address.value.country,
  ].filter(Boolean);
  return parts.join(', ');
};

export const formatAddressShort = (address: Address): string => {
  const parts = [address.value.street, address.value.city, address.value.country].filter(Boolean);
  return parts.join(', ');
};
