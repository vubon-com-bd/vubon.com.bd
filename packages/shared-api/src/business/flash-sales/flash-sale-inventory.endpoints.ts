/**
 * Flash Sale Inventory Endpoints
 * ফ্ল্যাশ সেল ইনভেন্টরি সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_INVENTORY } from '@vubon/shared-constants';
import type { FlashSaleInventory } from '@vubon/shared-types';

export const flashSaleInventoryEndpoints = {
  get: (flashSaleId: string) => `/flash-sales/${flashSaleId}/inventory`,
  update: (flashSaleId: string) => `/flash-sales/${flashSaleId}/inventory`,
  reserve: (flashSaleId: string) => `/flash-sales/${flashSaleId}/inventory/reserve`,
  release: (flashSaleId: string) => `/flash-sales/${flashSaleId}/inventory/release`,
  stats: (flashSaleId: string) => `/flash-sales/${flashSaleId}/inventory/stats`,
  adjust: (flashSaleId: string) => `/flash-sales/${flashSaleId}/inventory/adjust`,
} as const;

export type FlashSaleInventoryEndpointKey = keyof typeof flashSaleInventoryEndpoints;
