/**
 * Variant Endpoints
 * ভেরিয়েন্ট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { VARIANT } from '@vubon/shared-constants';
import type { Variant } from '@vubon/shared-types';

export const variantEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/variants/${id}`,
  create: baseEndpoints.create,
  update: (id: string): string => `/variants/${id}`,
  delete: (id: string): string => `/variants/${id}`,
  bulk: '/variants/bulk',
  byProduct: (productId: string): string => `/variants/product/${productId}`,
  stock: (id: string): string => `/variants/${id}/stock`,
  status: VARIANT.STATUS,
  types: VARIANT.TYPES,
} as const;

export type VariantEndpoint = {
  endpoints: typeof variantEndpoints;
  response: Variant;
};

export type VariantEndpointKey = keyof typeof variantEndpoints;
