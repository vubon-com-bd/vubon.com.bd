/**
 * Product Endpoints
 * প্রোডাক্ট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PRODUCT } from '@vubon/shared-constants';
import type { Product } from '@vubon/shared-types';

export const productEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/products/${id}`,
  create: baseEndpoints.create,
  update: (id: string): string => `/products/${id}`,
  delete: (id: string): string => `/products/${id}`,
  search: '/products/search',
  bulk: '/products/bulk',
  slug: (slug: string): string => `/products/slug/${slug}`,
  related: (id: string): string => `/products/${id}/related`,
  featured: '/products/featured',
  newArrivals: '/products/new-arrivals',
  bestSellers: '/products/best-sellers',
  status: PRODUCT.STATUS,
  types: PRODUCT.TYPES,
  visibility: PRODUCT.VISIBILITY,
  condition: PRODUCT.CONDITION,
  availability: PRODUCT.AVAILABILITY,
  approval: PRODUCT.APPROVAL,
} as const;

export type ProductEndpoint = {
  endpoints: typeof productEndpoints;
  response: Product;
};

export type ProductEndpointKey = keyof typeof productEndpoints;
