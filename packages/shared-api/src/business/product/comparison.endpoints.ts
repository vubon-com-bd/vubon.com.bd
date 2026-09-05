/**
 * Comparison Endpoints
 * তুলনা সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PRODUCT } from '@vubon/shared-constants';
import type { Comparison } from '@vubon/shared-types';

export const comparisonEndpoints = {
  create: baseEndpoints.create,
  get: (id: string): string => `/comparisons/${id}`,
  getMy: '/comparisons/my',
  update: (id: string): string => `/comparisons/${id}`,
  add: (id: string): string => `/comparisons/${id}/add`,
  remove: (id: string): string => `/comparisons/${id}/remove`,
  clear: (id: string): string => `/comparisons/${id}/clear`,
  delete: (id: string): string => `/comparisons/${id}`,
  share: (token: string): string => `/comparisons/share/${token}`,
  // PRODUCT.COMPARISON থেকে কনস্ট্যান্টস ব্যবহার
  maxItems: PRODUCT.COMPARISON.MAX_ITEMS,
  defaultItems: PRODUCT.COMPARISON.DEFAULT_ITEMS,
  maxAttributes: PRODUCT.COMPARISON.MAX_ATTRIBUTES,
  shareExpiry: PRODUCT.COMPARISON.SHARE_EXPIRY,
} as const;

export type ComparisonEndpoint = {
  endpoints: typeof comparisonEndpoints;
  response: Comparison;
};

export type ComparisonEndpointKey = keyof typeof comparisonEndpoints;
