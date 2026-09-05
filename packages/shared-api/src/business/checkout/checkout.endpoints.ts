/**
 * Checkout Endpoints
 * চেকআউট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { CHECKOUT } from '@vubon/shared-constants';
import type { Checkout } from '@vubon/shared-types';

export const checkoutEndpoints = {
  initiate: `${baseEndpoints.api}/checkout`,
  get: (id: string) => `${baseEndpoints.api}/checkout/${id}`,
  submit: (id: string) => `${baseEndpoints.api}/checkout/${id}/submit`,
  status: (id: string) => `${baseEndpoints.api}/checkout/${id}/status`,
  cancel: (id: string) => `${baseEndpoints.api}/checkout/${id}/cancel`,
  validate: (id: string) => `${baseEndpoints.api}/checkout/${id}/validate`,
} as const;

export type CheckoutEndpointKey = keyof typeof checkoutEndpoints;

// CHECKOUT কনস্ট্যান্ট ব্যবহার করে status টাইপ চেক (টাইপ গার্ড)
export const getCheckoutStatus = (status: string): string | undefined => {
  const validStatuses = Object.values(CHECKOUT.STATUS) as readonly string[];
  if (validStatuses.includes(status)) {
    return status;
  }
  return undefined;
};

// HTTP_STATUS ব্যবহার করে status code চেক
export const isCheckoutSuccess = (statusCode: number): boolean => {
  return statusCode === HTTP_STATUS.OK || statusCode === HTTP_STATUS.CREATED;
};

// Checkout টাইপ ব্যবহার করে helper function
export const isCheckoutValid = (checkout: Checkout): boolean => {
  return (
    checkout.status !== CHECKOUT.STATUS.EXPIRED && checkout.status !== CHECKOUT.STATUS.CANCELLED
  );
};

// Checkout টাইপ ব্যবহার করে total calculation
export const getCheckoutTotal = (checkout: Checkout): number => {
  return checkout.total;
};

// Checkout টাইপ ব্যবহার করে item count
export const getCheckoutItemCount = (checkout: Checkout): number => {
  return checkout.cart?.items?.length || 0;
};
