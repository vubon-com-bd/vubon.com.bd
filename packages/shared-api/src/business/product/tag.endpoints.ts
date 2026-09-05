/**
 * Tag Endpoints
 * ট্যাগ সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { TAG } from '@vubon/shared-constants';
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
  // TAG ব্যবহার করা হয়েছে
  maxTags: TAG.MAX_TAGS || 50,
  minLength: TAG.MIN_LENGTH || 2,
  maxLength: TAG.MAX_LENGTH || 50,
  // baseEndpoints এর ভ্যালু ব্যবহার
  baseList: baseEndpoints.list,
  baseCreate: baseEndpoints.create,
} as const;

export type TagEndpoint = {
  endpoints: typeof tagEndpoints;
  response: Tag;
};

export type TagEndpointKey = keyof typeof tagEndpoints;
