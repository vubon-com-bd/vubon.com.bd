/**
 * Price History Endpoints
 * মূল্য ইতিহাস সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PRODUCT } from '@vubon/shared-constants';
import type { PriceHistory } from '@vubon/shared-types';

export const priceHistoryEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/price-history/${id}`,
  create: baseEndpoints.create,
  byProduct: (productId: string): string => `/price-history/product/${productId}`,
  stats: (productId: string): string => `/price-history/product/${productId}/stats`,
  // PRODUCT.PRICE_HISTORY থেকে কনস্ট্যান্টস ব্যবহার
  maxRecords: PRODUCT.PRICE_HISTORY.MAX_RECORDS,
  retentionDays: PRODUCT.PRICE_HISTORY.RETENTION_DAYS,
  bulkLimit: PRODUCT.PRICE_HISTORY.BULK_LIMIT,
} as const;

export type PriceHistoryEndpoint = {
  endpoints: typeof priceHistoryEndpoints;
  response: PriceHistory;
};

export type PriceHistoryEndpointKey = keyof typeof priceHistoryEndpoints;
