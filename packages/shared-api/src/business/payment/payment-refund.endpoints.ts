/**
 * Payment Refund Endpoints
 * পেমেন্ট রিফান্ড সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { REFUND } from '@vubon/shared-constants';
import type { PaymentRefund } from '@vubon/shared-types';

export const paymentRefundEndpoints = {
  create: `${baseEndpoints.api}/payment/refund`,
  get: (id: string) => `${baseEndpoints.api}/payment/refund/${id}`,
  list: `${baseEndpoints.api}/payment/refunds`,
  approve: (id: string) => `${baseEndpoints.api}/payment/refund/${id}/approve`,
  reject: (id: string) => `${baseEndpoints.api}/payment/refund/${id}/reject`,
  process: (id: string) => `${baseEndpoints.api}/payment/refund/${id}/process`,
} as const;

// REFUND ব্যবহার
export const getRefundStatuses = () => {
  return Object.values(REFUND.STATUS);
};

export const getRefundTypes = () => {
  return Object.values(REFUND.TYPES);
};

// PaymentRefund টাইপ ব্যবহার
export type PaymentRefundType = PaymentRefund;

export type PaymentRefundEndpointKey = keyof typeof paymentRefundEndpoints;
