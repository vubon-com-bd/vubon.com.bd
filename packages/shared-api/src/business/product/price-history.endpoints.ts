/**
 * Price History Endpoints
 * মূল্য ইতিহাস সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PRICE_HISTORY } from '@vubon/shared-constants';
import type { PriceHistory } from '@vubon/shared-types';

export const priceHistoryEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/price-history/${id}`,
  create: baseEndpoints.create,
  byProduct: (productId: string): string => `/price-history/product/${productId}`,
  stats: (productId: string): string => `/price-history/product/${productId}/stats`,
  // PRICE_HISTORY ব্যবহার করা হয়েছে
  maxHistory: PRICE_HISTORY.MAX_HISTORY || 100,
  retentionDays: PRICE_HISTORY.RETENTION_DAYS || 30,
  // baseEndpoints এর ভ্যালু ব্যবহার
  baseList: baseEndpoints.list,
  baseCreate: baseEndpoints.create,
} as const;

export type PriceHistoryEndpoint = {
  endpoints: typeof priceHistoryEndpoints;
  response: PriceHistory;
};

export type PriceHistoryEndpointKey = keyof typeof priceHistoryEndpoints;
