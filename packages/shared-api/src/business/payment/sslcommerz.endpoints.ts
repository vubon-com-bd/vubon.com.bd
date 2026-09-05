/**
 * SSLCommerz Endpoints
 * SSLCommerz পেমেন্ট গেটওয়ে সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { SSLCOMMERZ } from '@vubon/shared-constants';

export const sslcommerzEndpoints = {
  init: `${baseEndpoints.api}/payment/sslcommerz/init`,
  verify: `${baseEndpoints.api}/payment/sslcommerz/verify`,
  ipn: `${baseEndpoints.api}/payment/sslcommerz/ipn`,
  success: `${baseEndpoints.api}/payment/sslcommerz/success`,
  fail: `${baseEndpoints.api}/payment/sslcommerz/fail`,
  cancel: `${baseEndpoints.api}/payment/sslcommerz/cancel`,
} as const;

// SSLCOMMERZ ব্যবহার
export const getSSLCommerzStatuses = () => {
  return Object.values(SSLCOMMERZ);
};

export type SSLCommerzEndpointKey = keyof typeof sslcommerzEndpoints;
