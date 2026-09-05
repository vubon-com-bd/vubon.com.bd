/**
 * Saved For Later Endpoints
 * পরে সংরক্ষিত সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CART } from '@vubon/shared-constants';
import type { SavedForLater } from '@vubon/shared-types';

// CART কনস্ট্যান্ট থেকে টাইপ এবং ডিফল্ট মান ব্যবহার
const BASE_PATH = baseEndpoints.api + '/cart/saved';

export const savedForLaterEndpoints = {
  list: `${BASE_PATH}`,
  add: `${BASE_PATH}`,
  remove: (id: string) => `${BASE_PATH}/${id}`,
  move: (id: string) => `${BASE_PATH}/${id}/move`,
  moveAll: `${BASE_PATH}/move-all`,
  clear: `${BASE_PATH}/clear`,
} as const;

// CART টাইপ ব্যবহার করে রেসপন্স টাইপ ডিফাইন
export type SavedForLaterListResponse = {
  items: SavedForLater[];
  total: number;
  page: number;
  limit: number;
  maxItems: typeof CART.DEFAULTS.MAX_ITEMS;
};

export type SavedForLaterAddResponse = {
  success: boolean;
  item: SavedForLater;
  message: string;
  status: keyof typeof CART.STATUS;
};

export type SavedForLaterMoveResponse = {
  success: boolean;
  itemId: string;
  movedToCart: boolean;
  status: keyof typeof CART.STATUS;
};

export type SavedForLaterEndpointKey = keyof typeof savedForLaterEndpoints;
