/**
 * Payment Method Endpoints
 * পেমেন্ট মেথড সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PAYMENT_METHODS } from '@vubon/shared-constants';
import type { PaymentMethod } from '@vubon/shared-types';

export const paymentMethodEndpoints = {
  list: `${baseEndpoints.api}/payment/methods`,
  detail: (id: string) => `${baseEndpoints.api}/payment/methods/${id}`,
  create: `${baseEndpoints.api}/payment/methods`,
  update: (id: string) => `${baseEndpoints.api}/payment/methods/${id}`,
  delete: (id: string) => `${baseEndpoints.api}/payment/methods/${id}`,
  setDefault: (id: string) => `${baseEndpoints.api}/payment/methods/${id}/default`,
} as const;

// PAYMENT_METHODS ব্যবহার
export const getPaymentMethodTypes = () => {
  return Object.values(PAYMENT_METHODS);
};

// PaymentMethod টাইপ ব্যবহার
export type PaymentMethodType = PaymentMethod;

export type PaymentMethodEndpointKey = keyof typeof paymentMethodEndpoints;
