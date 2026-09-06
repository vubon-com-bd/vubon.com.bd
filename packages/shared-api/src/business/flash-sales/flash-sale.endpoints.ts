/**
 * Flash Sale Endpoints
 * ফ্ল্যাশ সেল সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_SALE } from '@vubon/shared-constants';
import type { FlashSale } from '@vubon/shared-types';

export const flashSaleEndpoints = {
  list: '/flash-sales',
  detail: (id: string) => `/flash-sales/${id}`,
  create: '/flash-sales',
  update: (id: string) => `/flash-sales/${id}`,
  delete: (id: string) => `/flash-sales/${id}`,
  publish: (id: string) => `/flash-sales/${id}/publish`,
  unpublish: (id: string) => `/flash-sales/${id}/unpublish`,
  pause: (id: string) => `/flash-sales/${id}/pause`,
  resume: (id: string) => `/flash-sales/${id}/resume`,
  status: (id: string) => `/flash-sales/${id}/status`,
} as const;

export type FlashSaleEndpointKey = keyof typeof flashSaleEndpoints;
