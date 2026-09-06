/**
 * Deal Endpoints
 * ডিল সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { DEAL } from '@vubon/shared-constants';
import type { Deal } from '@vubon/shared-types';

export const dealEndpoints = {
  list: '/deals',
  detail: (id: string) => `/deals/${id}`,
  create: '/deals',
  update: (id: string) => `/deals/${id}`,
  delete: (id: string) => `/deals/${id}`,
  publish: (id: string) => `/deals/${id}/publish`,
  unpublish: (id: string) => `/deals/${id}/unpublish`,
  active: '/deals/active',
} as const;

export type DealEndpointKey = keyof typeof dealEndpoints;
