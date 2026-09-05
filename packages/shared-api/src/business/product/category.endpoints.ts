/**
 * Category Endpoints
 * ক্যাটাগরি সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CATEGORY } from '@vubon/shared-constants';
import type { Category } from '@vubon/shared-types';

export const categoryEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/categories/${id}`,
  create: baseEndpoints.create,
  update: (id: string): string => `/categories/${id}`,
  delete: (id: string): string => `/categories/${id}`,
  tree: '/categories/tree',
  subcategories: (parentId: string): string => `/categories/${parentId}/subcategories`,
  slug: (slug: string): string => `/categories/slug/${slug}`,
  products: (id: string): string => `/categories/${id}/products`,
  status: CATEGORY.STATUS,
  types: CATEGORY.TYPES,
} as const;

export type CategoryEndpoint = {
  endpoints: typeof categoryEndpoints;
  response: Category;
};

export type CategoryEndpointKey = keyof typeof categoryEndpoints;
