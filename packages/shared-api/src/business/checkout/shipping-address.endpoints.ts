/**
 * Shipping Address Endpoints
 * শিপিং ঠিকানা সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import type { ShippingAddress } from '@vubon/shared-types';

export const shippingAddressEndpoints = {
  get: (checkoutId: string) => `${baseEndpoints.api}/checkout/${checkoutId}/shipping`,
  update: (checkoutId: string) => `${baseEndpoints.api}/checkout/${checkoutId}/shipping`,
  validate: (checkoutId: string) => `${baseEndpoints.api}/checkout/${checkoutId}/shipping/validate`,
} as const;

export type ShippingAddressEndpointKey = keyof typeof shippingAddressEndpoints;

// ShippingAddress টাইপ ব্যবহার করে helper function
export const formatShippingAddress = (address: ShippingAddress): string => {
  return `${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.zipCode}`;
};
