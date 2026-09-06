/**
 * Flash Sale Wishlist Endpoints
 * ফ্ল্যাশ সেল উইশলিস্ট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_SALE_WISHLIST } from '@vubon/shared-constants';
import type { FlashSaleWishlist } from '@vubon/shared-types';

export const flashSaleWishlistEndpoints = {
  add: (flashSaleId: string) => `/flash-sales/${flashSaleId}/wishlist`,
  remove: (flashSaleId: string) => `/flash-sales/${flashSaleId}/wishlist`,
  list: '/flash-sales/wishlist',
  check: (flashSaleId: string) => `/flash-sales/${flashSaleId}/wishlist/check`,
  notify: (flashSaleId: string) => `/flash-sales/${flashSaleId}/wishlist/notify`,
} as const;

export type FlashSaleWishlistEndpointKey = keyof typeof flashSaleWishlistEndpoints;
