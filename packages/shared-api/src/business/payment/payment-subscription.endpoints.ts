/**
 * Payment Subscription Endpoints
 * পেমেন্ট সাবস্ক্রিপশন সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { SUBSCRIPTION } from '@vubon/shared-constants';
import type { PaymentSubscription } from '@vubon/shared-types';

export const paymentSubscriptionEndpoints = {
  create: `${baseEndpoints.api}/payment/subscription`,
  cancel: (id: string) => `${baseEndpoints.api}/payment/subscription/${id}/cancel`,
  list: `${baseEndpoints.api}/payment/subscriptions`,
  get: (id: string) => `${baseEndpoints.api}/payment/subscription/${id}`,
  upgrade: (id: string) => `${baseEndpoints.api}/payment/subscription/${id}/upgrade`,
  downgrade: (id: string) => `${baseEndpoints.api}/payment/subscription/${id}/downgrade`,
} as const;

// SUBSCRIPTION ব্যবহার
export const getSubscriptionStatuses = () => {
  return Object.values(SUBSCRIPTION.STATUS);
};

export const getSubscriptionIntervals = () => {
  return Object.values(SUBSCRIPTION.INTERVALS);
};

// PaymentSubscription টাইপ ব্যবহার
export type PaymentSubscriptionType = PaymentSubscription;

export type PaymentSubscriptionEndpointKey = keyof typeof paymentSubscriptionEndpoints;
