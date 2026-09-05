/**
 * Payment Verification Endpoints
 * পেমেন্ট যাচাই সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PAYMENT_VERIFICATION } from '@vubon/shared-constants';
import type { PaymentVerification } from '@vubon/shared-types';

export const paymentVerificationEndpoints = {
  verify: `${baseEndpoints.api}/payment/verify`,
  status: (id: string) => `${baseEndpoints.api}/payment/verify/${id}`,
  resend: (id: string) => `${baseEndpoints.api}/payment/verify/${id}/resend`,
} as const;

// PAYMENT_VERIFICATION ব্যবহার
export const getPaymentVerificationStatuses = () => {
  return Object.values(PAYMENT_VERIFICATION.STATUS);
};

export const getPaymentVerificationMethods = () => {
  return Object.values(PAYMENT_VERIFICATION.METHODS);
};

// PaymentVerification টাইপ ব্যবহার
export type PaymentVerificationType = PaymentVerification;

export type PaymentVerificationEndpointKey = keyof typeof paymentVerificationEndpoints;
