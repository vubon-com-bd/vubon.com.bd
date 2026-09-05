/**
 * Abandoned Cart Endpoints
 * পরিত্যক্ত কার্ট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { ABANDONED_CART } from '@vubon/shared-constants';
import type { AbandonedCart } from '@vubon/shared-types';

// ABANDONED_CART কনস্ট্যান্ট ব্যবহার করে পাথ এবং স্ট্যাটাস
const BASE_PATH = baseEndpoints.api + '/cart/abandoned';

export const abandonedCartEndpoints = {
  list: `${BASE_PATH}`,
  recover: (id: string) => `${BASE_PATH}/${id}/recover`,
  cleanup: `${BASE_PATH}/cleanup`,
  stats: `${BASE_PATH}/stats`,
  remind: (id: string) => `${BASE_PATH}/${id}/remind`,
  status: (id: string) => `${BASE_PATH}/${id}/status`,
} as const;

// ABANDONED_CART স্ট্যাটাস ব্যবহার করে টাইপ ডিফাইন
export type AbandonedCartStatusType =
  (typeof ABANDONED_CART.STATUS)[keyof typeof ABANDONED_CART.STATUS];

export type AbandonedCartListResponse = {
  items: AbandonedCart[];
  total: number;
  page: number;
  limit: number;
};

export type AbandonedCartStats = {
  totalAbandoned: number;
  recovered: number;
  conversionRate: number;
  recoveryRate: number;
  statusCounts: Record<AbandonedCartStatusType, number>;
};

export type AbandonedCartEndpointKey = keyof typeof abandonedCartEndpoints;
