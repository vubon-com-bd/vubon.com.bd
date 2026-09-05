/**
 * Review Endpoints
 * রিভিউ সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { REVIEW } from '@vubon/shared-constants';
import type { Review } from '@vubon/shared-types';

export const reviewEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/reviews/${id}`,
  create: baseEndpoints.create,
  update: (id: string): string => `/reviews/${id}`,
  delete: (id: string): string => `/reviews/${id}`,
  moderate: (id: string): string => `/reviews/${id}/moderate`,
  byProduct: (productId: string): string => `/reviews/product/${productId}`,
  helpful: (id: string): string => `/reviews/${id}/helpful`,
  report: (id: string): string => `/reviews/${id}/report`,
  status: REVIEW.STATUS,
  types: REVIEW.TYPES,
  ratings: REVIEW.RATINGS,
} as const;

export type ReviewEndpoint = {
  endpoints: typeof reviewEndpoints;
  response: Review;
};

export type ReviewEndpointKey = keyof typeof reviewEndpoints;
