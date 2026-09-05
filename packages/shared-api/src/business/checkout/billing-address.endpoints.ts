/**
 * Billing Address Endpoints
 * বিলিং ঠিকানা সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import type { BillingAddress } from '@vubon/shared-types';

export const billingAddressEndpoints = {
  get: (checkoutId: string) => `${baseEndpoints.api}/checkout/${checkoutId}/billing`,
  update: (checkoutId: string) => `${baseEndpoints.api}/checkout/${checkoutId}/billing`,
  validate: (checkoutId: string) => `${baseEndpoints.api}/checkout/${checkoutId}/billing/validate`,
} as const;

export type BillingAddressEndpointKey = keyof typeof billingAddressEndpoints;

// BillingAddress টাইপ ব্যবহার করে helper function
export const formatBillingAddress = (address: BillingAddress): string => {
  return `${address.street}, ${address.city}, ${address.state}, ${address.country} - ${address.zipCode}`;
};
