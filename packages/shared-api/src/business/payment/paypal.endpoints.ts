/**
 * PayPal Endpoints
 * PayPal পেমেন্ট গেটওয়ে সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PAYPAL } from '@vubon/shared-constants';

export const paypalEndpoints = {
  create: `${baseEndpoints.api}/payment/paypal/create`,
  verify: `${baseEndpoints.api}/payment/paypal/verify`,
  webhook: `${baseEndpoints.api}/payment/paypal/webhook`,
  refund: `${baseEndpoints.api}/payment/paypal/refund`,
  cancel: `${baseEndpoints.api}/payment/paypal/cancel`,
} as const;

// PAYPAL ব্যবহার
export const getPaypalStatuses = () => {
  return Object.values(PAYPAL);
};

export type PayPalEndpointKey = keyof typeof paypalEndpoints;
