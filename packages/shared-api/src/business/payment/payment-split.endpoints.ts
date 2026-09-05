/**
 * Payment Split Endpoints
 * পেমেন্ট স্প্লিট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PAYMENT_SPLIT } from '@vubon/shared-constants';
import type { PaymentSplit } from '@vubon/shared-types';

export const paymentSplitEndpoints = {
  create: `${baseEndpoints.api}/payment/split`,
  get: (id: string) => `${baseEndpoints.api}/payment/split/${id}`,
  list: `${baseEndpoints.api}/payment/splits`,
  process: (id: string) => `${baseEndpoints.api}/payment/split/${id}/process`,
} as const;

// PAYMENT_SPLIT ব্যবহার
export const getPaymentSplitStatuses = () => {
  return Object.values(PAYMENT_SPLIT.STATUS);
};

// PaymentSplit টাইপ ব্যবহার
export type PaymentSplitType = PaymentSplit;

export type PaymentSplitEndpointKey = keyof typeof paymentSplitEndpoints;
