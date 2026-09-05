/**
 * Cart Endpoints
 * কার্ট সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { CART } from '@vubon/shared-constants';
import type { Cart } from '@vubon/shared-types';

// HTTP_STATUS এবং CART কনস্ট্যান্ট ব্যবহার
const BASE_PATH = baseEndpoints.api + '/cart';

export const cartEndpoints = {
  get: `${BASE_PATH}`,
  clear: `${BASE_PATH}/clear`,
  summary: `${BASE_PATH}/summary`,
  totals: `${BASE_PATH}/totals`,
  status: `${BASE_PATH}/status`,
  refresh: `${BASE_PATH}/refresh`,
  reset: `${BASE_PATH}/reset`,
} as const;

// HTTP_STATUS এবং CART টাইপ ব্যবহার করে রেসপন্স টাইপ ডিফাইন
export type CartSummaryResponse = {
  cart: Cart;
  itemCount: number;
  subtotal: number;
  total: number;
  currency: string;
  statusCode: typeof HTTP_STATUS.OK;
};

export type CartTotalsResponse = {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  savings: number;
  currency: string;
  statusCode: typeof HTTP_STATUS.OK;
};

export type CartStatusResponse = {
  status: keyof typeof CART.STATUS;
  isActive: boolean;
  isAbandoned: boolean;
  isExpired: boolean;
  statusCode: typeof HTTP_STATUS.OK;
};

export type CartErrorResponse = {
  error: string;
  message: string;
  statusCode:
    | typeof HTTP_STATUS.BAD_REQUEST
    | typeof HTTP_STATUS.NOT_FOUND
    | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;
};

export type CartEndpointKey = keyof typeof cartEndpoints;
