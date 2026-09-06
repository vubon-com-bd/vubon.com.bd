/**
 * Flash Sale Price Endpoints
 * ফ্ল্যাশ সেল মূল্য সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_PRICE } from '@vubon/shared-constants';
import type { FlashSalePrice } from '@vubon/shared-types';

export const flashSalePriceEndpoints = {
  get: (flashSaleId: string) => `/flash-sales/${flashSaleId}/price`,
  update: (flashSaleId: string) => `/flash-sales/${flashSaleId}/price`,
  bulk: (flashSaleId: string) => `/flash-sales/${flashSaleId}/price/bulk`,
} as const;

export type FlashSalePriceEndpointKey = keyof typeof flashSalePriceEndpoints;
