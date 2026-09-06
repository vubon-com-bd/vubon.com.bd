/**
 * Flash Sale Share Endpoints
 * ফ্ল্যাশ সেল শেয়ার সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_SALE } from '@vubon/shared-constants';
import type { FlashSaleShare } from '@vubon/shared-types';

export const flashSaleShareEndpoints = {
  share: (flashSaleId: string) => `/flash-sales/${flashSaleId}/share`,
  track: (code: string) => `/flash-sales/share/${code}`,
  stats: (code: string) => `/flash-sales/share/${code}/stats`,
} as const;

export type FlashSaleShareEndpointKey = keyof typeof flashSaleShareEndpoints;
