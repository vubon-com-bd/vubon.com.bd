/**
 * Tag Endpoints
 * ট্যাগ সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PRODUCT } from '@vubon/shared-constants';
import type { Tag } from '@vubon/shared-types';

export const tagEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/tags/${id}`,
  create: baseEndpoints.create,
  update: (id: string): string => `/tags/${id}`,
  delete: (id: string): string => `/tags/${id}`,
  bulk: '/tags/bulk',
  popular: '/tags/popular',
  products: (id: string): string => `/tags/${id}/products`,
  // PRODUCT.TAG থেকে কনস্ট্যান্টস ব্যবহার
  maxTagsPerProduct: PRODUCT.TAG.MAX_TAGS_PER_PRODUCT,
  maxTagsPerBulk: PRODUCT.TAG.MAX_TAGS_PER_BULK,
  minLength: PRODUCT.TAG.MIN_LENGTH,
  maxLength: PRODUCT.TAG.MAX_LENGTH,
  allowedChars: PRODUCT.TAG.ALLOWED_CHARS,
} as const;

export type TagEndpoint = {
  endpoints: typeof tagEndpoints;
  response: Tag;
};

export type TagEndpointKey = keyof typeof tagEndpoints;
