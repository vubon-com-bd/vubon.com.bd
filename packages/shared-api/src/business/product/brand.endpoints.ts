/**
 * Brand Endpoints
 * ব্র্যান্ড সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { BRAND } from '@vubon/shared-constants';
import type { Brand } from '@vubon/shared-types';

export const brandEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/brands/${id}`,
  create: baseEndpoints.create,
  update: (id: string): string => `/brands/${id}`,
  delete: (id: string): string => `/brands/${id}`,
  slug: (slug: string): string => `/brands/slug/${slug}`,
  products: (id: string): string => `/brands/${id}/products`,
  status: BRAND.STATUS,
  types: BRAND.TYPES,
} as const;

export type BrandEndpoint = {
  endpoints: typeof brandEndpoints;
  response: Brand;
};

export type BrandEndpointKey = keyof typeof brandEndpoints;
