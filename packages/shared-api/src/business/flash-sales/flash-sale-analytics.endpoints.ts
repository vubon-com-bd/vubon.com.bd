/**
 * Flash Sale Analytics Endpoints
 * ফ্ল্যাশ সেল অ্যানালিটিক্স সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_SALE } from '@vubon/shared-constants';
import type { FlashSaleAnalytics } from '@vubon/shared-types';

export const flashSaleAnalyticsEndpoints = {
  get: (flashSaleId: string) => `/flash-sales/${flashSaleId}/analytics`,
  summary: '/flash-sales/analytics/summary',
  realtime: (flashSaleId: string) => `/flash-sales/${flashSaleId}/analytics/realtime`,
  compare: (flashSaleId1: string, flashSaleId2: string) =>
    `/flash-sales/analytics/compare/${flashSaleId1}/${flashSaleId2}`,
} as const;

export type FlashSaleAnalyticsEndpointKey = keyof typeof flashSaleAnalyticsEndpoints;
