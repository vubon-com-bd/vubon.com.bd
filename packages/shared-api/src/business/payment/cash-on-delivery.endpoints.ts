/**
 * Cash On Delivery Endpoints
 * ক্যাশ অন ডেলিভারি সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CASH_ON_DELIVERY } from '@vubon/shared-constants';
import type { CashOnDelivery } from '@vubon/shared-types';

export const cashOnDeliveryEndpoints = {
  create: `${baseEndpoints.api}/payment/cod`,
  verify: (id: string) => `${baseEndpoints.api}/payment/cod/${id}/verify`,
  get: (id: string) => `${baseEndpoints.api}/payment/cod/${id}`,
  list: `${baseEndpoints.api}/payment/cod`,
} as const;

// CASH_ON_DELIVERY ব্যবহার
export const getCashOnDeliveryStatuses = () => {
  return Object.values(CASH_ON_DELIVERY);
};

// CashOnDelivery টাইপ ব্যবহার
export type CashOnDeliveryType = CashOnDelivery;

export type CashOnDeliveryEndpointKey = keyof typeof cashOnDeliveryEndpoints;
