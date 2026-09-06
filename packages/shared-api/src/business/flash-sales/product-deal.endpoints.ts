/**
 * Product Deal Endpoints
 * প্রোডাক্ট ডিল সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PRODUCT_DEAL } from '@vubon/shared-constants';
import type { ProductDeal } from '@vubon/shared-types';

export const productDealEndpoints = {
  list: (dealId: string) => `/deals/${dealId}/products`,
  create: (dealId: string) => `/deals/${dealId}/products`,
  update: (id: string) => `/deals/products/${id}`,
  delete: (id: string) => `/deals/products/${id}`,
  get: (id: string) => `/deals/products/${id}`,
  bulk: (dealId: string) => `/deals/${dealId}/products/bulk`,
} as const;

export type ProductDealEndpointKey = keyof typeof productDealEndpoints;
