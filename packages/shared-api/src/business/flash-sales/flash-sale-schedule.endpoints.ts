/**
 * Flash Sale Schedule Endpoints
 * ফ্ল্যাশ সেল সময়সূচী সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { SCHEDULE } from '@vubon/shared-constants';
import type { FlashSaleSchedule } from '@vubon/shared-types';

export const flashSaleScheduleEndpoints = {
  list: (flashSaleId: string) => `/flash-sales/${flashSaleId}/schedules`,
  create: (flashSaleId: string) => `/flash-sales/${flashSaleId}/schedules`,
  update: (id: string) => `/flash-sales/schedules/${id}`,
  delete: (id: string) => `/flash-sales/schedules/${id}`,
  get: (id: string) => `/flash-sales/schedules/${id}`,
  activate: (id: string) => `/flash-sales/schedules/${id}/activate`,
} as const;

export type FlashSaleScheduleEndpointKey = keyof typeof flashSaleScheduleEndpoints;
