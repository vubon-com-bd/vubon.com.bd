/**
 * Collection Endpoints
 * কালেকশন সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { COLLECTION } from '@vubon/shared-constants';
import type { Collection } from '@vubon/shared-types';

export const collectionEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/collections/${id}`,
  create: baseEndpoints.create,
  update: (id: string): string => `/collections/${id}`,
  delete: (id: string): string => `/collections/${id}`,
  slug: (slug: string): string => `/collections/slug/${slug}`,
  products: (id: string): string => `/collections/${id}/products`,
  addProduct: (id: string): string => `/collections/${id}/products`,
  removeProduct: (id: string, productId: string): string =>
    `/collections/${id}/products/${productId}`,
  reorder: (id: string): string => `/collections/${id}/products/reorder`,
  status: COLLECTION.STATUS,
  types: COLLECTION.TYPES,
} as const;

export type CollectionEndpoint = {
  endpoints: typeof collectionEndpoints;
  response: Collection;
};

export type CollectionEndpointKey = keyof typeof collectionEndpoints;
