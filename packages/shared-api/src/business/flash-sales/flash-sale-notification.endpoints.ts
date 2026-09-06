/**
 * Flash Sale Notification Endpoints
 * ফ্ল্যাশ সেল নোটিফিকেশন সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_SALE } from '@vubon/shared-constants';
import type { FlashSaleNotification } from '@vubon/shared-types';

export const flashSaleNotificationEndpoints = {
  send: (flashSaleId: string) => `/flash-sales/${flashSaleId}/notify`,
  list: (flashSaleId: string) => `/flash-sales/${flashSaleId}/notifications`,
  get: (id: string) => `/flash-sales/notifications/${id}`,
  resend: (id: string) => `/flash-sales/notifications/${id}/resend`,
  markRead: (id: string) => `/flash-sales/notifications/${id}/read`,
} as const;

export type FlashSaleNotificationEndpointKey = keyof typeof flashSaleNotificationEndpoints;
