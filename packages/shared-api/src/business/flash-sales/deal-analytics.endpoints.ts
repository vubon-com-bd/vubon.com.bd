/**
 * Deal Analytics Endpoints
 * ডিল অ্যানালিটিক্স সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { DEAL } from '@vubon/shared-constants';
import type { DealAnalytics } from '@vubon/shared-types';

export const dealAnalyticsEndpoints = {
  get: (dealId: string) => `/deals/${dealId}/analytics`,
  summary: '/deals/analytics/summary',
  compare: (dealId1: string, dealId2: string) => `/deals/analytics/compare/${dealId1}/${dealId2}`,
} as const;

export type DealAnalyticsEndpointKey = keyof typeof dealAnalyticsEndpoints;
