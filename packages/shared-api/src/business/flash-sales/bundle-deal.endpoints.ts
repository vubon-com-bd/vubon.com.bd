/**
 * Bundle Deal Endpoints
 * বান্ডেল ডিল সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { BUNDLE_DEAL } from '@vubon/shared-constants';
import type { BundleDeal } from '@vubon/shared-types';

export const bundleDealEndpoints = {
  list: (dealId: string) => `/deals/${dealId}/bundles`,
  create: (dealId: string) => `/deals/${dealId}/bundles`,
  update: (id: string) => `/deals/bundles/${id}`,
  delete: (id: string) => `/deals/bundles/${id}`,
  get: (id: string) => `/deals/bundles/${id}`,
} as const;

export type BundleDealEndpointKey = keyof typeof bundleDealEndpoints;
