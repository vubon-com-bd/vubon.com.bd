/**
 * Flash Sale Report Endpoints
 * ফ্ল্যাশ সেল রিপোর্ট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_SALE } from '@vubon/shared-constants';
import type { FlashSaleReport } from '@vubon/shared-types';

export const flashSaleReportEndpoints = {
  generate: (flashSaleId: string) => `/flash-sales/${flashSaleId}/report`,
  list: '/flash-sales/reports',
  download: (id: string) => `/flash-sales/reports/${id}/download`,
  preview: (id: string) => `/flash-sales/reports/${id}/preview`,
} as const;

export type FlashSaleReportEndpointKey = keyof typeof flashSaleReportEndpoints;
