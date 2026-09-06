/**
 * Flash Sale Rule Endpoints
 * ফ্ল্যাশ সেল রুল সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_SALE } from '@vubon/shared-constants';
import type { FlashSaleRule } from '@vubon/shared-types';

export const flashSaleRuleEndpoints = {
  list: (flashSaleId: string) => `/flash-sales/${flashSaleId}/rules`,
  create: (flashSaleId: string) => `/flash-sales/${flashSaleId}/rules`,
  update: (id: string) => `/flash-sales/rules/${id}`,
  delete: (id: string) => `/flash-sales/rules/${id}`,
  get: (id: string) => `/flash-sales/rules/${id}`,
  apply: (id: string) => `/flash-sales/rules/${id}/apply`,
} as const;

export type FlashSaleRuleEndpointKey = keyof typeof flashSaleRuleEndpoints;
