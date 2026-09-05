/**
 * Attribute Endpoints
 * অ্যাট্রিবিউট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { ATTRIBUTE } from '@vubon/shared-constants';
import type { Attribute } from '@vubon/shared-types';

export const attributeEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/attributes/${id}`,
  create: baseEndpoints.create,
  update: (id: string): string => `/attributes/${id}`,
  delete: (id: string): string => `/attributes/${id}`,
  options: (id: string): string => `/attributes/${id}/options`,
  types: ATTRIBUTE.TYPES,
  groups: ATTRIBUTE.GROUPS,
} as const;

// Attribute টাইপ ব্যবহার করা হয়েছে
export type AttributeEndpoint = {
  endpoints: typeof attributeEndpoints;
  response: Attribute;
};

export type AttributeEndpointKey = keyof typeof attributeEndpoints;
