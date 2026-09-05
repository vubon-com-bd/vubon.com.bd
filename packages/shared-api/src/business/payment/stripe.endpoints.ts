/**
 * Stripe Endpoints
 * Stripe পেমেন্ট গেটওয়ে সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { STRIPE } from '@vubon/shared-constants';

export const stripeEndpoints = {
  create: `${baseEndpoints.api}/payment/stripe/create`,
  verify: `${baseEndpoints.api}/payment/stripe/verify`,
  webhook: `${baseEndpoints.api}/payment/stripe/webhook`,
  refund: `${baseEndpoints.api}/payment/stripe/refund`,
  cancel: `${baseEndpoints.api}/payment/stripe/cancel`,
} as const;

// STRIPE ব্যবহার
export const getStripeStatuses = () => {
  return Object.values(STRIPE);
};

export type StripeEndpointKey = keyof typeof stripeEndpoints;
