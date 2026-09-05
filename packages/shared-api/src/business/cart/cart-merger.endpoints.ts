/**
 * Cart Merger Endpoints
 * কার্ট মার্জার সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CART } from '@vubon/shared-constants';
import type { CartMerger } from '@vubon/shared-types';

// CART কনস্ট্যান্ট থেকে ডিফল্ট মান ব্যবহার
const BASE_PATH = baseEndpoints.api + '/cart/merge';

export const cartMergerEndpoints = {
  merge: `${BASE_PATH}`,
  preview: `${BASE_PATH}/preview`,
  conflicts: `${BASE_PATH}/conflicts`,
  resolve: `${BASE_PATH}/resolve`,
  status: (id: string) => `${BASE_PATH}/${id}/status`,
} as const;

// CART টাইপ ব্যবহার করে রেসপন্স টাইপ ডিফাইন
export type CartMergePreviewResponse = {
  guestItems: number;
  userItems: number;
  conflicts: {
    productId: string;
    variantId?: string;
    guestQuantity: number;
    userQuantity: number;
  }[];
  maxItems: typeof CART.DEFAULTS.MAX_ITEMS;
};

export type CartMergeResponse = {
  merger: CartMerger;
  itemsMerged: number;
  itemsSkipped: number;
  conflictsResolved: number;
  status: keyof typeof CART.STATUS;
};

export type CartMergerEndpointKey = keyof typeof cartMergerEndpoints;
