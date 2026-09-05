/**
 * Cart Item Endpoints
 * কার্ট আইটেম সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CART } from '@vubon/shared-constants';
import type { CartItem } from '@vubon/shared-types';

// CART কনস্ট্যান্ট থেকে আইটেম স্ট্যাটাস এবং ডিফল্ট মান ব্যবহার
const BASE_PATH = baseEndpoints.api + '/cart/items';

export const cartItemEndpoints = {
  add: `${BASE_PATH}`,
  update: (id: string) => `${BASE_PATH}/${id}`,
  remove: (id: string) => `${BASE_PATH}/${id}`,
  bulk: `${BASE_PATH}/bulk`,
  select: (id: string) => `${BASE_PATH}/${id}/select`,
  unselect: (id: string) => `${BASE_PATH}/${id}/unselect`,
  quantity: (id: string) => `${BASE_PATH}/${id}/quantity`,
  validate: `${BASE_PATH}/validate`,
} as const;

// CART আইটেম স্ট্যাটাস ব্যবহার করে রেসপন্স টাইপ ডিফাইন
export type CartItemAddResponse = {
  item: CartItem;
  cartTotal: number;
  message: string;
  itemStatus: keyof typeof CART.ITEM_STATUS;
};

export type CartItemValidationResponse = {
  valid: boolean;
  errors: {
    code: keyof typeof CART.ITEM_STATUS;
    message: string;
  }[];
  warnings: {
    code: keyof typeof CART.ITEM_STATUS;
    message: string;
  }[];
};

export type CartItemBulkResponse = {
  success: boolean;
  count: number;
  failed: {
    id: string;
    reason: keyof typeof CART.ITEM_STATUS;
  }[];
};

export type CartItemEndpointKey = keyof typeof cartItemEndpoints;
