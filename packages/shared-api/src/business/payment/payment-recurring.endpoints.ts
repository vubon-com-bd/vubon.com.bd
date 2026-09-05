/**
 * Payment Recurring Endpoints
 * পেমেন্ট রিকারিং সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PAYMENT_RECURRING } from '@vubon/shared-constants';
import type { PaymentRecurring } from '@vubon/shared-types';

export const paymentRecurringEndpoints = {
  create: `${baseEndpoints.api}/payment/recurring`,
  cancel: (id: string) => `${baseEndpoints.api}/payment/recurring/${id}/cancel`,
  list: `${baseEndpoints.api}/payment/recurring`,
  get: (id: string) => `${baseEndpoints.api}/payment/recurring/${id}`,
  pause: (id: string) => `${baseEndpoints.api}/payment/recurring/${id}/pause`,
  resume: (id: string) => `${baseEndpoints.api}/payment/recurring/${id}/resume`,
} as const;

// PAYMENT_RECURRING ব্যবহার
export const getRecurringStatuses = () => {
  return Object.values(PAYMENT_RECURRING.STATUS);
};

export const getRecurringFrequencies = () => {
  return Object.values(PAYMENT_RECURRING.FREQUENCY);
};

// PaymentRecurring টাইপ ব্যবহার
export type PaymentRecurringType = PaymentRecurring;

export type PaymentRecurringEndpointKey = keyof typeof paymentRecurringEndpoints;
