/**
 * Address Formatter — works with Address value object or plain data.
 */
import type { Address } from '@vubon/shared-types';

interface AddressLike {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

const extract = (addr: Address | AddressLike): AddressLike => {
  if ('value' in addr && addr.value) {
    return addr.value as AddressLike;
  }
  return addr as AddressLike;
};

export const formatAddress = (address: Address | AddressLike): string => {
  const a = extract(address);
  return [a.street, a.city, a.state, a.postalCode, a.country].filter(Boolean).join(', ');
};

export const formatAddressShort = (address: Address | AddressLike): string => {
  const a = extract(address);
  return [a.street, a.city, a.country].filter(Boolean).join(', ');
};
