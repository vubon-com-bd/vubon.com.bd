/**
 * bKash Endpoints
 * bKash পেমেন্ট গেটওয়ে সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { BKASH } from '@vubon/shared-constants';

export const bkashEndpoints = {
  init: `${baseEndpoints.api}/payment/bkash/init`,
  verify: `${baseEndpoints.api}/payment/bkash/verify`,
  callback: `${baseEndpoints.api}/payment/bkash/callback`,
  success: `${baseEndpoints.api}/payment/bkash/success`,
  cancel: `${baseEndpoints.api}/payment/bkash/cancel`,
  refund: `${baseEndpoints.api}/payment/bkash/refund`,
} as const;

// BKASH ব্যবহার
export const getBkashStatuses = () => {
  return Object.values(BKASH);
};

export type BkashEndpointKey = keyof typeof bkashEndpoints;
