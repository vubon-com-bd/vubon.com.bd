/**
 * Crypto Payment Endpoints
 * ক্রিপ্টো পেমেন্ট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CRYPTO_PAYMENT } from '@vubon/shared-constants';
import type { CryptoPayment } from '@vubon/shared-types';

export const cryptoPaymentEndpoints = {
  create: `${baseEndpoints.api}/payment/crypto`,
  verify: (id: string) => `${baseEndpoints.api}/payment/crypto/${id}/verify`,
  get: (id: string) => `${baseEndpoints.api}/payment/crypto/${id}`,
  list: `${baseEndpoints.api}/payment/crypto`,
} as const;

// CRYPTO_PAYMENT ব্যবহার
export const getCryptoPaymentStatuses = () => {
  return Object.values(CRYPTO_PAYMENT);
};

// CryptoPayment টাইপ ব্যবহার
export type CryptoPaymentType = CryptoPayment;

export type CryptoPaymentEndpointKey = keyof typeof cryptoPaymentEndpoints;
