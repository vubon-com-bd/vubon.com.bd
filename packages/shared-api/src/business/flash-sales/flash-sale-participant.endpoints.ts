/**
 * Flash Sale Participant Endpoints
 * ফ্ল্যাশ সেল অংশগ্রহণকারী সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { PARTICIPANT } from '@vubon/shared-constants';
import type { FlashSaleParticipant } from '@vubon/shared-types';

export const flashSaleParticipantEndpoints = {
  join: (flashSaleId: string) => `/flash-sales/${flashSaleId}/join`,
  leave: (flashSaleId: string) => `/flash-sales/${flashSaleId}/leave`,
  list: (flashSaleId: string) => `/flash-sales/${flashSaleId}/participants`,
  stats: (flashSaleId: string) => `/flash-sales/${flashSaleId}/participants/stats`,
} as const;

export type FlashSaleParticipantEndpointKey = keyof typeof flashSaleParticipantEndpoints;
