/**
 * Checkout Session Endpoints
 * চেকআউট সেশন সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CHECKOUT } from '@vubon/shared-constants';
import type { CheckoutSession } from '@vubon/shared-types';

export const checkoutSessionEndpoints = {
  create: `${baseEndpoints.api}/checkout/session`,
  get: (id: string) => `${baseEndpoints.api}/checkout/session/${id}`,
  refresh: (id: string) => `${baseEndpoints.api}/checkout/session/${id}/refresh`,
  extend: (id: string) => `${baseEndpoints.api}/checkout/session/${id}/extend`,
} as const;

export type CheckoutSessionEndpointKey = keyof typeof checkoutSessionEndpoints;

// CHECKOUT কনস্ট্যান্ট ব্যবহার করে session status চেক
export const isCheckoutSessionValid = (session: CheckoutSession): boolean => {
  return session.status !== CHECKOUT.STATUS.EXPIRED && session.status !== CHECKOUT.STATUS.CANCELLED;
};
