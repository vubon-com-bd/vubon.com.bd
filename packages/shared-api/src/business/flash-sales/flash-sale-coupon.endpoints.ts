/**
 * Flash Sale Coupon Endpoints
 * ফ্ল্যাশ সেল কুপন সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_COUPON } from '@vubon/shared-constants';
import type { FlashSaleCoupon } from '@vubon/shared-types';

export const flashSaleCouponEndpoints = {
  list: (flashSaleId: string) => `/flash-sales/${flashSaleId}/coupons`,
  create: (flashSaleId: string) => `/flash-sales/${flashSaleId}/coupons`,
  update: (id: string) => `/flash-sales/coupons/${id}`,
  delete: (id: string) => `/flash-sales/coupons/${id}`,
  get: (id: string) => `/flash-sales/coupons/${id}`,
  validate: '/flash-sales/coupons/validate',
  apply: (flashSaleId: string) => `/flash-sales/${flashSaleId}/coupons/apply`,
  remove: (flashSaleId: string) => `/flash-sales/${flashSaleId}/coupons/remove`,
} as const;

export type FlashSaleCouponEndpointKey = keyof typeof flashSaleCouponEndpoints;
